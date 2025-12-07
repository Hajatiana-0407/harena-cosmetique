<?php

namespace App\Controller;

use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ArticleController extends AbstractController
{
    #[Route('/api/article', name: 'app_article')]
    public function index(ArticleRepository $articleRepository): Response
    {
        $articles = $articleRepository->findAll();

        // Le sérialiseur utilise le groupe 'article:read' pour inclure
        // uniquement les propriétés qui portent cet attribut dans l'entité.
        return $this->json($articles, 200, [], ['groups' => 'article:read']);
    }

    #[Route('/api/articles', name: 'app_articles')]
    public function list(Request $request, ArticleRepository $articleRepository): Response
    {
        $q = $request->query->get('q');
        $auteur = $request->query->get('auteur');
        $titre = $request->query->get('titre');
        $date_from = $request->query->get('date_from');
        $date_to = $request->query->get('date_to');
        $stars = $request->query->get('stars');

        $qb = $articleRepository->createQueryBuilder('a');

        if ($q) {
            $qb->andWhere('a.titre LIKE :q OR a.contenu LIKE :q')
               ->setParameter('q', '%' . $q . '%');
        }

        if ($auteur) {
            $qb->andWhere('a.auteur = :auteur')
               ->setParameter('auteur', $auteur);
        }

        if ($titre) {
            $qb->andWhere('a.titre LIKE :titre')
               ->setParameter('titre', '%' . $titre . '%');
        }

        if ($date_from) {
            $qb->andWhere('a.created_At >= :date_from')
               ->setParameter('date_from', new \DateTime($date_from));
        }

        if ($date_to) {
            $qb->andWhere('a.created_At <= :date_to')
               ->setParameter('date_to', new \DateTime($date_to));
        }

        // Assuming stars is a dummy filter for now, since not in entity
        // For real implementation, add a rating field to Article entity
        if ($stars) {
            // Placeholder: filter by some criteria, e.g., if stars >= 4, but since no field, skip or add logic
            // For now, do nothing or add a note
        }

        $articles = $qb->getQuery()->getResult();

        return $this->json($articles, 200, [], ['groups' => 'article:read']);
    }
}
