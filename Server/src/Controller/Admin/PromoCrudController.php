<?php

namespace App\Controller\Admin;

use App\Entity\Promo;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;

class PromoCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Promo::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('code', 'Code Promo'),
            TextareaField::new('description', 'Description'),
            ChoiceField::new('type', 'Type de remise')
                ->setChoices([
                    'pourcentage' => 'Pourcentage',
                    'montant_fixe' => 'Montant fixe'
                ]),
            NumberField::new('valeur', 'Valeur'),
            BooleanField::new('actif', 'Actif'),
            DateTimeField::new('date_expiration', 'Date d\'expiration')->setRequired(false),
            DateTimeField::new('date_creation', 'Date de création')->hideOnForm(),
        ];
    }
}
