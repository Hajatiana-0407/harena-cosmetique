<?php

namespace App\Controller\Admin;

use App\Entity\Produit;
use App\Entity\Categorie;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use Doctrine\ORM\EntityManagerInterface;

use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;

class ProduitCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Produit::class;
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
            ->update(Crud::PAGE_INDEX, Action::NEW, function (Action $action) {
                return $action->setLabel('Ajouter un produit');
            });
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('nom', 'Nom du produit'),
            TextEditorField::new('definition', 'Description')->hideOnIndex(),
            TextEditorField::new('utilisation', 'Mode d\'utilisation')->hideOnIndex(),
            ArrayField::new('compositions', 'Compositions')->hideOnIndex(),
            TextEditorField::new('presentation', 'Présentation')->hideOnIndex(),
            MoneyField::new('prix', 'Prix')
                ->setCurrency('MGA')
                ->setStoredAsCents(false),
            IntegerField::new('stock', 'Stock'),
            AssociationField::new('id_categorie', 'Catégorie'),
            AssociationField::new('avis', 'Avis')
                ->hideOnForm()
                ->hideOnIndex(),
            ImageField::new('image', 'Image principale')
                ->setBasePath('/image')
                ->setUploadDir('public/image')
                ->setUploadedFileNamePattern('[randomhash].[extension]')
                ->setRequired(false),
            ImageField::new('image_mini1', 'Image miniature 1')
                ->setBasePath('/image')
                ->setUploadDir('public/image')
                ->setUploadedFileNamePattern('[randomhash].[extension]')
                ->setRequired(false)
                ->hideOnIndex(),
            ImageField::new('image_mini2', 'Image miniature 2')
                ->setBasePath('/image')
                ->setUploadDir('public/image')
                ->setUploadedFileNamePattern('[randomhash].[extension]')
                ->setRequired(false)
                ->hideOnIndex(),
            ImageField::new('image_mini3', 'Image miniature 3')
                ->setBasePath('/image')
                ->setUploadDir('public/image')
                ->setUploadedFileNamePattern('[randomhash].[extension]')
                ->setRequired(false)
                ->hideOnIndex(),
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
