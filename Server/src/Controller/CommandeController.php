<?php

namespace App\Controller;

use App\Repository\CommandeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class CommandeController extends AbstractController
{
    /**
     * Retourne la liste des commandes au format JSON.
     * Utilise le Serializer pour gérer les relations et les groupes.
     */
    #[Route('/commandes', name: 'app_commande', methods: ['GET'])]
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
}
