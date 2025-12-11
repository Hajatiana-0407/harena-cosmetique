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
use App\Entity\Contact;
use App\Entity\Promo;
use App\Entity\Newsletter;
use App\Controller\Admin\NewsletterCrudController;
use Doctrine\ORM\EntityManagerInterface;
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
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    #[Route('/', name: 'app_admin_admin_index')]
    public function index(): Response
    {
        // Statistiques générales
        $commandeRepo = $this->entityManager->getRepository(Commande::class);
        $totalCommandes = $commandeRepo->count([]);

        // Ventes du mois
        $qbVentes = $commandeRepo->createQueryBuilder('c');
        $qbVentes->select('SUM(c.total)')
                 ->where('c.created_At >= :start')
                 ->setParameter('start', new \DateTime('first day of this month'));
        $ventesMois = $qbVentes->getQuery()->getSingleScalarResult() ?? 0;

        // Nouveaux clients (derniers 30 jours)
        $clientRepo = $this->entityManager->getRepository(Client::class);
        $qbClients = $clientRepo->createQueryBuilder('cl');
        $qbClients->select('COUNT(cl.id)')
                  ->where('cl.created_At >= :start')
                  ->setParameter('start', new \DateTime('-30 days'));
        $nouveauxClients = $qbClients->getQuery()->getSingleScalarResult() ?? 0;

        // Stock total des produits
        $produitRepo = $this->entityManager->getRepository(Produit::class);
        $qbStock = $produitRepo->createQueryBuilder('p');
        $qbStock->select('SUM(p.stock)');
        $stockTotal = $qbStock->getQuery()->getSingleScalarResult() ?? 0;

        // Nombre de messages de contact
        $totalMessages = $this->entityManager->getRepository(Contact::class)->count([]);

        // Dernières commandes
        $dernieresCommandes = $commandeRepo->findBy([], ['created_At' => 'DESC'], 5);

        // Derniers avis
        $avisRepo = $this->entityManager->getRepository(Avis::class);
        $derniersAvis = $avisRepo->findBy([], ['date_post' => 'DESC'], 5);

        return $this->render('admin/dashboard.html.twig', [
            'dashboard_controller_filepath' => (new \ReflectionClass(static::class))->getFileName(),
            'stats' => [
                'total_commandes' => $totalCommandes,
                'ventes_mois' => $ventesMois,
                'nouveaux_clients' => $nouveauxClients,
                'stock_total' => $stockTotal,
                'total_messages' => $totalMessages,
                'dernieres_commandes' => $dernieresCommandes,
                'derniers_avis' => $derniersAvis,
            ]
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

            yield  MenuItem::linkToCrud('Liste des produits', 'fas fa-box', Produit::class);
            yield  MenuItem::linkToCrud('Catégories', 'fas fa-tags', Categorie::class);
 

            // Commandes
            yield MenuItem::section('Ventes');
            yield MenuItem::linkToCrud('Toutes les commandes', 'fas fa-shopping-cart', Commande::class);
            // yield MenuItem::linkToCrud('Paniers', 'fas fa-shopping-basket', Panier::class);
            yield MenuItem::linkToCrud('Paiements', 'fas fa-money-bill', Paiement::class);

            // Clients
            yield MenuItem::section('Relations clients');
            yield MenuItem::linkToCrud('Liste des clients', 'fas fa-users', Client::class);
            yield MenuItem::linkToCrud('Messages', 'fas fa-envelope', Message::class);
            yield MenuItem::linkToCrud('Contacts', 'fas fa-address-book', Contact::class);
            yield MenuItem::linkToCrud('Avis clients', 'fas fa-star', Avis::class);
            yield MenuItem::linkToCrud('Témoignages', 'fas fa-comment', Temoignage::class);
            yield MenuItem::linkToCrud('Abonnés Newsletter', 'fas fa-envelope-open', Newsletter::class)->setController(NewsletterCrudController::class);

            // Marketing
            yield MenuItem::section('Marketing');
            yield MenuItem::linkToCrud('Blog', 'fas fa-newspaper', Article::class);
            yield MenuItem::linkToCrud('Codes promo', 'fas fa-percent', Promo::class)->setController(PromoCrudController::class);

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
