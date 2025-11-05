<?php

namespace App\Entity;

use App\Repository\ArticleRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups; // 👈 NOUVEAU

#[ORM\Entity(repositoryClass: ArticleRepository::class)]
class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['article:read'])] 
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['article:read'])] 
    private ?string $titre = null;

    #[ORM\Column(length: 500)]
    #[Groups(['article:read'])] 
    private ?string $contenu = null;

    #[ORM\Column]
    #[Groups(['article:read'])] 
    private ?\DateTimeImmutable $created_At = null;

    #[ORM\Column(length: 255)]
    #[Groups(['article:read'])] 
    private ?string $image = null;

    #[ORM\Column(length: 255)]
    #[Groups(['article:read'])] 
    private ?string $auteur = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getAuteur(): ?string
    {
        return $this->auteur;
    }

    public function setAuteur(string $auteur): static
    {
        $this->auteur = $auteur;

        return $this;
    }
}
