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

    /**
     * @var Collection<int, Client>
     */
    #[ORM\ManyToMany(targetEntity: Client::class, inversedBy: 'temoignages')]
    private Collection $id_client;

    #[ORM\Column(length: 255)]
    #[Groups(['temoignage:read'])]
    private ?string $contenu = null;

    #[ORM\Column]
    #[Groups(['temoignage:read'])]
    private ?\DateTimeImmutable $created_At = null;

    #[ORM\Column(length: 255)]
    #[Groups(['temoignage:read'])]
    private ?string $image = null;

    public function __construct()
    {
        $this->id_client = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Client>
     */
    public function getIdClient(): Collection
    {
        return $this->id_client;
    }

    public function addIdClient(Client $idClient): static
    {
        if (!$this->id_client->contains($idClient)) {
            $this->id_client->add($idClient);
        }

        return $this;
    }

    public function removeIdClient(Client $idClient): static
    {
        $this->id_client->removeElement($idClient);

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
}
