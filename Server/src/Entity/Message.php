<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['message:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'messages')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['message:read'])]
    private ?Client $client = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['message:read'])]
    private ?string $contenu = null;

    #[ORM\Column(length: 50)]
    #[Groups(['message:read'])]
    private ?string $expediteur = null;

    #[ORM\Column]
    #[Groups(['message:read'])]
    private ?\DateTimeImmutable $created_At = null;

    #[ORM\Column]
    #[Groups(['message:read'])]
    private ?bool $lu = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): static
    {
        $this->client = $client;

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

    public function getExpediteur(): ?string
    {
        return $this->expediteur;
    }

    public function setExpediteur(string $expediteur): static
    {
        $this->expediteur = $expediteur;

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

    public function getLu(): ?bool
    {
        return $this->lu;
    }

    public function setLu(bool $lu): static
    {
        $this->lu = $lu;

        return $this;
    }
}
