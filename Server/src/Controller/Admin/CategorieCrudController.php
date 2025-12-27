<?php

namespace App\Controller\Admin;

use App\Entity\Categorie;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;

class CategorieCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Categorie::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('nom', 'Nom de la catégorie'),
            TextField::new('type', 'Type'),
            TextEditorField::new('description', 'Description'),
            // Image field: configure uploadDir and basePath in your EasyAdmin file system config
            ImageField::new('image', 'Image')->setBasePath('/image')->setUploadDir('public/image')->setRequired(false),
            DateTimeField::new('created_At')->hideOnForm(),
        ];
    }


}
