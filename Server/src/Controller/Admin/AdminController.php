<?php

namespace App\Controller\Admin;

use App\Entity\Article;
use App\Entity\Avis;
use App\Entity\Categorie;
use App\Entity\Client;
use App\Entity\Commande;
use App\Entity\Paiement;
use App\Entity\Produit;
use App\Entity\Temoignage;
use App\Entity\User;
use App\Entity\Message;
use App\Entity\Panier;
use EasyCorp\Bundle\EasyAdminBundle\Config\Assets;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/admin')]
#[IsGranted('ROLE_ADMIN')]
class AdminController extends AbstractDashboardController
{
    #[Route('/', name: 'app_admin_admin_index')]
    public function index(): Response
    {
        return $this->render('admin/dashboard.html.twig', [
            'dashboard_controller_filepath' => (new \ReflectionClass(static::class))->getFileName(),
        ]);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Harena Cosmetic')
            ->setFaviconPath('image/MonLogo.png')
            ->renderContentMaximized()
            ->setLocales(['fr']);
    }

    public function configureAssets(): Assets
    {
        return Assets::new()
            ->addWebpackEncoreEntry('admin');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::section('Dashboard');
        yield MenuItem::linkToDashboard('Vue générale', 'fa fa-home');

        if ($this->isGranted('ROLE_ADMIN')) {
            // Catalogue
            yield MenuItem::section('Catalogue');
            yield MenuItem::subMenu('Produits', 'fas fa-box')->setSubItems([
                MenuItem::linkToCrud('Liste des produits', 'fas fa-list', Produit::class),
                MenuItem::linkToCrud('Catégories', 'fas fa-tags', Categorie::class),
            ]);

            // Commandes
            yield MenuItem::section('Ventes');
            yield MenuItem::subMenu('Commandes', 'fas fa-shopping-cart')->setSubItems([
                MenuItem::linkToCrud('Toutes les commandes', 'fas fa-list', Commande::class),
                MenuItem::linkToCrud('Paniers', 'fas fa-shopping-basket', Panier::class),
                MenuItem::linkToCrud('Paiements', 'fas fa-money-bill', Paiement::class),
            ]);

            // Clients
            yield MenuItem::section('Relations clients');
            yield MenuItem::subMenu('Clients', 'fas fa-users')->setSubItems([
                MenuItem::linkToCrud('Liste des clients', 'fas fa-list', Client::class),
                MenuItem::linkToCrud('Messages', 'fas fa-envelope', Message::class),
                MenuItem::linkToCrud('Avis clients', 'fas fa-star', Avis::class),
                MenuItem::linkToCrud('Témoignages', 'fas fa-comment', Temoignage::class),
            ]);

            // Marketing
            yield MenuItem::section('Marketing');
            yield MenuItem::linkToCrud('Blog', 'fas fa-newspaper', Article::class);

            // Administration
            yield MenuItem::section('Administration');
            yield MenuItem::linkToCrud('Utilisateurs', 'fas fa-user-shield', User::class);
        }
        
        // Liens utiles
        yield MenuItem::section('Liens utiles');
        yield MenuItem::linkToUrl('Voir le site', 'fas fa-eye', 'http://localhost:5173')
            ->setLinkTarget('_blank');
    }
}