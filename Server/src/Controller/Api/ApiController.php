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

#[Route('/api', name: 'api')]
final class ApiController extends AbstractController
{
    private const DEFAULT_IMAGE = '/image/beauty.jpg';
    #[Route('/articles', name: 'articles', methods: ['GET'])]
    public function getArticles(ArticleRepository $articleRepository): Response
    {
        $articles = $articleRepository->findAll();
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

    #[Route('/auth/login', name: 'auth_login', methods: ['GET','POST'])]
    public function login(Request $request, ClientRepository $clientRepository, UserPasswordHasherInterface $passwordHasher): Response
    {
        $email = null;
        $password = null;

        if ($request->isMethod('GET')) {
            $email = $request->query->get('email');
            $password = $request->query->get('password');
        } else {
            $data = json_decode($request->getContent(), true) ?? [];
            $email = $data['email'] ?? null;
            $password = $data['password'] ?? null;
        }

        if (!$email || !$password) {
            return $this->json(['success' => false, 'message' => 'Email and password required'], 400);
        }

        $client = $clientRepository->findOneBy(['email' => $email]);

        if (!$client || !$passwordHasher->isPasswordValid($client, $password)) {
            return $this->json(['success' => false, 'message' => 'Invalid credentials'], 401);
        }

        // Return client data without password
        $clientData = [
            'id' => $client->getId(),
            'nom' => $client->getNom(),
            'prenom' => $client->getPrenom(),
            'email' => $client->getEmail(),
            'adresse' => $client->getAdresse(),
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

        $email = trim($data['email'] ?? '');
        $password = (string)($data['password'] ?? '');
        $nom = trim($data['nom'] ?? '');
        $prenom = trim($data['prenom'] ?? '');
        $adresse = trim($data['adresse'] ?? '');
        $telephone = $data['telephone'] ?? null;

        if (!$email || !$password || !$nom || !$prenom) {
            return $this->json([
                'success' => false,
                'message' => 'Champs requis manquants: email, password, nom, prenom'
            ], 400);
        }

        if ($clientRepository->findOneBy(['email' => $email])) {
            return $this->json([
                'success' => false,
                'message' => 'Un compte existe déjà avec cet email'
            ], 409);
        }

        $client = new Client();
        $client->setEmail($email);
        $client->setNom($nom);
        $client->setPrenom($prenom);
        if ($adresse) { $client->setAdresse($adresse); }
        if ($telephone !== null && $telephone !== '') { $client->setTelephone((int)$telephone); }
        $client->setCreatedAt(new \DateTimeImmutable());

        $hashed = $passwordHasher->hashPassword($client, $password);
        $client->setPassword($hashed);

        $em->persist($client);
        $em->flush();

        $clientData = [
            'id' => $client->getId(),
            'nom' => $client->getNom(),
            'prenom' => $client->getPrenom(),
            'email' => $client->getEmail(),
            'adresse' => $client->getAdresse(),
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
        if ($telephone !== null && $telephone !== '') { $client->setTelephone((int)$telephone); }
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
}
