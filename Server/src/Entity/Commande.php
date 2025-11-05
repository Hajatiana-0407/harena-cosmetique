<?php

namespace App\Entity;

use App\Repository\CommandeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups; // 💡 Import nécessaire pour les groupes

#[ORM\Entity(repositoryClass: CommandeRepository::class)]
class Commande
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('commande:read')] // Propriété visible
    private ?int $id = null;

    // Utilisation du groupe 'commande:read' ici.
    // Les propriétés spécifiques du client seront incluses via le groupe 'client:nested' défini dans Client.php
    #[ORM\ManyToOne(inversedBy: 'commandes')]
    #[Groups('commande:read')] // Propriété visible
    private ?Client $id_client = null;

    #[ORM\Column]
    #[Groups('commande:read')] // Propriété visible
    private ?\DateTimeImmutable $created_At = null;

    #[ORM\Column]
    #[Groups('commande:read')] // Propriété visible
    private ?float $total = null;

    #[ORM\Column(length: 255)]
    #[Groups('commande:read')] // Propriété visible
    private ?string $statut = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdClient(): ?Client
    {
        return $this->id_client;
    }

    public function setIdClient(?Client $id_client): static
    {
        $this->id_client = $id_client;

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

    public function getTotal(): ?float
    {
        return $this->total;
    }

    public function setTotal(float $total): static
    {
        $this->total = $total;

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): static
    {
        $this->statut = $statut;

        return $this;
    }
}
