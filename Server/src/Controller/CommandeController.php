<?php

namespace App\Controller;

use App\Repository\CommandeRepository;
use App\Repository\PromoRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Commande;
use App\Repository\ClientRepository;

final class CommandeController extends AbstractController
{
    /**
     * Retourne la liste des commandes au format JSON.
     * Utilise le Serializer pour gérer les relations et les groupes.
     */
    #[Route('/api/commandes', name: 'app_commande', methods: ['GET'])]
    public function index(CommandeRepository $commandeRepository, SerializerInterface $serializer): Response
    {
        // 1. Récupérer toutes les commandes.
        $commandes = $commandeRepository->findAll();

        // 2. Sérialiser la collection d'entités en JSON.
        // On utilise le groupe 'commande:read' pour inclure uniquement les propriétés annotées.
        $jsonContent = $serializer->serialize($commandes, 'json', ['groups' => 'commande:read']);

        // 3. Renvoyer la réponse JSON.
        return new Response($jsonContent, Response::HTTP_OK, [
            'Content-Type' => 'application/json'
        ]);

        // Alternative recommandée et plus simple dans Symfony :
        /*
        return $this->json(
            $commandes,
            Response::HTTP_OK,
            [],
            ['groups' => 'commande:read']
        );
        */
    }

    #[Route('/api/commandes', name: 'create_commande', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        ClientRepository $clientRepository,
        PromoRepository $promoRepository
    ): Response {
        $data = json_decode($request->getContent(), true);

        $clientId = $data['clientId'] ?? null;
        $items = $data['items'] ?? [];
        $promoCode = $data['promoCode'] ?? null;

        if (!$clientId || empty($items)) {
            return $this->json(['success' => false, 'message' => 'Client ID et items requis'], 400);
        }

        $client = $clientRepository->find($clientId);
        if (!$client) {
            return $this->json(['success' => false, 'message' => 'Client non trouvé'], 404);
        }

        // Calculate total
        $total = 0;
        foreach ($items as $item) {
            $total += $item['price'] * $item['quantity'];
        }

        $montantRemise = 0;
        if ($promoCode) {
            $promo = $promoRepository->findActivePromoByCode($promoCode);
            if ($promo) {
                if ($promo->getType() === 'pourcentage') {
                    $montantRemise = round($total * ($promo->getValeur() / 100));
                } elseif ($promo->getType() === 'montant_fixe') {
                    $montantRemise = $promo->getValeur();
                }
                $total -= $montantRemise;
            } else {
                // Invalid promo code, but still create order without discount
                $promoCode = null;
            }
        }

        $commande = new Commande();
        $commande->setIdClient($client);
        $commande->setCreatedAt(new \DateTimeImmutable());
        $commande->setTotal($total);
        $commande->setStatut('en_attente');
        $commande->setItems($items);
        $commande->setPromoCode($promoCode);
        $commande->setMontantRemise($montantRemise);

        $em->persist($commande);
        $em->flush();

        return $this->json([
            'success' => true,
            'commande' => [
                'id' => $commande->getId(),
                'total' => $commande->getTotal(),
                'promo_code' => $commande->getPromoCode(),
                'montant_remise' => $commande->getMontantRemise()
            ]
        ], 201);
    }
}
