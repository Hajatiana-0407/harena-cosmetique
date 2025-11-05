<?php

namespace App\Entity;

use App\Repository\ContactRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ContactRepository::class)]
class Contact
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'contacts')]
    private ?CLient $id_client = null;

    #[ORM\Column(length: 255)]
    private ?string $messages = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $Date_post = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdClient(): ?CLient
    {
        return $this->id_client;
    }

    public function setIdClient(?CLient $id_client): static
    {
        $this->id_client = $id_client;

        return $this;
    }

    public function getMessages(): ?string
    {
        return $this->messages;
    }

    public function setMessages(string $messages): static
    {
        $this->messages = $messages;

        return $this;
    }

    public function getDatePost(): ?\DateTimeImmutable
    {
        return $this->Date_post;
    }

    public function setDatePost(\DateTimeImmutable $Date_post): static
    {
        $this->Date_post = $Date_post;

        return $this;
    }
}
