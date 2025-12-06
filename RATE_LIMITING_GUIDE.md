# Guide d'Implémentation du Rate Limiting

## 📌 Objectif
Protéger les endpoints d'authentification contre les attaques par force brute en limitant le nombre de tentatives de connexion.

---

## 🔧 Installation

### 1. Installer le composant Symfony RateLimiter

```bash
cd Server
composer require symfony/rate-limiter
```

---

## ⚙️ Configuration

### 2. Configurer le Rate Limiter dans `config/packages/rate_limiter.yaml`

Créer le fichier `Server/config/packages/rate_limiter.yaml` :

```yaml
framework:
    rate_limiter:
        # Limiter pour les tentatives de login
        login_attempts:
            policy: 'sliding_window'
            limit: 5
            interval: '15 minutes'
            
        # Limiter pour les inscriptions
        registration_attempts:
            policy: 'fixed_window'
            limit: 3
            interval: '1 hour'
            
        # Limiter général pour l'API
        api_general:
            policy: 'token_bucket'
            limit: 100
            rate: { interval: '1 minute', amount: 10 }
```

**Explications:**
- `login_attempts`: Max 5 tentatives de connexion par 15 minutes
- `registration_attempts`: Max 3 inscriptions par heure
- `api_general`: Max 100 requêtes, avec 10 nouvelles requêtes par minute

---

## 💻 Implémentation dans les Contrôleurs

### 3. Modifier `ApiController.php`

```php
<?php

namespace App\Controller\Api;

use Symfony\Component\RateLimiter\RateLimiterFactory;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiController extends AbstractController
{
    #[Route('/auth/login', name: 'auth_login', methods: ['POST'])]
    public function login(
        Request $request, 
        ClientRepository $clientRepository, 
        UserPasswordHasherInterface $passwordHasher,
        RateLimiterFactory $loginLimiter  // Injecter le rate limiter
    ): Response {
        // Créer un limiter basé sur l'IP du client
        $limiter = $loginLimiter->create($request->getClientIp());
        
        // Vérifier si la limite est atteinte
        if (false === $limiter->consume(1)->isAccepted()) {
            return $this->json([
                'success' => false,
                'message' => 'Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.'
            ], Response::HTTP_TOO_MANY_REQUESTS);
        }
        
        // ... reste du code de login ...
    }

    #[Route('/auth/register', name: 'auth_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        ClientRepository $clientRepository,
        UserPasswordHasherInterface $passwordHasher,
        RateLimiterFactory $registrationLimiter  // Injecter le rate limiter
    ): Response {
        // Créer un limiter basé sur l'IP du client
        $limiter = $registrationLimiter->create($request->getClientIp());
        
        // Vérifier si la limite est atteinte
        if (false === $limiter->consume(1)->isAccepted()) {
            return $this->json([
                'success' => false,
                'message' => 'Trop de tentatives d\'inscription. Veuillez réessayer plus tard.'
            ], Response::HTTP_TOO_MANY_REQUESTS);
        }
        
        // ... reste du code de register ...
    }
}
```

### 4. Modifier `ClientController.php`

```php
<?php

namespace App\Controller;

use Symfony\Component\RateLimiter\RateLimiterFactory;

class ClientController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(
        Request $request,
        ClientRepository $clientRepository,
        UserPasswordHasherInterface $passwordHasher,
        RateLimiterFactory $loginLimiter
    ): JsonResponse {
        // Appliquer le rate limiting
        $limiter = $loginLimiter->create($request->getClientIp());
        
        if (false === $limiter->consume(1)->isAccepted()) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Trop de tentatives. Veuillez patienter 15 minutes.'
            ], Response::HTTP_TOO_MANY_REQUESTS);
        }
        
        // ... reste du code ...
    }

    #[Route('/api/register', name: 'api_client_create', methods: ['POST'])]
    public function createClient(
        Request $request, 
        EntityManagerInterface $em, 
        ClientRepository $clientRepository,
        UserPasswordHasherInterface $passwordHasher,
        RateLimiterFactory $registrationLimiter
    ): Response {
        // Appliquer le rate limiting
        $limiter = $registrationLimiter->create($request->getClientIp());
        
        if (false === $limiter->consume(1)->isAccepted()) {
            return $this->json([
                'success' => false,
                'error' => 'Trop de tentatives d\'inscription. Réessayez plus tard.'
            ], Response::HTTP_TOO_MANY_REQUESTS);
        }
        
        // ... reste du code ...
    }
}
```

---

## 🔄 Configuration du Service dans `services.yaml`

Ajouter dans `Server/config/services.yaml` :

