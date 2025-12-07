<?php

namespace App\Controller;

use App\Repository\TemoignageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
// use Symfony\Component\Serializer\SerializerInterface; // ❌ PLUS NÉCESSAIRE

final class TemoignageController extends AbstractController
{
    #[Route('/api/temoignage', name: 'app_temoignages', methods: ['GET'])]
    // 💡 La dépendance SerializerInterface n'est plus requise
    public function index(TemoignageRepository $temoignageRepository): Response 
    {
        // 1. Récupérer toutes les entités de Témoignage.
        $temoins = $temoignageRepository->findAll();

        // 2. Renvoyer la réponse JSON en utilisant la méthode simplifiée $this->json()
        // C'est l'équivalent de votre ancien code, mais sans la création manuelle de Response/Headers.
        return $this->json(
            $temoins, 
            Response::HTTP_OK, 
            [], 
            ['groups' => 'temoignage:read']
        );
    }
}