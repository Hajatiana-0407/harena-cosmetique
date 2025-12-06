<?php

namespace App\Controller\Admin;

use App\Entity\Commande;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;

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
}
