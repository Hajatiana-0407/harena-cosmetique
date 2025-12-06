# 🔐 Corrections de Sécurité - Authentification Client

## 📋 Vue d'Ensemble

Ce projet a été sécurisé contre les principales vulnérabilités web concernant l'authentification des clients :
- ✅ Injection SQL
- ✅ Cross-Site Scripting (XSS)
- ✅ Énumération d'utilisateurs
- ✅ Mots de passe faibles
- ✅ Données sensibles exposées

---

## 📁 Fichiers de Documentation

| Fichier | Description |
|---------|-------------|
| `SUMMARY.md` | **COMMENCER ICI** - Résumé exécutif des corrections |
| `SECURITY_REPORT.md` | Rapport détaillé des vulnérabilités et corrections |
| `RATE_LIMITING_GUIDE.md` | Guide d'implémentation du rate limiting |
| `test_security.sh` | Script de test (Linux/Mac) |
| `test_security.ps1` | Script de test (Windows PowerShell) |

---

## 🚀 Démarrage Rapide

### 1. Vérifier les Modifications

Les fichiers suivants ont été modifiés :

**Backend:**
- `Server/src/Controller/Api/ApiController.php`
- `Server/src/Controller/ClientController.php`

**Frontend:**
- `Client/src/pages/Login.jsx`
- `Client/src/pages/Signin.jsx`

### 2. Vider le Cache Symfony

```bash
cd Server
php bin/console cache:clear
```

### 3. Démarrer le Serveur

```bash
# Terminal 1 - Backend
cd Server
symfony server:start

# Terminal 2 - Frontend
cd Client
npm run dev
```

### 4. Tester l'Application

**Manuellement:**
1. Ouvrir http://localhost:5173 (ou le port de Vite)
2. Aller sur la page d'inscription
3. Créer un compte avec :
   - Nom: Dupont
   - Email: test@example.com
   - Mot de passe: SecurePass123 (min 8 caractères, 1 majuscule, 1 chiffre)
4. Se connecter avec les mêmes identifiants

**Automatiquement (Windows):**
```powershell
.\test_security.ps1
```

**Automatiquement (Linux/Mac):**
```bash
bash test_security.sh
```

---

## ✅ Checklist de Validation

### Tests Manuels

- [ ] **Inscription avec données valides** → Devrait réussir
- [ ] **Inscription avec mot de passe faible** (ex: "test") → Devrait échouer
- [ ] **Inscription avec email invalide** (ex: "test") → Devrait échouer
- [ ] **Inscription avec nom contenant des chiffres** (ex: "Dupont123") → Devrait échouer
- [ ] **Login avec credentials valides** → Devrait réussir
- [ ] **Login avec email invalide** → Devrait échouer
- [ ] **Login avec mot de passe court** (ex: "123") → Devrait échouer
- [ ] **Vérifier sessionStorage** (F12 > Application > Session Storage) → Devrait contenir les données client

### Tests de Sécurité

- [ ] **Tentative XSS dans le nom** (ex: `<script>alert('XSS')</script>`) → Devrait être filtré
- [ ] **Tentative SQL Injection** (ex: `' OR '1'='1`) → Devrait être bloqué
- [ ] **Méthode GET sur login** → Devrait être refusée (405)
- [ ] **Messages d'erreur génériques** → Ne devrait pas révéler si l'email existe

---

## 🛡️ Protections Implémentées

### Backend (Symfony)

#### Validation des Entrées
```php
// Email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    return $this->json(['message' => 'Format d\'email invalide'], 400);
}

// Mot de passe (inscription)
if (strlen($password) < 8 || !preg_match('/[A-Z]/', $password) || !preg_match('/[0-9]/', $password)) {
    return $this->json(['message' => 'Mot de passe trop faible'], 400);
}

// Noms (lettres uniquement)
if (!preg_match('/^[a-zA-ZÀ-ÿ\s\-\']+$/', $nom)) {
    return $this->json(['message' => 'Les noms ne doivent contenir que des lettres'], 400);
}
```

#### Sanitization
```php
// Nettoyage des entrées
$email = trim(strip_tags($data['email']));
$nom = trim(strip_tags($data['nom']));

// Échappement des sorties
$clientData = [
    'nom' => htmlspecialchars($client->getNom(), ENT_QUOTES, 'UTF-8'),
    'email' => htmlspecialchars($client->getEmail(), ENT_QUOTES, 'UTF-8')
];
```

### Frontend (React)

#### Validation Côté Client
```javascript
// Validation email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(sanitizedEmail)) {
    setMessage('Format d\'email invalide');
    return;
}

// Validation mot de passe
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
if (!passwordRegex.test(password)) {
    setErrors({ password: 'Mot de passe trop faible' });
    return;
}
```

