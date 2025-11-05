<?php

namespace App\Entity;

use App\Repository\CategorieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\Produit;

#[ORM\Entity(repositoryClass: CategorieRepository::class)]
class Categorie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['categorie:read', 'produit:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['categorie:read', 'produit:read'])] 
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    #[Groups(['categorie:read'])]
    private ?string $type = null;

    #[ORM\Column(length: 255)]
    #[Groups(['categorie:read'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['categorie:read'])]
    private ?\DateTimeImmutable $created_At = null;

    /**
     * @var Collection<int, Produit>
     */
    // C'est la seule relation que nous gardons (cohérente avec Produit::id_categorie)
    #[Groups(['categorie:read'])]
    #[ORM\OneToMany(targetEntity: Produit::class, mappedBy: 'id_categorie')]
    private Collection $produits_categorie;

    public function __construct()
    {
        $this->produits_categorie = new ArrayCollection();
    }
    
    public function __toString(): string
    {
        return $this->nom ?? 'Catégorie sans nom';
    }
    
    // --- Getters et Setters pour les propriétés simples ---

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }
    public function setNom(string $nom): static
    {
        $this->nom = $nom;
        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }
    public function setType(string $type): static
    {
        $this->type = $type;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }
    public function setDescription(string $description): static
    {
        $this->description = $description;
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

    // --- Gestion de la relation produits_categorie ---

    /**
     * @return Collection<int, Produit>
     */
    public function getProduitsCategorie(): Collection
    {
        return $this->produits_categorie;
    }

    public function addProduitsCategorie(Produit $produitsCategorie): static
    {
        if (!$this->produits_categorie->contains($produitsCategorie)) {
            $this->produits_categorie->add($produitsCategorie);
            $produitsCategorie->setIdCategorie($this);
        }

        return $this;
    }

    public function removeProduitsCategorie(Produit $produitsCategorie): static
    {
        if ($this->produits_categorie->removeElement($produitsCategorie)) {
            if ($produitsCategorie->getIdCategorie() === $this) {
                $produitsCategorie->setIdCategorie(null);
            }
        }

        return $this;
    }
}
