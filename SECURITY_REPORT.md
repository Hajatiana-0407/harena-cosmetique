# Rapport de Sécurité - Authentification Client

## Date: 2025-12-05

## Statut: ✅ Corrections Appliquées

---

## 🔒 Problèmes de Sécurité Identifiés et Corrigés

### Backend (Symfony)

#### 1. **Validation et Sanitization des Entrées** ✅

**Problème:** Les données utilisateur n'étaient pas validées ni nettoyées avant traitement
**Solution:**

- Ajout de `trim()` et `strip_tags()` pour nettoyer les entrées
- Validation du format email avec `filter_var($email, FILTER_VALIDATE_EMAIL)`
- Validation de la force du mot de passe (min 8 caractères, 1 majuscule, 1 chiffre)
- Validation des noms (lettres uniquement, pas de caractères spéciaux)
- Nettoyage des numéros de téléphone avec `preg_replace('/[^0-9]/', '')`

#### 2. **Protection contre l'Énumération d'Utilisateurs** ✅

**Problème:** Messages d'erreur différents révélaient si un email existait
**Solution:**

- Messages d'erreur génériques: "Identifiants invalides" au lieu de "Email ou mot de passe incorrect"
- Même réponse que l'utilisateur existe ou non

#### 3. **Sanitization des Sorties (XSS)** ✅

**Problème:** Les données retournées n'étaient pas échappées
**Solution:**

- Utilisation de `htmlspecialchars($data, ENT_QUOTES, 'UTF-8')` sur toutes les données retournées
- Protection contre les attaques XSS stockées

#### 4. **Suppression des Logs Sensibles** ✅

**Problème:** Les données client étaient loggées avec `error_log()`
**Solution:**

- Suppression de tous les `error_log()` contenant des données sensibles
- Conservation uniquement des logs d'erreurs génériques

#### 5. **Méthodes HTTP Sécurisées** ✅

**Problème:** Login acceptait GET et POST (credentials dans URL avec GET)
**Solution:**

- Restriction à POST uniquement pour `/auth/login` et `/api/login`
- Prévention de l'exposition des credentials dans les logs serveur

#### 6. **Validation de la Longueur du Mot de Passe** ✅

**Problème:** Pas de vérification minimale côté serveur
**Solution:**

- Vérification minimale de 6 caractères pour le login
- Vérification stricte (8+ caractères, majuscule, chiffre) pour l'inscription

### Frontend (React)

#### 1. **Validation Côté Client** ✅

**Problème:** Validation insuffisante avant envoi au serveur
**Solution:**

- Validation du format email avec regex
- Validation de la longueur du mot de passe
- Vérification que tous les champs sont remplis
- Feedback immédiat à l'utilisateur

#### 2. **Sanitization des Entrées** ✅

**Problème:** Données envoyées sans nettoyage
**Solution:**

- `trim()` sur tous les champs texte
- `toLowerCase()` sur les emails pour normalisation
- Suppression des espaces inutiles

#### 3. **Stockage Sécurisé** ✅

**Problème:** Utilisation de `localStorage` (vulnérable aux XSS)
**Solution:**

- Migration vers `sessionStorage` (données supprimées à la fermeture du navigateur)
- Réduction de la surface d'attaque XSS

#### 4. **Affichage des Erreurs** ✅

**Problème:** Erreurs de formulaire non affichées dans Signin.jsx
**Solution:**

- Ajout d'un composant d'affichage des erreurs
- Feedback visuel clair pour l'utilisateur

#### 5. **Suppression des Console.log** ✅

**Problème:** `console.log(email, password)` exposait les credentials
**Solution:**

- Suppression de tous les logs de données sensibles

---

## 🛡️ Mesures de Sécurité Implémentées

### Protection contre les Injections SQL

- ✅ Utilisation de Doctrine ORM (requêtes paramétrées)
- ✅ Pas de concaténation SQL directe
- ✅ Validation stricte des types de données

### Protection contre les Attaques XSS

