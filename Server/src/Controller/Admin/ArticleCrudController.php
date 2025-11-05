<?php

namespace App\Controller\Admin;

use App\Entity\Article;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use Doctrine\ORM\EntityManagerInterface;

class ArticleCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Article::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('titre', 'Titre'),
            TextEditorField::new('contenu', 'Contenu'),
            TextField::new('auteur', 'Auteur')
                ->setRequired(false)
                ->setHelp('Laissez vide pour utiliser "Anonyme"'),
            ImageField::new('image', 'Image')
                ->setBasePath('/image')
                ->setUploadDir('public/image')
                ->setUploadedFileNamePattern('[randomhash].[extension]')
                ->setRequired(false)
                ->setHelp('Laissez vide pour utiliser l\'image par défaut'),
            DateTimeField::new('created_At', 'Date de création')
                ->hideOnForm()
                ->setFormat('dd/MM/yyyy HH:mm'),
        ];
    }
    
    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if ($entityInstance instanceof Article) {
            // Si aucun auteur n'est défini, utiliser 'Anonyme'
            if (!$entityInstance->getAuteur() || trim($entityInstance->getAuteur()) === '') {
                $entityInstance->setAuteur('Anonyme');
            }
            // Si aucune image n'est uploadée, utiliser l'image par défaut
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
        if ($entityInstance instanceof Article) {
            // Si aucun auteur n'est défini, utiliser 'Anonyme'
            if (!$entityInstance->getAuteur() || trim($entityInstance->getAuteur()) === '') {
                $entityInstance->setAuteur('Anonyme');
            }
            // Conserver l'image par défaut si aucune nouvelle image n'est uploadée
            if (!$entityInstance->getImage()) {
                $entityInstance->setImage('beauty.jpg');
            }
        }
        parent::updateEntity($entityManager, $entityInstance);
    }
}
