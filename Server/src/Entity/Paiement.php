<?php

namespace App\Entity;

use App\Repository\PaiementRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PaiementRepository::class)]
class Paiement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['paiement:read'])]
    private ?int $id = null;

    // La relation est de type OneToOne (un paiement pour une commande, une commande pour un paiement).
    // On laisse cette propriété SANS annotation Groups pour éviter la boucle.
    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Commande $id_commande = null;

    #[ORM\Column(length: 255)]
    #[Groups(['paiement:read'])]
    private ?string $methode = null;

    #[ORM\Column(name: 'cerated_at')]
    #[Groups(['paiement:read'])]
    private ?\DateTimeImmutable $created_At = null;

    #[ORM\Column(length: 255)]
    #[Groups(['paiement:read'])]
    private ?string $montant = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Méthode clé pour éviter la référence circulaire.
     * Elle expose l'ID de la commande au lieu de l'objet Commande entier.
     */
    #[Groups(['paiement:read'])]
    public function getCommandeId(): ?int
    {
        // Retourne l'ID de l'objet Commande lié, ou null si non défini.
        return $this->id_commande?->getId();
    }
    
    // Le getter de l'objet complet doit rester pour Doctrine, 
    // mais il n'est pas sérialisé car il n'a pas l'annotation Groups.
    public function getIdCommande(): ?Commande
    {
        return $this->id_commande;
    }

    public function setIdCommande(Commande $id_commande): static
    {
        $this->id_commande = $id_commande;

        return $this;
    }

    public function getMethode(): ?string
    {
        return $this->methode;
    }

    public function setMethode(string $methode): static
    {
        $this->methode = $methode;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_At;
    }

    public function setCreatedAt(\DateTimeImmutable $created_At): static
    {
        $this->created_At = $created_At;

        return $this;
    }

    public function getMontant(): ?string
    {
        return $this->montant;
    }

    public function setMontant(string $montant): static
    {
        $this->montant = $montant;

        return $this;
    }
}