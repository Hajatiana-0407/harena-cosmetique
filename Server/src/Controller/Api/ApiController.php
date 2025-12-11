<?php

namespace App\Controller\Api;

use App\Repository\ArticleRepository;
use App\Repository\ProduitRepository;
use App\Repository\CategorieRepository;
use App\Repository\TemoignageRepository;
use App\Repository\AvisRepository;
use App\Repository\ClientRepository;
use App\Repository\MessengerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Produit;
use App\Entity\Client;
use App\Entity\Panier;
use App\Repository\PanierRepository;
use App\Entity\Promo;
use App\Repository\PromoRepository;
use App\Repository\NewsletterRepository;

#[Route('/api', name: 'api')]
final class ApiController extends AbstractController
{
    private const DEFAULT_IMAGE = '/image/beauty.jpg';

    #[Route('/articles', name: 'articles', methods: ['GET'])]
    public function getArticles(Request $request, ArticleRepository $articleRepository): Response
    {
        $query = $request->query->get('q');

        if ($query) {
            $articles = $articleRepository->createQueryBuilder('a')
                ->where('a.titre LIKE :query')
                ->orWhere('a.contenu LIKE :query')
                ->setParameter('query', '%' . $query . '%')
                ->getQuery()
                ->getResult();
        } else {
            $articles = $articleRepository->findAll();
        }

        return $this->json($articles, 200, [], ['groups' => 'article:read']);
    }

    #[Route('/articles/{id}', name: 'article_show', methods: ['GET'])]
    public function getArticle(int $id, ArticleRepository $articleRepository): Response
    {
        $article = $articleRepository->find($id);

        if (!$article) {
            return $this->json(['error' => 'Article not found'], 404);
        }

        return $this->json($article, 200, [], ['groups' => 'article:read']);
    }

    #[Route('/produits', name: 'produits', methods: ['GET'])]
    public function getProduits(ProduitRepository $produitRepository): Response
    {
        $produits = $produitRepository->findAll();

        // Utiliser l'image temporaire pour tous les produits
        foreach ($produits as $produit) {
            if (!$produit->getImage() || empty($produit->getImage())) {
                $produit->setImage('/image/beauty.jpg');
            }
            if (!$produit->getImageMini1() || empty($produit->getImageMini1())) {
                $produit->setImageMini1('/image/beauty.jpg');
            }
            if (!$produit->getImageMini2() || empty($produit->getImageMini2())) {
                $produit->setImageMini2('/image/beauty.jpg');
            }
            if (!$produit->getImageMini3() || empty($produit->getImageMini3())) {
                $produit->setImageMini3('/image/beauty.jpg');
            }
        }

        return $this->json($produits, 200, [], ['groups' => 'produit:read']);
    }

    #[Route('/produits/{id}', name: 'produit_show', methods: ['GET'])]
    public function getProduit(int $id, ProduitRepository $produitRepository): Response
    {
        $produit = $produitRepository->find($id);

        if (!$produit) {
            return $this->json(['error' => 'Produit not found'], 404);
        }

        // Utiliser l'image temporaire si nécessaire
        if (!$produit->getImage() || empty($produit->getImage())) {
            $produit->setImage('/image/beauty.jpg');
        }

        return $this->json($produit, 200, [], ['groups' => 'produit:read']);
    }

    #[Route('/categories', name: 'categories', methods: ['GET'])]
    public function getCategories(CategorieRepository $categorieRepository): Response
    {
        $categories = $categorieRepository->findAll();
        return $this->json($categories, 200, [], ['groups' => 'categorie:read']);
    }

    #[Route('/categories/{id}', name: 'categorie_show', methods: ['GET'])]
    public function getCategorie(int $id, CategorieRepository $categorieRepository): Response
    {
        $categorie = $categorieRepository->find($id);

        if (!$categorie) {
            return $this->json(['error' => 'Categorie not found'], 404);
        }

        return $this->json($categorie, 200, [], ['groups' => 'categorie:read']);
    }

