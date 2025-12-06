#!/bin/bash

# Script de test de sécurité pour l'authentification
# Usage: bash test_security.sh

echo "=========================================="
echo "Tests de Sécurité - Authentification"
echo "=========================================="
echo ""

BASE_URL="http://localhost:8000/api"

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les résultats
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASS${NC}: $2"
    else
        echo -e "${RED}✗ FAIL${NC}: $2"
    fi
}

echo "=========================================="
echo "1. Tests de Validation - Login"
echo "=========================================="
echo ""

# Test 1: Email invalide
echo "Test 1: Email invalide..."
response=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid-email","password":"Test1234"}' \
  -w "\n%{http_code}")

http_code=$(echo "$response" | tail -n1)
if [ "$http_code" = "400" ]; then
    print_result 0 "Email invalide rejeté (HTTP 400)"
else
    print_result 1 "Email invalide devrait être rejeté (HTTP $http_code)"
fi
echo ""

# Test 2: Mot de passe trop court
echo "Test 2: Mot de passe trop court..."
response=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123"}' \
  -w "\n%{http_code}")

http_code=$(echo "$response" | tail -n1)
if [ "$http_code" = "401" ]; then
    print_result 0 "Mot de passe court rejeté (HTTP 401)"
else
    print_result 1 "Mot de passe court devrait être rejeté (HTTP $http_code)"
fi
echo ""

# Test 3: Champs manquants
echo "Test 3: Champs manquants..."
response=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}' \
  -w "\n%{http_code}")

http_code=$(echo "$response" | tail -n1)
if [ "$http_code" = "400" ]; then
    print_result 0 "Champs manquants rejetés (HTTP 400)"
else
    print_result 1 "Champs manquants devraient être rejetés (HTTP $http_code)"
fi
echo ""

echo "=========================================="
echo "2. Tests de Validation - Inscription"
echo "=========================================="
echo ""

# Test 4: Mot de passe faible
echo "Test 4: Mot de passe faible (pas de majuscule)..."
response=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "nom":"Dupont",
    "prenom":"Jean",
    "email":"test@example.com",
    "password":"weakpass123"
  }' \
  -w "\n%{http_code}")

http_code=$(echo "$response" | tail -n1)
if [ "$http_code" = "400" ]; then
    print_result 0 "Mot de passe faible rejeté (HTTP 400)"
else
    print_result 1 "Mot de passe faible devrait être rejeté (HTTP $http_code)"
fi
echo ""

# Test 5: Nom avec chiffres
echo "Test 5: Nom avec chiffres..."
response=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "nom":"Dupont123",
    "prenom":"Jean",
    "email":"test@example.com",
    "password":"SecurePass123"
  }' \
  -w "\n%{http_code}")

http_code=$(echo "$response" | tail -n1)
if [ "$http_code" = "400" ]; then
    print_result 0 "Nom avec chiffres rejeté (HTTP 400)"
else
    print_result 1 "Nom avec chiffres devrait être rejeté (HTTP $http_code)"
fi
echo ""

# Test 6: Email invalide
echo "Test 6: Email invalide..."
response=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "nom":"Dupont",
    "prenom":"Jean",
    "email":"invalid-email",
    "password":"SecurePass123"
  }' \
  -w "\n%{http_code}")

http_code=$(echo "$response" | tail -n1)
if [ "$http_code" = "400" ]; then
    print_result 0 "Email invalide rejeté (HTTP 400)"
else
    print_result 1 "Email invalide devrait être rejeté (HTTP $http_code)"
fi
echo ""

echo "=========================================="
echo "3. Tests de Sécurité - XSS"
echo "=========================================="
echo ""

# Test 7: Tentative XSS dans le nom
echo "Test 7: Tentative XSS dans le nom..."
response=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "nom":"<script>alert(\"XSS\")</script>",
    "prenom":"Jean",
    "email":"xss@example.com",
    "password":"SecurePass123"
  }')

# Vérifier que le script est échappé ou supprimé
if echo "$response" | grep -q "script"; then
    print_result 1 "XSS non échappé - VULNÉRABILITÉ DÉTECTÉE"
else
    print_result 0 "XSS correctement filtré"
fi
echo ""

echo "=========================================="
echo "4. Tests de Sécurité - Méthodes HTTP"
echo "=========================================="
echo ""

# Test 8: GET sur login (devrait être refusé)
echo "Test 8: Méthode GET sur login (devrait être refusée)..."
response=$(curl -s -X GET "$BASE_URL/auth/login?email=test@example.com&password=Test1234" \
  -w "\n%{http_code}")

http_code=$(echo "$response" | tail -n1)
if [ "$http_code" = "405" ] || [ "$http_code" = "404" ]; then
    print_result 0 "Méthode GET refusée (HTTP $http_code)"
else
    print_result 1 "Méthode GET devrait être refusée (HTTP $http_code)"
fi
echo ""

echo "=========================================="
echo "5. Test d'Inscription Valide"
echo "=========================================="
echo ""

# Test 9: Inscription valide
echo "Test 9: Inscription avec données valides..."
RANDOM_EMAIL="test$(date +%s)@example.com"
response=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"nom\":\"Dupont\",
    \"prenom\":\"Jean\",
    \"email\":\"$RANDOM_EMAIL\",
    \"password\":\"SecurePass123\",
    \"telephone\":\"0123456789\"
  }" \
  -w "\n%{http_code}")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n -1)

if [ "$http_code" = "201" ]; then
    print_result 0 "Inscription réussie (HTTP 201)"
    
    # Vérifier que les données sont échappées
    if echo "$body" | grep -q "htmlspecialchars"; then
        print_result 1 "Données non échappées correctement"
    else
        print_result 0 "Données correctement échappées"
    fi
else
    print_result 1 "Inscription devrait réussir (HTTP $http_code)"
    echo "Réponse: $body"
fi
echo ""

echo "=========================================="
echo "6. Test de Login Valide"
echo "=========================================="
echo ""

# Test 10: Login avec le compte créé
echo "Test 10: Login avec le compte créé..."
response=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\":\"$RANDOM_EMAIL\",
    \"password\":\"SecurePass123\"
  }" \
  -w "\n%{http_code}")

http_code=$(echo "$response" | tail -n1)
if [ "$http_code" = "200" ]; then
    print_result 0 "Login réussi (HTTP 200)"
else
    print_result 1 "Login devrait réussir (HTTP $http_code)"
fi
echo ""

echo "=========================================="
echo "Résumé des Tests"
echo "=========================================="
echo ""
echo -e "${YELLOW}Note:${NC} Tous les tests de validation devraient passer."
echo -e "${YELLOW}Note:${NC} Si des tests échouent, vérifier les logs Symfony."
echo ""
echo "Pour voir les logs:"
echo "  tail -f Server/var/log/dev.log"
echo ""
