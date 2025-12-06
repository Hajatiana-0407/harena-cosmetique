<?php

namespace App\Controller;

use App\Entity\Client;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class ClientController extends AbstractController
{

    /**
     * Gère la requête de connexion (login) envoyée par le formulaire React.
     * Récupère l'email et le mot de passe depuis le corps JSON de la requête.
     * * @param Request $request La requête HTTP entrante.
     * // Injecter ClientRepository et UserPasswordHasherInterface ici dans un vrai projet
     */
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(
        Request $request,
        ClientRepository $clientRepository,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        try {
            $data = json_decode($request->getContent(), true);

            // Sanitize and validate inputs
            $email = isset($data['email']) ? trim(strip_tags($data['email'])) : null;
            $password = isset($data['password']) ? $data['password'] : null;

            // Validation des champs
            if (!$email || !$password) {
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Email et mot de passe requis'
                ], Response::HTTP_BAD_REQUEST);
            }

            // Validation du format email
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Format d\'email invalide'
                ], Response::HTTP_BAD_REQUEST);
            }

            // Validate password length
            if (strlen($password) < 6) {
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Identifiants invalides'
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Recherche du client
            $client = $clientRepository->findOneBy(['email' => $email]);

            // Use generic error message to prevent user enumeration
            if (!$client || !$passwordHasher->isPasswordValid($client, $password)) {
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Identifiants invalides'
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Démarrer et configurer la session
            if (!$request->hasSession()) {
                $request->getSession();
            }
            $session = $request->getSession();
            $session->start();
            
            // Stockage des informations du client en session
            $session->set('client_id', $client->getId());
            $session->set('client_email', $client->getEmail());
            $session->set('client_nom', $client->getNom());
            $session->set('client_prenom', $client->getPrenom());

            // Retour des informations sanitisées du client connecté
            return new JsonResponse([
                'success' => true,
                'message' => 'Connexion réussie',
                'client' => [
                    'id' => $client->getId(),
                    'email' => htmlspecialchars($client->getEmail(), ENT_QUOTES, 'UTF-8'),
                    'nom' => htmlspecialchars($client->getNom(), ENT_QUOTES, 'UTF-8'),
                    'prenom' => htmlspecialchars($client->getPrenom(), ENT_QUOTES, 'UTF-8')
                ]
            ], Response::HTTP_OK);

        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Une erreur est survenue lors de la connexion'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
        // --- FIN DE LA LOGIQUE DE VÉRIFICATION ET AUTHENTIFICATION ---
    }
    
    // Vous pouvez garder cette route pour l'exemple mais elle n'est pas nécessaire pour le login
    #[Route('/api/auth/login', name: 'check_auth', methods: ['POST'])]
    public function checkAuth(Request $request, ClientRepository $clientRepository): JsonResponse
    {
        // Démarrer la session si elle n'est pas déjà démarrée
        if (!$request->hasSession()) {
            $request->getSession();
        }
        
        $session = $request->getSession();
        $clientId = $session->get('client_id');

        if (!$clientId) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Non connecté'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $client = $clientRepository->find($clientId);
        if (!$client) {
            $session->clear();
            return new JsonResponse([
                'success' => false,
                'message' => 'Session invalide'
            ], Response::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse([
            'success' => true,
            'client' => [
                'id' => $client->getId(),
                'email' => $client->getEmail(),
                'nom' => $client->getNom(),
                'prenom' => $client->getPrenom()
            ]
        ], Response::HTTP_OK);
    }

    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(Request $request): JsonResponse
    {
        $session = $request->getSession();
        $session->clear();

        return new JsonResponse([
            'success' => true,
            'message' => 'Déconnexion réussie'
        ]);
    }


    #[Route('/api/register', name: 'api_client_create', methods: ['POST'])]
    public function createClient(
        Request $request, 
        EntityManagerInterface $em, 
        ClientRepository $clientRepository,
        UserPasswordHasherInterface $passwordHasher
    ): Response
    {
        try {
            $content = $request->getContent();
            if (empty($content)) {
                throw new \Exception('Aucune donnée reçue');
            }

            $data = json_decode($content, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('Format JSON invalide: ' . json_last_error_msg());
            }
    
            // Sanitize and validate inputs
            $nom = isset($data['nom']) ? trim(strip_tags($data['nom'])) : '';
            $prenom = isset($data['prenom']) ? trim(strip_tags($data['prenom'])) : '';
            $email = isset($data['email']) ? trim(strip_tags($data['email'])) : '';
            $phone = isset($data['telephone']) ? preg_replace('/[^0-9]/', '', $data['telephone']) : '';
            $password = isset($data['password']) ? $data['password'] : '';
            $adresse = isset($data['adresse']) ? trim(strip_tags($data['adresse'])) : '';

            // Validation des champs requis
            if (!$nom || !$prenom || !$email || !$phone || !$password) {
                return $this->json([
                    'success' => false,
                    'error' => 'Tous les champs requis doivent être remplis'
                ], Response::HTTP_BAD_REQUEST);
            }
    
            // Vérifier si l'email existe déjà
            $existingClient = $clientRepository->findOneBy(['email' => $email]);
            if ($existingClient) {
                return $this->json([
                    'success' => false,
                    'error' => 'Cette adresse email est déjà utilisée.'
                ], Response::HTTP_CONFLICT);
            }
    
            // Validation du format email
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                return $this->json([
                    'success' => false,
                    'error' => 'Format d\'email invalide.'
                ], Response::HTTP_BAD_REQUEST);
            }

            // Validate password strength
            if (strlen($password) < 8 || !preg_match('/[A-Z]/', $password) || !preg_match('/[0-9]/', $password)) {
                return $this->json([
                    'success' => false,
                    'error' => 'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre'
                ], Response::HTTP_BAD_REQUEST);
            }

            // Validate name fields
            if (!preg_match('/^[a-zA-ZÀ-ÿ\s\-\']+$/', $nom) || !preg_match('/^[a-zA-ZÀ-ÿ\s\-\']+$/', $prenom)) {
                return $this->json([
                    'success' => false,
                    'error' => 'Les noms ne doivent contenir que des lettres'
                ], Response::HTTP_BAD_REQUEST);
            }
    
            // Validation du numéro de téléphone
            if (empty($phone)) {
                return $this->json([
                    'success' => false,
                    'error' => 'Le numéro de téléphone doit contenir au moins un chiffre.'
                ], Response::HTTP_BAD_REQUEST);
            }
    
            try {
                $client = new Client();
                $client->setNom($nom);
                $client->setPrenom($prenom);
                $client->setEmail($email);
                $client->setTelephone($phone);
                $client->setAdresse($adresse);
                $client->setCreatedAt(\DateTimeImmutable::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s')));

                // Hachage du mot de passe avant de le stocker
                $hashedPassword = $passwordHasher->hashPassword($client, $password);
                $client->setPassword($hashedPassword);
        
                $em->persist($client);
                $em->flush();
        
                return $this->json([
                    'success' => true,
                    'message' => 'Client créé avec succès',
                    'client' => [
                        'id' => $client->getId(),
                        'nom' => htmlspecialchars($client->getNom(), ENT_QUOTES, 'UTF-8'),
                        'prenom' => htmlspecialchars($client->getPrenom(), ENT_QUOTES, 'UTF-8'),
                        'email' => htmlspecialchars($client->getEmail(), ENT_QUOTES, 'UTF-8'),
                        'telephone' => $client->getTelephone(),
                        'adresse' => htmlspecialchars($client->getAdresse(), ENT_QUOTES, 'UTF-8'),
                        'created_at' => $client->getCreatedAt()->format('Y-m-d H:i:s')
                    ]
                ], Response::HTTP_CREATED);
            } catch (\Exception $e) {
                return $this->json([
                    'success' => false,
                    'error' => 'Erreur lors de la sauvegarde en base de données'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
    
        } catch (\Exception $e) {
            return $this->json([
                'success' => false,
                'error' => 'Une erreur est survenue lors de la création du client.',
                'details' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
