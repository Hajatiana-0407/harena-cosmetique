<?php

namespace App\Entity;

use App\Repository\AvisRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AvisRepository::class)]
class Avis
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['avis:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'Contenu')]
    #[Groups(['avis:read'])]
    private ?Client $id_client = null;

    #[ORM\Column]
    #[Groups(['avis:read'])]
    private ?\DateTimeImmutable $date_post = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['avis:read'])]
    private ?float $etoiles = null;

    /**
     * @var Collection<int, Produit>
     */
    #[ORM\ManyToMany(targetEntity: Produit::class, inversedBy: 'avis')]
    #[ORM\JoinTable(name: 'produit_avis')]
    private Collection $produit;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['avis:read'])]
    private ?string $titre = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['avis:read'])]
    private ?string $contenu = null;

    public function __construct()
    {
        $this->produit = new ArrayCollection();
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

    public function getDatePost(): ?\DateTimeImmutable
    {
        return $this->date_post;
    }

    public function setDatePost(\DateTimeImmutable $date_post): static
    {
        $this->date_post = $date_post;

        return $this;
    }

    public function getEtoiles(): ?float
    {
        return $this->etoiles;
    }

    public function setEtoiles(?float $etoiles): static
    {
        $this->etoiles = $etoiles;

        return $this;
    }

    /**
     * @return Collection<int, Produit>
     */
    public function getProduit(): Collection
    {
        return $this->produit;
    }

    public function addProduit(Produit $produit): static
    {
        if (!$this->produit->contains($produit)) {
            $this->produit->add($produit);
        }

        return $this;
    }

    public function removeProduit(Produit $produit): static
    {
        $this->produit->removeElement($produit);

        return $this;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(?string $titre): static
    {
        $this->titre = $titre;

        return $this;
    }

    public function getContenu(): ?string
    {
        return $this->contenu;
    }

    public function setContenu(?string $contenu): static
    {
        $this->contenu = $contenu;

        return $this;
    }
}
