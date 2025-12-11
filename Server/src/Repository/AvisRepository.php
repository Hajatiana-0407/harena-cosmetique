<?php

namespace App\Repository;

use App\Entity\Avis;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Avis>
 */
class AvisRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Avis::class);
    }

    /**
     * @return Avis[] Returns an array of Avis objects for a specific product
     */
    public function findByProduitId(int $produitId): array
    {
        return $this->createQueryBuilder('a')
            ->join('a.produit', 'p')
            ->where('p.id = :produitId')
            ->setParameter('produitId', $produitId)
            ->orderBy('a.date_post', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