```yaml
services:
    # Rate limiters
    Symfony\Component\RateLimiter\RateLimiterFactory $loginLimiter:
        factory: ['@limiter.login_attempts', 'create']
        
    Symfony\Component\RateLimiter\RateLimiterFactory $registrationLimiter:
        factory: ['@limiter.registration_attempts', 'create']
```

---

## 🧪 Tests

### Test du Rate Limiting

```bash
# Tester 6 tentatives de connexion rapides (devrait bloquer à la 6ème)
for i in {1..6}; do
  curl -X POST http://localhost:8000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"wrongpassword"}' \
    -w "\nStatus: %{http_code}\n\n"
  sleep 1
done
```

**Résultat attendu:**
- Tentatives 1-5: HTTP 401 (Unauthorized)
- Tentative 6: HTTP 429 (Too Many Requests)

---

## 📊 Monitoring

### Afficher les informations du limiter

```php
$limiter = $loginLimiter->create($request->getClientIp());
$rateLimit = $limiter->consume(0); // Ne consomme pas de token

// Informations disponibles
$rateLimit->getLimit();           // Limite totale
$rateLimit->getRemainingTokens(); // Tokens restants
$rateLimit->getRetryAfter();      // Temps d'attente avant nouvelle tentative
```

### Ajouter des headers de rate limit dans la réponse

```php
$response = $this->json([...]);
$response->headers->set('X-RateLimit-Limit', $rateLimit->getLimit());
$response->headers->set('X-RateLimit-Remaining', $rateLimit->getRemainingTokens());
if (!$rateLimit->isAccepted()) {
    $response->headers->set('Retry-After', $rateLimit->getRetryAfter()->getTimestamp());
}
return $response;
```

---

## 🎯 Stratégies de Rate Limiting

### 1. **Fixed Window** (Fenêtre Fixe)
- Limite fixe par période
- Exemple: 10 requêtes par heure (00:00-01:00, 01:00-02:00, etc.)
- Simple mais peut être contourné

### 2. **Sliding Window** (Fenêtre Glissante)
- Limite sur une période glissante
- Exemple: 10 requêtes dans les 60 dernières minutes
- Plus précis, recommandé pour le login

### 3. **Token Bucket** (Seau de jetons)
- Permet des rafales contrôlées
- Jetons ajoutés progressivement
- Recommandé pour les API générales

---

## 🔐 Recommandations de Sécurité

### Limites Recommandées

| Endpoint | Limite | Intervalle | Politique |
|----------|--------|------------|-----------|
| Login | 5 | 15 minutes | Sliding Window |
| Register | 3 | 1 heure | Fixed Window |
| Password Reset | 3 | 1 heure | Fixed Window |
| API General | 100/min | 1 minute | Token Bucket |

### Considérations Importantes

1. **IP Partagées:** Attention aux utilisateurs derrière un proxy/NAT
2. **Stockage:** Utiliser Redis pour la production (meilleure performance)
3. **Logging:** Logger les tentatives bloquées pour détecter les attaques
4. **Whitelist:** Permettre certaines IPs (admin, tests, etc.)

---

## 🚀 Configuration Production avec Redis

### Installation Redis

```bash
composer require symfony/redis-bundle predis/predis
```

### Configuration `rate_limiter.yaml` avec Redis

```yaml
framework:
    cache:
        pools:
            cache.rate_limiter:
                adapter: cache.adapter.redis
                provider: 'redis://localhost:6379'
    
    rate_limiter:
        login_attempts:
            policy: 'sliding_window'
            limit: 5
            interval: '15 minutes'
            lock_factory: 'lock.factory'
            cache_pool: 'cache.rate_limiter'
```

---

## ✅ Checklist d'Implémentation

- [ ] Installer symfony/rate-limiter
- [ ] Créer rate_limiter.yaml
- [ ] Modifier ApiController.php (login + register)
- [ ] Modifier ClientController.php (login + register)
- [ ] Configurer services.yaml
- [ ] Tester les limites
- [ ] Ajouter les headers de rate limit
- [ ] Configurer Redis pour la production
- [ ] Logger les tentatives bloquées
- [ ] Documenter pour l'équipe

---

## 📝 Notes

- Le rate limiting est basé sur l'IP par défaut
- Pour limiter par utilisateur, utiliser l'email ou l'ID client
- Combiner avec CAPTCHA après plusieurs échecs
- Monitorer les logs pour détecter les patterns d'attaque

---

## 🔗 Ressources

- [Symfony RateLimiter Documentation](https://symfony.com/doc/current/rate_limiter.html)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