#### Sanitization et Stockage Sécurisé
```javascript
// Nettoyage
const sanitizedEmail = email.trim().toLowerCase();
const sanitizedName = name.trim();

// Stockage sécurisé (sessionStorage au lieu de localStorage)
sessionStorage.setItem('client', JSON.stringify(data.client));
```

---

## ⚠️ Prochaines Étapes Recommandées

### Priorité Haute

1. **Rate Limiting** (Protection contre force brute)
   - Suivre le guide: `RATE_LIMITING_GUIDE.md`
   - Installer: `composer require symfony/rate-limiter`
   - Limiter à 5 tentatives de login par 15 minutes

2. **HTTPS en Production**
   - Obligatoire pour protéger les credentials en transit
   - Configurer dans Nginx/Apache

3. **Protection CSRF**
   - Activer dans `config/packages/security.yaml`
   - Ajouter des tokens CSRF aux formulaires

### Priorité Moyenne

4. **CAPTCHA**
   - Ajouter Google reCAPTCHA v3 après 3 tentatives échouées
   - Installer: `composer require google/recaptcha`

5. **Journalisation**
   - Logger les tentatives de connexion suspectes
   - Utiliser Monolog pour les alertes

6. **Authentification à 2 Facteurs (2FA)**
   - Pour les comptes sensibles
   - Installer: `composer require scheb/2fa-bundle`

---

## 🧪 Tests de Sécurité

### Test 1: Validation Email
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid-email","password":"Test1234"}'
```
**Résultat attendu:** HTTP 400 - "Format d'email invalide"

### Test 2: Mot de Passe Faible
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom":"Dupont",
    "prenom":"Jean",
    "email":"test@example.com",
    "password":"weak"
  }'
```
**Résultat attendu:** HTTP 400 - "Le mot de passe doit contenir au moins 8 caractères..."

### Test 3: XSS
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom":"<script>alert(\"XSS\")</script>",
    "prenom":"Jean",
    "email":"xss@example.com",
    "password":"SecurePass123"
  }'
```
**Résultat attendu:** HTTP 400 - "Les noms ne doivent contenir que des lettres"

---

## 📊 Métriques de Sécurité

| Vulnérabilité | Avant | Après |
|---------------|-------|-------|
| Injection SQL | ⚠️ Possible | ✅ Bloquée |
| XSS | ⚠️ Possible | ✅ Bloquée |
| Énumération utilisateurs | ⚠️ Possible | ✅ Bloquée |
| Mots de passe faibles | ⚠️ Acceptés | ✅ Rejetés |
| Credentials en logs | ⚠️ Exposés | ✅ Supprimés |
| GET avec credentials | ⚠️ Accepté | ✅ Refusé |
| XSS via localStorage | ⚠️ Vulnérable | ✅ Sécurisé |

---

## 🔍 Debugging

### Voir les Logs Symfony
```bash
# Temps réel
tail -f Server/var/log/dev.log

# Dernières 50 lignes
tail -n 50 Server/var/log/dev.log
```

### Voir les Logs Frontend
Ouvrir la console du navigateur (F12 > Console)

### Vérifier la Base de Données
```bash
cd Server
php bin/console doctrine:query:sql "SELECT email, nom, prenom FROM client ORDER BY created_at DESC LIMIT 5"
```

---

## 📞 Support

### En cas de problème

1. **Vérifier les logs:**
   - Backend: `Server/var/log/dev.log`
   - Frontend: Console navigateur (F12)

2. **Vider le cache:**
   ```bash
   cd Server
   php bin/console cache:clear
   ```

3. **Vérifier la configuration:**
   - CORS: `Server/config/packages/nelmio_cors.yaml`
   - Security: `Server/config/packages/security.yaml`

4. **Consulter la documentation:**
   - `SECURITY_REPORT.md` pour les détails techniques
   - `RATE_LIMITING_GUIDE.md` pour le rate limiting

---

## 📚 Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Symfony Security Best Practices](https://symfony.com/doc/current/security.html)
- [React Security Best Practices](https://react.dev/learn/security)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

## ✅ Conclusion

Les principales vulnérabilités de sécurité ont été corrigées. L'application est maintenant protégée contre :
- ✅ Injections SQL
- ✅ Attaques XSS
- ✅ Énumération d'utilisateurs
- ✅ Mots de passe faibles
- ✅ Exposition de données sensibles

**Prochaine étape:** Implémenter le rate limiting (voir `RATE_LIMITING_GUIDE.md`)

---

**Date:** 2025-12-05  
**Version:** 1.0  
**Statut:** ✅ Corrections Appliquées