    #[Route('/categories/{id}/produits', name: 'categorie_produits', methods: ['GET'])]
    public function getCategorieProducts(int $id, CategorieRepository $categorieRepository): Response
    {
        $categorie = $categorieRepository->find($id);

        if (!$categorie) {
            return $this->json(['error' => 'Categorie not found'], 404);
        }

        $produits = $categorie->getProduitsCategorie();

        // Appliquer les images temporaires
        foreach ($produits as $produit) {
            if (!$produit->getImage() || empty($produit->getImage())) {
                $produit->setImage('/image/beauty.jpg');
            }
        }

        return $this->json($produits, 200, [], ['groups' => 'produit:read']);
    }

    #[Route('/temoignages', name: 'temoignages', methods: ['GET'])]
    public function getTemoignages(TemoignageRepository $temoignageRepository): Response
    {
        $temoignages = $temoignageRepository->findAll();

        // Utiliser l'image temporaire pour les témoignages
        foreach ($temoignages as $temoignage) {
            if (!$temoignage->getImage() || empty($temoignage->getImage())) {
                $temoignage->setImage('/image/beauty.jpg');
            }
        }

        return $this->json($temoignages, 200, [], ['groups' => 'temoignage:read']);
    }

    #[Route('/avis', name: 'avis', methods: ['GET'])]
    public function getAvis(AvisRepository $avisRepository): Response
    {
        $avis = $avisRepository->findAll();
        return $this->json($avis, 200, [], ['groups' => 'avis:read']);
    }

    #[Route('/avis/produit/{id}', name: 'avis_produit', methods: ['GET'])]
    public function getAvisByProduit(int $id, AvisRepository $avisRepository): Response
    {
        $avis = $avisRepository->findByProduitId($id);
        return $this->json($avis, 200, [], ['groups' => 'avis:read']);
    }

    #[Route('/avis', name: 'create_avis', methods: ['POST'])]
    public function createAvis(Request $request, EntityManagerInterface $em, ClientRepository $clientRepository, ProduitRepository $produitRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        $idClient = $data['id_client'] ?? null;
        $idProduit = $data['id_produit'] ?? null;
        $etoiles = $data['etoiles'] ?? null;
        $titre = trim($data['titre'] ?? '');
        $contenu = trim($data['contenu'] ?? '');

        if (!$idClient || !$idProduit || $etoiles === null || !$titre || !$contenu) {
            return $this->json(['success' => false, 'message' => 'Tous les champs sont requis'], 400);
        }

        if ($etoiles < 1 || $etoiles > 5) {
            return $this->json(['success' => false, 'message' => 'Les étoiles doivent être entre 1 et 5'], 400);
        }

        $client = $clientRepository->find($idClient);
        $produit = $produitRepository->find($idProduit);

        if (!$client || !$produit) {
            return $this->json(['success' => false, 'message' => 'Client ou Produit non trouvé'], 404);
        }

        $avis = new \App\Entity\Avis();
        $avis->setIdClient($client);
        $avis->setDatePost(new \DateTimeImmutable());
        $avis->setEtoiles($etoiles);
        $avis->setTitre($titre);
        $avis->setContenu($contenu);
        $avis->addProduit($produit);

        $em->persist($avis);
        $em->flush();

        return $this->json(['success' => true, 'message' => 'Avis ajouté avec succès'], 201);
    }

    #[Route('/auth/login', name: 'auth_login', methods: ['POST'])]
    public function login(Request $request, ClientRepository $clientRepository, UserPasswordHasherInterface $passwordHasher): Response
    {
        // Only accept POST requests for security
        $data = json_decode($request->getContent(), true) ?? [];

        // Sanitize and validate inputs
        $email = isset($data['email']) ? trim(strip_tags($data['email'])) : null;
        $password = isset($data['password']) ? $data['password'] : null;

        // Validate required fields
        if (!$email || !$password) {
            return $this->json([
                'success' => false,
                'message' => 'Email et mot de passe requis'
            ], 400);
        }

        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->json([
                'success' => false,
                'message' => 'Format d\'email invalide'
            ], 400);
        }

        // Validate password length (minimum security check)
        if (strlen($password) < 6) {
            return $this->json([
                'success' => false,
                'message' => 'Identifiants invalides'
            ], 401);
        }

        $client = $clientRepository->findOneBy(['email' => $email]);

