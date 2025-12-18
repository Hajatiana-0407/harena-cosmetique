<?php

namespace App\Controller\Admin;

use App\Entity\Commande;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;


class CommandeCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Commande::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            AssociationField::new('id_client', 'Client'),
            MoneyField::new('total', 'Total')
                ->setCurrency('MGA')
                ->setStoredAsCents(false),
            ChoiceField::new('statut', 'Statut')
                ->setChoices([
                    'En attente' => 'En attente',
                    'Payée' => 'Payée',
                    'Expédiée' => 'Expédiée',
                    'Livrée' => 'Livrée',
                    'Annulée' => 'Annulée',
                ]),
            ArrayField::new('items', 'Articles')
                ->hideOnIndex(),
            DateTimeField::new('created_At', 'Date de commande')
                ->hideOnForm()
                ->setFormat('dd/MM/yyyy HH:mm'),
        ];
    }

    public function configureActions(Actions $actions): Actions
    {
        $printAction = Action::new('print', 'Imprimer Produits')
            ->linkToRoute('admin_commande_print', function (Commande $commande): array {
                return ['id' => $commande->getId()];
            })
            ->setIcon('fa fa-print')
            ->setCssClass('btn btn-secondary');

        return $actions
            ->add(Crud::PAGE_DETAIL, $printAction);
    }

    #[Route('/admin/commande/{id}/print', name: 'admin_commande_print')]
    public function print(int $id, EntityManagerInterface $entityManager): Response
    {
        $commande = $entityManager->getRepository(Commande::class)->find($id);

        if (!$commande) {
            throw $this->createNotFoundException('Commande non trouvée');
        }

        return $this->render('admin/commande/print.html.twig', [
            'commande' => $commande,
        ]);
    }
}
