<?php

namespace App\Controller;

use App\Repository\CategorieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class CategorieController extends AbstractController
{
    #[Route('/categorie', name: 'app_categorie')]
    public function index(CategorieRepository $categorieRepository): Response
    {
        // Récupère toutes les catégories (qui chargeront leurs produits via le sérialiseur)
        $categories = $categorieRepository->findAll();

        // Retourne le JSON en utilisant le groupe 'categorie:read'
        return $this->json($categories, 200, [], ['groups' => 'categorie:read']);
    }
}