        // Use generic error message to prevent user enumeration
        if (!$client || !$passwordHasher->isPasswordValid($client, $password)) {
            return $this->json([
                'success' => false,
                'message' => 'Identifiants invalides'
            ], 401);
        }

        // Return sanitized client data without password
        $clientData = [
            'id' => $client->getId(),
            'nom' => htmlspecialchars($client->getNom(), ENT_QUOTES, 'UTF-8'),
            'prenom' => htmlspecialchars($client->getPrenom(), ENT_QUOTES, 'UTF-8'),
            'email' => htmlspecialchars($client->getEmail(), ENT_QUOTES, 'UTF-8'),
            'adresse' => htmlspecialchars($client->getAdresse() ?? '', ENT_QUOTES, 'UTF-8'),
            'telephone' => $client->getTelephone(),
        ];

        return $this->json(['success' => true, 'client' => $clientData]);
    }

    #[Route('/auth/register', name: 'auth_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        ClientRepository $clientRepository,
        UserPasswordHasherInterface $passwordHasher
    ): Response {
        $data = json_decode($request->getContent(), true) ?? [];

        // Sanitize and validate inputs
        $email = isset($data['email']) ? trim(strip_tags($data['email'])) : '';
        $password = isset($data['password']) ? $data['password'] : '';
        $nom = isset($data['nom']) ? trim(strip_tags($data['nom'])) : '';
        $prenom = isset($data['prenom']) ? trim(strip_tags($data['prenom'])) : '';
        $adresse = isset($data['adresse']) ? trim(strip_tags($data['adresse'])) : '';
        $telephone = isset($data['telephone']) ? preg_replace('/[^0-9]/', '', $data['telephone']) : null;

        // Validate required fields
        if (!$email || !$password || !$nom || !$prenom) {
            return $this->json([
                'success' => false,
                'message' => 'Champs requis manquants: email, password, nom, prenom'
            ], 400);
        }

        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->json([
                'success' => false,
                'message' => 'Format d\'email invalide'
            ], 400);
        }

        // Validate password strength (minimum 8 characters, 1 uppercase, 1 number)
        if (strlen($password) < 8 || !preg_match('/[A-Z]/', $password) || !preg_match('/[0-9]/', $password)) {
            return $this->json([
                'success' => false,
                'message' => 'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre'
            ], 400);
        }

        // Validate name fields (no numbers or special characters)
        if (!preg_match('/^[a-zA-ZÀ-ÿ\s\-\']+$/', $nom) || !preg_match('/^[a-zA-ZÀ-ÿ\s\-\']+$/', $prenom)) {
            return $this->json([
                'success' => false,
                'message' => 'Les noms ne doivent contenir que des lettres'
            ], 400);
        }

        // Check if email already exists
        if ($clientRepository->findOneBy(['email' => $email])) {
            return $this->json([
                'success' => false,
                'message' => 'Un compte existe déjà avec cet email'
            ], 409);
        }

        // Create new client
        $client = new Client();
        $client->setEmail($email);
        $client->setNom($nom);
        $client->setPrenom($prenom);
        if ($adresse) { $client->setAdresse($adresse); }
        if ($telephone) { $client->setTelephone($telephone); }
        $client->setCreatedAt(new \DateTimeImmutable());

        // Hash password
        $hashed = $passwordHasher->hashPassword($client, $password);
        $client->setPassword($hashed);

        $em->persist($client);
        $em->flush();

        // Return sanitized client data
        $clientData = [
            'id' => $client->getId(),
            'nom' => htmlspecialchars($client->getNom(), ENT_QUOTES, 'UTF-8'),
            'prenom' => htmlspecialchars($client->getPrenom(), ENT_QUOTES, 'UTF-8'),
            'email' => htmlspecialchars($client->getEmail(), ENT_QUOTES, 'UTF-8'),
            'adresse' => htmlspecialchars($client->getAdresse() ?? '', ENT_QUOTES, 'UTF-8'),
            'telephone' => $client->getTelephone(),
        ];

        return $this->json([
            'success' => true,
            'message' => 'Compte créé avec succès',
            'client' => $clientData
        ], 201);
    }

    #[Route('/messages', name: 'messages', methods: ['GET'])]
    public function getMessages(MessengerRepository $messengerRepository): Response
    {
        $messages = $messengerRepository->findBy([], ['Created_At' => 'DESC']);

        $formattedMessages = [];
        foreach ($messages as $message) {
            $formattedMessages[] = [
                'id' => $message->getId(),
                'objet' => $message->getObjet(),
                'message' => $message->getObjet(), // For compatibility
                'destinateur' => $message->getDestinateur(),
                'created_at' => $message->getCreatedAt()->format('Y-m-d H:i:s'),
                'client' => [
                    'id' => $message->getClient()->getId(),
                    'nom' => $message->getClient()->getNom(),
                    'prenom' => $message->getClient()->getPrenom(),
                ]
            ];
        }

        return $this->json($formattedMessages);
    }

    #[Route('/messages', name: 'send_message', methods: ['POST'])]
    public function sendMessage(Request $request, ClientRepository $clientRepository, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);

        $objet = $data['objet'] ?? '';
        $destinateur = $data['destinateur'] ?? '';
        $id_client = $data['id_client'] ?? null;

        if (!$objet || !$destinateur || !$id_client) {
            return $this->json(['success' => false, 'message' => 'Tous les champs requis doivent être remplis'], 400);
        }

        $client = $clientRepository->find($id_client);
        if (!$client) {
            return $this->json(['success' => false, 'message' => 'Client non trouvé'], 404);
        }

        $message = new \App\Entity\Messenger();
        $message->setObjet($objet);
        $message->setDestinateur($destinateur);
        $message->setClient($client);
        $message->setCreatedAt(new \DateTimeImmutable());

        $em->persist($message);
        $em->flush();

        return $this->json(['success' => true, 'message' => 'Message envoyé avec succès']);
    }

    #[Route('/client/update', name: 'client_update', methods: ['PUT'])]
    public function updateClient(Request $request, ClientRepository $clientRepository, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher): Response
    {
        $client = null;
        $storedClient = $request->getSession()->get('client');
        if ($storedClient) {
            $client = $clientRepository->find($storedClient['id']);
        }

        if (!$client) {
            return $this->json(['success' => false, 'message' => 'Client non authentifié'], 401);
        }

        $data = json_decode($request->getContent(), true) ?? [];

        $nom = trim($data['nom'] ?? '');
        $prenom = trim($data['prenom'] ?? '');
        $email = trim($data['email'] ?? '');
        $adresse = trim($data['adresse'] ?? '');
        $telephone = $data['telephone'] ?? null;
        $password = $data['password'] ?? null;

        if (!$nom || !$prenom || !$email) {
            return $this->json(['success' => false, 'message' => 'Nom, prénom et email sont requis'], 400);
        }

        // Check if email is already taken by another client
        $existingClient = $clientRepository->findOneBy(['email' => $email]);
        if ($existingClient && $existingClient->getId() !== $client->getId()) {
            return $this->json(['success' => false, 'message' => 'Cet email est déjà utilisé'], 409);
        }

        $client->setNom($nom);
        $client->setPrenom($prenom);
        $client->setEmail($email);
        if ($adresse) { $client->setAdresse($adresse); }
        if ($telephone !== null && $telephone !== '') { $client->setTelephone($telephone); }
        if ($password) {
            $hashed = $passwordHasher->hashPassword($client, $password);
            $client->setPassword($hashed);
        }

        $em->flush();

        $clientData = [
            'id' => $client->getId(),
            'nom' => $client->getNom(),
            'prenom' => $client->getPrenom(),
            'email' => $client->getEmail(),
            'adresse' => $client->getAdresse(),
            'telephone' => $client->getTelephone(),
        ];

        return $this->json(['success' => true, 'message' => 'Profil mis à jour avec succès', 'client' => $clientData]);
    }

    #[Route('/search', name: 'search', methods: ['GET'])]
    public function search(Request $request, ProduitRepository $produitRepository): Response
    {
        $query = $request->query->get('q', '');

        if (empty($query)) {
            return $this->json([]);
        }

        $produits = $produitRepository->createQueryBuilder('p')
            ->where('p.nom LIKE :query')
            ->orWhere('p.description LIKE :query')
            ->setParameter('query', '%' . $query . '%')
            ->getQuery()
            ->getResult();

        // Apply default images
        foreach ($produits as $produit) {
            if (!$produit->getImage() || empty($produit->getImage())) {
                $produit->setImage('/image/beauty.jpg');
            }
        }

        return $this->json($produits, 200, [], ['groups' => 'produit:read']);
    }

    #[Route('/contact', name: 'contact', methods: ['POST'])]
    public function contact(Request $request, \Symfony\Component\Mailer\MailerInterface $mailer): Response
    {
        $data = json_decode($request->getContent(), true);

        $nom = $data['Nom'] ?? '';
        $prenom = $data['prenom'] ?? '';
        $address = $data['address'] ?? '';
        $email = $data['email'] ?? '';
        $phone = $data['phone-number'] ?? '';
        $operator = $data['operator'] ?? '';
        $message = $data['message'] ?? '';
        $agree = $data['agree-to-policies'] ?? false;

        if (!$nom || !$prenom || !$email || !$message || !$agree) {
            return $this->json(['success' => false, 'message' => 'Tous les champs requis doivent être remplis'], 400);
        }

        // Send email
        $emailMessage = (new \Symfony\Component\Mime\Email())
            ->from('ransdtfabricefaniry@gmail.com')
            ->to('ransdtfabricefaniry@gmail.com')
            ->subject('Nouveau message de contact')
            ->text("Nom: $nom\nPrénom: $prenom\nAdresse: $address\nEmail: $email\nTéléphone: $operator $phone\nMessage: $message");

        $mailer->send($emailMessage);

        return $this->json(['success' => true, 'message' => 'Message envoyé avec succès']);
    }

    #[Route('/panier', name: 'get_panier', methods: ['GET'])]
    public function getPanier(Request $request, ClientRepository $clientRepository, PanierRepository $panierRepository, EntityManagerInterface $em): Response
    {
        // Retrieve client from session (simulated for now as session might not be persistent in this context without proper config)
        // In a real API, use JWT or Session cookie. Here we check if 'client' is in session or passed as query param for testing.
        $clientId = $request->query->get('clientId');

        if (!$clientId) {
             // Try to get from session if available
             $sessionClient = $request->getSession()->get('client');
             if ($sessionClient) {
                 $clientId = $sessionClient['id'];
             }
        }

        if (!$clientId) {
            return $this->json(['success' => false, 'message' => 'Client non identifié'], 401);
        }

        $client = $clientRepository->find($clientId);
        if (!$client) {
            return $this->json(['success' => false, 'message' => 'Client non trouvé'], 404);
        }

        $panier = $panierRepository->findOneBy(['idclient' => $client]);

        if (!$panier) {
            $panier = new Panier();
            $panier->setIdclient($client);
            $panier->setItems([]);
            $panier->setUpdatedAt(new \DateTimeImmutable());
            $em->persist($panier);
            $em->flush();
        }

        return $this->json($panier, 200, [], ['groups' => 'panier:read']);
    }

    #[Route('/panier/add', name: 'add_to_panier', methods: ['POST'])]
    public function addToPanier(Request $request, ClientRepository $clientRepository, PanierRepository $panierRepository, ProduitRepository $produitRepository, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);
        $clientId = $data['clientId'] ?? null;
        $productId = $data['productId'] ?? null;
        $quantity = $data['quantity'] ?? 1;

        if (!$clientId || !$productId) {
            return $this->json(['success' => false, 'message' => 'Client ID et Product ID requis'], 400);
        }

        $client = $clientRepository->find($clientId);
        $produit = $produitRepository->find($productId);

        if (!$client || !$produit) {
            return $this->json(['success' => false, 'message' => 'Client ou Produit non trouvé'], 404);
        }

        $panier = $panierRepository->findOneBy(['idclient' => $client]);
        if (!$panier) {
            $panier = new Panier();
            $panier->setIdclient($client);
            $panier->setItems([]);
            $panier->setUpdatedAt(new \DateTimeImmutable());
            $em->persist($panier);
        }

        $items = $panier->getItems();
        $found = false;
        foreach ($items as &$item) {
            if ($item['id'] === $productId) {
                $item['quantity'] += $quantity;
                $found = true;
                break;
            }
        }

        if (!$found) {
            $items[] = [
                'id' => $produit->getId(),
                'name' => $produit->getNom(),
                'price' => $produit->getPrix(),
                'image' => $produit->getImage() ?? '/image/beauty.jpg',
                'quantity' => $quantity
            ];
        }

        $panier->setItems($items);
        $panier->setUpdatedAt(new \DateTimeImmutable());
        $em->flush();

        return $this->json(['success' => true, 'panier' => $panier], 200, [], ['groups' => 'panier:read']);
    }

    #[Route('/panier/remove', name: 'remove_from_panier', methods: ['POST'])]
    public function removeFromPanier(Request $request, ClientRepository $clientRepository, PanierRepository $panierRepository, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);
        $clientId = $data['clientId'] ?? null;
        $productId = $data['productId'] ?? null;

        if (!$clientId || !$productId) {
            return $this->json(['success' => false, 'message' => 'Client ID et Product ID requis'], 400);
        }

        $client = $clientRepository->find($clientId);
        if (!$client) {
            return $this->json(['success' => false, 'message' => 'Client non trouvé'], 404);
        }

        $panier = $panierRepository->findOneBy(['idclient' => $client]);
        if (!$panier) {
            return $this->json(['success' => false, 'message' => 'Panier vide'], 404);
        }

        $items = $panier->getItems();
        $items = array_filter($items, function($item) use ($productId) {
            return $item['id'] !== $productId;
        });

        $panier->setItems(array_values($items));
        $panier->setUpdatedAt(new \DateTimeImmutable());
        $em->flush();

        return $this->json(['success' => true, 'panier' => $panier], 200, [], ['groups' => 'panier:read']);
    }

    #[Route('/panier/clear', name: 'clear_panier', methods: ['POST'])]
    public function clearPanier(Request $request, ClientRepository $clientRepository, PanierRepository $panierRepository, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);
        $clientId = $data['clientId'] ?? null;

        if (!$clientId) {
            return $this->json(['success' => false, 'message' => 'Client ID requis'], 400);
        }

        $client = $clientRepository->find($clientId);
        if (!$client) {
            return $this->json(['success' => false, 'message' => 'Client non trouvé'], 404);
        }

        $panier = $panierRepository->findOneBy(['idclient' => $client]);
        if ($panier) {
            $panier->setItems([]);
            $panier->setUpdatedAt(new \DateTimeImmutable());
            $em->flush();
        }

        return $this->json(['success' => true, 'message' => 'Panier vidé']);
    }

    #[Route('/promo/validate', name: 'validate_promo', methods: ['POST'])]
    public function validatePromoCode(Request $request, PromoRepository $promoRepository): Response
    {
        $data = json_decode($request->getContent(), true);
        $code = trim($data['code'] ?? '');

        if (!$code) {
            return $this->json(['success' => false, 'message' => 'Code promo requis'], 400);
        }

        $promo = $promoRepository->findActivePromoByCode($code);

        if (!$promo) {
            return $this->json(['success' => false, 'message' => 'Code promo invalide ou expiré'], 400);
        }

        return $this->json([
            'success' => true,
            'type' => $promo->getType(),
            'valeur' => $promo->getValeur(),
            'description' => $promo->getDescription()
        ]);
    }

    #[Route('/newsletter/subscribe', name: 'newsletter_subscribe', methods: ['POST'])]
    public function subscribeNewsletter(Request $request, EntityManagerInterface $em, NewsletterRepository $newsletterRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        $email = trim($data['email'] ?? '');

        if (!$email) {
            return $this->json(['success' => false, 'message' => 'Email requis'], 400);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->json(['success' => false, 'message' => 'Format d\'email invalide'], 400);
        }

        // Check if email already subscribed
        $existing = $newsletterRepository->findOneBy(['email' => $email]);
        if ($existing) {
            return $this->json(['success' => false, 'message' => 'Vous êtes déjà inscrit à la newsletter'], 409);
        }

        // Create and persist new subscription
        $newsletter = new Newsletter();
        $newsletter->setEmail($email);
        $newsletter->setCreatedAt(new \DateTimeImmutable());

        $em->persist($newsletter);
        $em->flush();

        return $this->json(['success' => true, 'message' => 'Inscription à la newsletter réussie']);
    }
}