- ✅ Échappement HTML avec `htmlspecialchars()`
- ✅ Sanitization avec `strip_tags()`
- ✅ Utilisation de `sessionStorage` au lieu de `localStorage`

### Protection contre les Attaques par Force Brute

- ⚠️ **RECOMMANDATION:** Implémenter un rate limiting (ex: Symfony RateLimiter)
- ⚠️ **RECOMMANDATION:** Ajouter un délai progressif après échecs de connexion
- ⚠️ **RECOMMANDATION:** Implémenter un CAPTCHA après 3 tentatives échouées

### Protection CSRF

- ⚠️ **RECOMMANDATION:** Activer la protection CSRF de Symfony pour les formulaires
- ⚠️ **RECOMMANDATION:** Utiliser des tokens CSRF pour les requêtes API

---

## 📋 Checklist de Sécurité

### Implémenté ✅

- [x] Validation des entrées (backend)
- [x] Sanitization des entrées (backend)
- [x] Échappement des sorties (backend)
- [x] Validation côté client (frontend)
- [x] Sanitization côté client (frontend)
- [x] Messages d'erreur génériques
- [x] Méthodes HTTP sécurisées (POST uniquement)
- [x] Validation de la force du mot de passe
- [x] Stockage sécurisé (sessionStorage)
- [x] Suppression des logs sensibles

### Recommandations Futures ⚠️

- [ ] Rate Limiting (limitation du nombre de tentatives)
- [ ] Protection CSRF avec tokens
- [ ] CAPTCHA après tentatives échouées
- [ ] Authentification à deux facteurs (2FA)
- [ ] Politique de mots de passe plus stricte (caractères spéciaux)
- [ ] Journalisation des tentatives de connexion suspectes
- [ ] Expiration automatique des sessions
- [ ] HTTPS obligatoire en production
- [ ] Headers de sécurité (CSP, X-Frame-Options, etc.)

---

## 🔧 Fichiers Modifiés

### Backend

1. `Server/src/Controller/Api/ApiController.php`

   - Méthode `login()` - Ligne 155-206
   - Méthode `register()` - Ligne 208-287

2. `Server/src/Controller/ClientController.php`
   - Méthode `login()` - Ligne 24-100
   - Méthode `createClient()` - Ligne 154-275

### Frontend

1. `Client/src/pages/Login.jsx`

   - Méthode `handleSubmit()` - Ligne 23-73

2. `Client/src/pages/Signin.jsx`
   - Méthode `handleSignUp()` - Ligne 70-113
   - Ajout affichage erreurs - Ligne 241-248

---

## 🧪 Tests Recommandés

### Tests de Sécurité à Effectuer

1. **Test d'Injection SQL:** Essayer des payloads SQL dans les champs
2. **Test XSS:** Essayer `<script>alert('XSS')</script>` dans les champs
3. **Test de Force Brute:** Tenter plusieurs connexions échouées
4. **Test d'Énumération:** Vérifier que les messages d'erreur sont génériques
5. **Test de Validation:** Essayer des emails/mots de passe invalides
6. **Test de Sanitization:** Essayer des caractères spéciaux dans les noms

### Commandes de Test

```bash
# Tester l'inscription avec validation
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test","prenom":"User","email":"test@example.com","password":"Test1234"}'

# Tester le login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'
```

---

## 📝 Notes Importantes

1. **Mots de passe:** Toujours hashés avec Symfony UserPasswordHasher (bcrypt/argon2)
2. **Sessions:** Configurées côté serveur avec Symfony
3. **CORS:** Vérifier la configuration CORS pour l'API
4. **HTTPS:** Obligatoire en production pour protéger les credentials en transit

---

## ✅ Conclusion

Les principales vulnérabilités ont été corrigées:

- ✅ Injections SQL prévenues
- ✅ XSS atténué
- ✅ Validation stricte implémentée
- ✅ Données sensibles protégées

**Prochaines étapes recommandées:**

1. Implémenter le rate limiting
2. Ajouter la protection CSRF
3. Configurer HTTPS en production
4. Effectuer un audit de sécurité complet
