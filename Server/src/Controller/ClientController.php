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
    #[Route('/api/login', name: 'api_login', methods: ['GET','POST'])]
    public function login(
        Request $request,
        ClientRepository $clientRepository,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        try {
            $data = json_decode($request->getContent(), true);

            // Validation des champs
            if (!isset($data['email']) || !isset($data['password'])) {
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Email et mot de passe requis'
                ], Response::HTTP_BAD_REQUEST);
            }

            // Validation du format email
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Format d\'email invalide'
                ], Response::HTTP_BAD_REQUEST);
            }

            // Recherche du client
            $client = $clientRepository->findOneBy(['email' => $data['email']]);

            if (!$client) {
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Email ou mot de passe incorrect'
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Vérification du mot de passe
            if (!$passwordHasher->isPasswordValid($client, $data['password'])) {
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Email ou mot de passe incorrect'
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

            // Retour des informations du client connecté
            return new JsonResponse([
                'success' => true,
                'message' => 'Connexion réussie',
                'client' => [
                    'id' => $client->getId(),
                    'email' => $client->getEmail(),
                    'nom' => $client->getNom(),
                    'prenom' => $client->getPrenom()
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

            // Debug - Afficher les données reçues
            error_log('Données reçues: ' . print_r($data, true));
    
            // Validation des champs requis
            $requiredFields = ['nom_client', 'prenom_client', 'email_client', 'phone_client', 'password_client'];
            $missingFields = [];
            foreach ($requiredFields as $field) {
                if (!isset($data[$field]) || empty($data[$field])) {
                    $missingFields[] = $field;
                }
            }
            if (!empty($missingFields)) {
                return $this->json([
                    'success' => false,
                    'error' => "Champs manquants: " . implode(', ', $missingFields),
                    'received_data' => $data
                ], Response::HTTP_BAD_REQUEST);
            }
    
            // Vérifier si l'email existe déjà
            $existingClient = $clientRepository->findOneBy(['email' => $data['email_client']]);
            if ($existingClient) {
                return $this->json([
                    'success' => false,
                    'error' => 'Cette adresse email est déjà utilisée.'
                ], Response::HTTP_CONFLICT);
            }
    
            // Validation du format email
            if (!filter_var($data['email_client'], FILTER_VALIDATE_EMAIL)) {
                return $this->json([
                    'success' => false,
                    'error' => 'Format d\'email invalide.'
                ], Response::HTTP_BAD_REQUEST);
            }
    
            // Validation du numéro de téléphone (doit être numérique)
            $phone = preg_replace('/[^0-9]/', '', $data['phone_client']);
            if (empty($phone)) {
                return $this->json([
                    'success' => false,
                    'error' => 'Le numéro de téléphone doit contenir au moins un chiffre.'
                ], Response::HTTP_BAD_REQUEST);
            }
    
            try {
                $client = new Client();
                $client->setNom($data['nom_client']);
                $client->setPrenom($data['prenom_client']);
                $client->setEmail($data['email_client']);
                $client->setTelephone((int)$phone); // Utilisation du numéro nettoyé
                $client->setAdresse($data['adresse_client']);
                $client->setCreatedAt(\DateTimeImmutable::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s')));

                // Hachage du mot de passe avant de le stocker
                $hashedPassword = $passwordHasher->hashPassword(
                    $client,
                    $data['password_client']
                );
                $client->setPassword($hashedPassword);
        
                // Debug - Afficher l'objet client avant persistance
                error_log('Client avant persistance: ' . print_r([
                    'nom' => $client->getNom(),
                    'prenom' => $client->getPrenom(),
                    'email' => $client->getEmail(),
                    'telephone' => $client->getTelephone(),
                    'adresse' => $client->getAdresse(),
                ], true));
        
                $em->persist($client);
                $em->flush();
        
                return $this->json([
                    'success' => true,
                    'message' => 'Client créé avec succès',
                    'client' => [
                        'id' => $client->getId(),
                        'nom' => $client->getNom(),
                        'prenom' => $client->getPrenom(),
                        'email' => $client->getEmail(),
                        'telephone' => $client->getTelephone(),
                        'adresse' => $client->getAdresse(),
                        'created_at' => $client->getCreatedAt()->format('Y-m-d H:i:s')
                    ]
                ], Response::HTTP_CREATED);
            } catch (\Exception $e) {
                error_log('Erreur lors de la persistance: ' . $e->getMessage());
                return $this->json([
                    'success' => false,
                    'error' => 'Erreur lors de la sauvegarde en base de données',
                    'details' => $e->getMessage()
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
