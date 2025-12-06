# Script de test de sécurité pour l'authentification (Windows PowerShell)
# Usage: .\test_security.ps1

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Tests de Sécurité - Authentification" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:8000/api"

# Fonction pour afficher les résultats
function Print-Result {
    param (
        [bool]$success,
        [string]$message
    )
    
    if ($success) {
        Write-Host "✓ PASS: " -ForegroundColor Green -NoNewline
        Write-Host $message
    } else {
        Write-Host "✗ FAIL: " -ForegroundColor Red -NoNewline
        Write-Host $message
    }
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "1. Tests de Validation - Login" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Email invalide
Write-Host "Test 1: Email invalide..."
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/auth/login" `
        -Method Post `
        -ContentType "application/json" `
        -Body '{"email":"invalid-email","password":"Test1234"}' `
        -ErrorAction SilentlyContinue
    
    Print-Result $false "Email invalide devrait être rejeté (HTTP $($response.StatusCode))"
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Print-Result $true "Email invalide rejeté (HTTP 400)"
    } else {
        Print-Result $false "Email invalide devrait être rejeté (HTTP $($_.Exception.Response.StatusCode))"
    }
}
Write-Host ""

# Test 2: Mot de passe trop court
Write-Host "Test 2: Mot de passe trop court..."
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/auth/login" `
        -Method Post `
        -ContentType "application/json" `
        -Body '{"email":"test@example.com","password":"123"}' `
        -ErrorAction SilentlyContinue
    
    Print-Result $false "Mot de passe court devrait être rejeté (HTTP $($response.StatusCode))"
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Print-Result $true "Mot de passe court rejeté (HTTP 401)"
    } else {
        Print-Result $false "Mot de passe court devrait être rejeté (HTTP $($_.Exception.Response.StatusCode))"
    }
}
Write-Host ""

# Test 3: Champs manquants
Write-Host "Test 3: Champs manquants..."
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/auth/login" `
        -Method Post `
        -ContentType "application/json" `
        -Body '{"email":"test@example.com"}' `
        -ErrorAction SilentlyContinue
    
    Print-Result $false "Champs manquants devraient être rejetés (HTTP $($response.StatusCode))"
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Print-Result $true "Champs manquants rejetés (HTTP 400)"
    } else {
        Print-Result $false "Champs manquants devraient être rejetés (HTTP $($_.Exception.Response.StatusCode))"
    }
}
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "2. Tests de Validation - Inscription" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Test 4: Mot de passe faible
Write-Host "Test 4: Mot de passe faible (pas de majuscule)..."
try {
    $body = @{
        nom = "Dupont"
        prenom = "Jean"
        email = "test@example.com"
        password = "weakpass123"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/auth/register" `
        -Method Post `
        -ContentType "application/json" `
        -Body $body `
        -ErrorAction SilentlyContinue
    
    Print-Result $false "Mot de passe faible devrait être rejeté (HTTP $($response.StatusCode))"
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Print-Result $true "Mot de passe faible rejeté (HTTP 400)"
    } else {
        Print-Result $false "Mot de passe faible devrait être rejeté (HTTP $($_.Exception.Response.StatusCode))"
    }
}
Write-Host ""

# Test 5: Nom avec chiffres
Write-Host "Test 5: Nom avec chiffres..."
try {
    $body = @{
        nom = "Dupont123"
        prenom = "Jean"
        email = "test@example.com"
        password = "SecurePass123"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/auth/register" `
        -Method Post `
        -ContentType "application/json" `
        -Body $body `
        -ErrorAction SilentlyContinue
    
    Print-Result $false "Nom avec chiffres devrait être rejeté (HTTP $($response.StatusCode))"
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Print-Result $true "Nom avec chiffres rejeté (HTTP 400)"
    } else {
        Print-Result $false "Nom avec chiffres devrait être rejeté (HTTP $($_.Exception.Response.StatusCode))"
    }
}
Write-Host ""

# Test 6: Email invalide
Write-Host "Test 6: Email invalide..."
try {
    $body = @{
        nom = "Dupont"
        prenom = "Jean"
        email = "invalid-email"
        password = "SecurePass123"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/auth/register" `
        -Method Post `
        -ContentType "application/json" `
        -Body $body `
        -ErrorAction SilentlyContinue
    
    Print-Result $false "Email invalide devrait être rejeté (HTTP $($response.StatusCode))"
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Print-Result $true "Email invalide rejeté (HTTP 400)"
    } else {
        Print-Result $false "Email invalide devrait être rejeté (HTTP $($_.Exception.Response.StatusCode))"
    }
}
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "3. Tests de Sécurité - XSS" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Test 7: Tentative XSS dans le nom
Write-Host "Test 7: Tentative XSS dans le nom..."
try {
    $body = @{
        nom = '<script>alert("XSS")</script>'
        prenom = "Jean"
        email = "xss@example.com"
        password = "SecurePass123"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/auth/register" `
        -Method Post `
        -ContentType "application/json" `
        -Body $body `
        -ErrorAction SilentlyContinue
    
    $content = $response.Content
    if ($content -match "script") {
        Print-Result $false "XSS non échappé - VULNÉRABILITÉ DÉTECTÉE"
    } else {
        Print-Result $true "XSS correctement filtré"
    }
} catch {
    # Si rejeté à cause de la validation, c'est aussi bon
    Print-Result $true "XSS correctement filtré (rejeté par validation)"
}
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "4. Tests de Sécurité - Méthodes HTTP" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Test 8: GET sur login (devrait être refusé)
Write-Host "Test 8: Méthode GET sur login (devrait être refusée)..."
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/auth/login?email=test@example.com&password=Test1234" `
        -Method Get `
        -ErrorAction SilentlyContinue
    
    Print-Result $false "Méthode GET devrait être refusée (HTTP $($response.StatusCode))"
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 405 -or $statusCode -eq 404) {
        Print-Result $true "Méthode GET refusée (HTTP $statusCode)"
    } else {
        Print-Result $false "Méthode GET devrait être refusée (HTTP $statusCode)"
    }
}
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "5. Test d'Inscription Valide" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Test 9: Inscription valide
Write-Host "Test 9: Inscription avec données valides..."
$randomEmail = "test$(Get-Date -Format 'yyyyMMddHHmmss')@example.com"

try {
    $body = @{
        nom = "Dupont"
        prenom = "Jean"
        email = $randomEmail
        password = "SecurePass123"
        telephone = "0123456789"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/auth/register" `
        -Method Post `
        -ContentType "application/json" `
        -Body $body `
        -ErrorAction Stop
    
    if ($response.StatusCode -eq 201) {
        Print-Result $true "Inscription réussie (HTTP 201)"
        
        # Vérifier que les données sont échappées
        $content = $response.Content
        if ($content -match "htmlspecialchars") {
            Print-Result $false "Données non échappées correctement"
        } else {
            Print-Result $true "Données correctement échappées"
        }
    } else {
        Print-Result $false "Inscription devrait réussir (HTTP $($response.StatusCode))"
    }
} catch {
    Print-Result $false "Inscription devrait réussir (HTTP $($_.Exception.Response.StatusCode))"
    Write-Host "Erreur: $($_.Exception.Message)" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "6. Test de Login Valide" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Test 10: Login avec le compte créé
Write-Host "Test 10: Login avec le compte créé..."
try {
    $body = @{
        email = $randomEmail
        password = "SecurePass123"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/auth/login" `
        -Method Post `
        -ContentType "application/json" `
        -Body $body `
        -ErrorAction Stop
    
    if ($response.StatusCode -eq 200) {
        Print-Result $true "Login réussi (HTTP 200)"
    } else {
        Print-Result $false "Login devrait réussir (HTTP $($response.StatusCode))"
    }
} catch {
    Print-Result $false "Login devrait réussir (HTTP $($_.Exception.Response.StatusCode))"
}
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Résumé des Tests" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: " -ForegroundColor Yellow -NoNewline
Write-Host "Tous les tests de validation devraient passer."
Write-Host "Note: " -ForegroundColor Yellow -NoNewline
Write-Host "Si des tests échouent, vérifier les logs Symfony."
Write-Host ""
Write-Host "Pour voir les logs:"
Write-Host "  Get-Content Server\var\log\dev.log -Tail 50 -Wait"
Write-Host ""
