<?php

namespace App\Controller\Admin;

use App\Entity\Messenger;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use Doctrine\ORM\EntityManagerInterface;

class MessengerCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Messenger::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            AssociationField::new('client', 'Client'),
            TextField::new('objet', 'Objet'),
            TextField::new('destinateur', 'Destinateur'),
            DateTimeField::new('Created_At', 'Date de création')
                ->hideOnForm()
                ->setFormat('dd/MM/yyyy HH:mm'),
        ];
    }

    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if ($entityInstance instanceof Messenger) {
            if (!$entityInstance->getCreatedAt()) {
                $entityInstance->setCreatedAt(new \DateTimeImmutable());
            }
            if (!$entityInstance->getDestinateur()) {
                $entityInstance->setDestinateur('Admin');
            }
        }
        parent::persistEntity($entityManager, $entityInstance);
    }
}
