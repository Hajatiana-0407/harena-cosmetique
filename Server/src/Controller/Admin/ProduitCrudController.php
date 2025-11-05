<?php

namespace App\Controller\Admin;

use App\Entity\Produit;
use App\Entity\Categorie;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use Doctrine\ORM\EntityManagerInterface;

class ProduitCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Produit::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('nom', 'Nom du produit'),
            TextEditorField::new('definition', 'Description'),
            TextEditorField::new('utilisation', 'Mode d\'utilisation'),
            TextField::new('compositions', 'Compositions'),
            TextField::new('presentation', 'Présentation'),
            MoneyField::new('prix', 'Prix')
                ->setCurrency('MGA')
                ->setStoredAsCents(false),
            TextField::new('stock', 'Stock'),
            AssociationField::new('id_categorie', 'Catégorie'),
            ImageField::new('image', 'Image principale')
                ->setBasePath('/image')
                ->setUploadDir('public/image')
                ->setUploadedFileNamePattern('[randomhash].[extension]')
                ->setRequired(false),
            ImageField::new('image_mini1', 'Image miniature 1')
                ->setBasePath('/image')
                ->setUploadDir('public/image')
                ->setUploadedFileNamePattern('[randomhash].[extension]')
                ->setRequired(false),
            ImageField::new('image_mini2', 'Image miniature 2')
                ->setBasePath('/image')
                ->setUploadDir('public/image')
                ->setUploadedFileNamePattern('[randomhash].[extension]')
                ->setRequired(false),
            ImageField::new('image_mini3', 'Image miniature 3')
                ->setBasePath('/image')
                ->setUploadDir('public/image')
                ->setUploadedFileNamePattern('[randomhash].[extension]')
                ->setRequired(false),
        ];
    }
    
    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if ($entityInstance instanceof Produit) {
            // Utiliser l'image par défaut si aucune image n'est uploadée
            if (!$entityInstance->getImage()) {
                $entityInstance->setImage('beauty.jpg');
            }
            if (!$entityInstance->getImageMini1()) {
                $entityInstance->setImageMini1('beauty.jpg');
            }
            if (!$entityInstance->getImageMini2()) {
                $entityInstance->setImageMini2('beauty.jpg');
            }
            if (!$entityInstance->getImageMini3()) {
                $entityInstance->setImageMini3('beauty.jpg');
            }
        }
        parent::persistEntity($entityManager, $entityInstance);
    }
    
    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if ($entityInstance instanceof Produit) {
            // Utiliser l'image par défaut si aucune image n'est uploadée
            if (!$entityInstance->getImage()) {
                $entityInstance->setImage('beauty.jpg');
            }
            if (!$entityInstance->getImageMini1()) {
                $entityInstance->setImageMini1('beauty.jpg');
            }
            if (!$entityInstance->getImageMini2()) {
                $entityInstance->setImageMini2('beauty.jpg');
            }
            if (!$entityInstance->getImageMini3()) {
                $entityInstance->setImageMini3('beauty.jpg');
            }
        }
        parent::updateEntity($entityManager, $entityInstance);
    }
}
