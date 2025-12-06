<?php

namespace App\Entity;

use App\Repository\TemoignageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TemoignageRepository::class)]
class Temoignage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['temoignage:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Client::class, inversedBy: 'temoignages')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Client $id_client = null;

    #[ORM\Column(length: 255)]
    #[Groups(['temoignage:read'])]
    private ?string $contenu = null;

    #[ORM\Column]
    #[Groups(['temoignage:read'])]
    private ?\DateTimeImmutable $created_At = null;

    #[ORM\Column(length: 255)]
    #[Groups(['temoignage:read'])]
    private ?string $image = null;

    #[ORM\Column(length: 255)]
    #[Groups(['temoignage:read'])]
    private ?string $titre = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['temoignage:read'])]
    private ?string $auteur = null;

    public function __construct()
    {
    }

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

    public function getContenu(): ?string
    {
        return $this->contenu;
    }

    public function setContenu(string $contenu): static
    {
        $this->contenu = $contenu;

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

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;

        return $this;
    }

    public function getAuteur(): ?string
    {
        return $this->auteur;
    }

    public function setAuteur(?string $auteur): static
    {
        $this->auteur = $auteur;

        return $this;
    }
}
