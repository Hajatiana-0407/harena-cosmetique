<?php

namespace App\Controller\Admin;

use App\Entity\Temoignage;
use App\Entity\Client;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Context\AdminContext;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;

class TemoignageCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Temoignage::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('titre', 'Titre'),
            TextField::new('auteur', 'Auteur'),
            TextEditorField::new('contenu', 'Contenu du témoignage'),
            AssociationField::new('id_client', 'Client')
                ->setRequired(false)
                ->setHelp('Sélectionnez un client pour ce témoignage'),
            ImageField::new('image', 'Image')
                ->setBasePath('/image')
                ->setUploadDir('public/image')
                ->setUploadedFileNamePattern('[randomhash].[extension]')
                ->setRequired(false),
            DateTimeField::new('created_At', 'Date de création')
                ->hideOnForm()
                ->setFormat('dd/MM/yyyy HH:mm'),
        ];
    }
    
    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if ($entityInstance instanceof Temoignage) {
            // Utiliser l'image par défaut si aucune image n'est uploadée
            if (!$entityInstance->getImage()) {
                $entityInstance->setImage('beauty.jpg');
            }
            
            // Définir la date de création si elle n'existe pas
            if (!$entityInstance->getCreatedAt()) {
                $entityInstance->setCreatedAt(new \DateTimeImmutable());
            }
        }
        parent::persistEntity($entityManager, $entityInstance);
    }
    
    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if ($entityInstance instanceof Temoignage) {
            // Conserver l'image par défaut si aucune nouvelle image n'est uploadée
            if (!$entityInstance->getImage()) {
                $entityInstance->setImage('beauty.jpg');
            }
        }
        parent::updateEntity($entityManager, $entityInstance);
    }
}
