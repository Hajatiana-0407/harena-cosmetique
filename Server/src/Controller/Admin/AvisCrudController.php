<?php

namespace App\Controller\Admin;

use App\Entity\Avis;
use App\Entity\Client;
use App\Entity\Produit;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use Doctrine\ORM\EntityManagerInterface;

class AvisCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Avis::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('titre', 'Titre de l\'avis'),
            TextEditorField::new('contenu', 'Contenu de l\'avis'),
            NumberField::new('etoiles', 'Note (étoiles)')
                ->setNumDecimals(1)
                ->setHelp('Note de 1 à 5 étoiles'),
            AssociationField::new('produit', 'Produits concernés')
                ->setFormTypeOption('multiple', true)
                ->setHelp('Sélectionnez les produits concernés par cet avis'),
            AssociationField::new('id_client', 'Client')
                ->setRequired(false)
                ->setHelp('Sélectionnez un client pour cet avis'),
            DateTimeField::new('date_post', 'Date de publication')
                ->hideOnForm()
                ->setFormat('dd/MM/yyyy HH:mm'),
        ];
    }
    
    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if ($entityInstance instanceof Avis) {
            // Définir la date de publication si elle n'existe pas
            if (!$entityInstance->getDatePost()) {
                $entityInstance->setDatePost(new \DateTimeImmutable());
            }
        }
        parent::persistEntity($entityManager, $entityInstance);
    }
    
    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        parent::updateEntity($entityManager, $entityInstance);
    }
}
