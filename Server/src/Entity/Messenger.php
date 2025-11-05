<?php

namespace App\Entity;

use App\Repository\MessengerRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MessengerRepository::class)]
class Messenger
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'messengers')]
    private ?Client $client = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $Conversation = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $Created_At = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $objet = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $destinateur = null;

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

    public function getConversation(): ?string
    {
        return $this->Conversation;
    }

    public function setConversation(?string $Conversation): static
    {
        $this->Conversation = $Conversation;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->Created_At;
    }

    public function setCreatedAt(\DateTimeImmutable $Created_At): static
    {
        $this->Created_At = $Created_At;

        return $this;
    }

    public function getObjet(): ?string
    {
        return $this->objet;
    }

    public function setObjet(?string $objet): static
    {
        $this->objet = $objet;

        return $this;
    }

    public function getDestinateur(): ?string
    {
        return $this->destinateur;
    }

    public function setDestinateur(?string $destinateur): static
    {
        $this->destinateur = $destinateur;

        return $this;
    }
}
