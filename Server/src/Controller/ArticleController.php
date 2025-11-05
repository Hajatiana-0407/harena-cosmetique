<?php

namespace App\Controller;

use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ArticleController extends AbstractController
{
    #[Route('/article', name: 'app_article')]
    public function index(ArticleRepository $articleRepository): Response
    {
        $articles = $articleRepository->findAll();

        // Le sérialiseur utilise le groupe 'article:read' pour inclure
        // uniquement les propriétés qui portent cet attribut dans l'entité.
        return $this->json($articles, 200, [], ['groups' => 'article:read']);
    }
}