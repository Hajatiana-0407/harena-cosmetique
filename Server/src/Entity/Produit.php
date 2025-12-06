<?php

namespace App\Entity;

use App\Repository\ProduitRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProduitRepository::class)]
class Produit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['categorie:read', 'produit:read'])] 
    private ?int $id = null;

    // La relation vers la Catégorie doit aussi être visible pour ce groupe.
    // Nous laissons 'categorie:read' de côté ici car elle n'a pas besoin de ce groupe
    // pour fonctionner, mais nous nous assurons que 'produit:read' est là.
    #[Groups(['produit:read'])] 
    #[ORM\ManyToOne(inversedBy: 'produits_categorie')]
    private ?Categorie $id_categorie = null; 

    #[ORM\Column(length: 255)]
    #[Groups(['categorie:read', 'produit:read'])] 
    private ?string $nom = null;

    #[ORM\Column(length: 500)]
    #[Groups(['categorie:read', 'produit:read'])] 
    private ?string $definition = null;

    #[ORM\Column(length: 500)]
    #[Groups(['categorie:read', 'produit:read'])] 
    private ?string $utilisation = null;

    #[ORM\Column]
    #[Groups(['categorie:read', 'produit:read'])] 
    private ?float $prix = null;

    #[ORM\Column(type: 'integer')]
    #[Groups(['categorie:read', 'produit:read'])] 
    private ?int $stock = null;

    #[ORM\Column(length: 255)]
    #[Groups(['categorie:read', 'produit:read'])] 
    private ?string $image = null;

    /**
     * @var Collection<int, Avis>
     */
    // Si vous voulez inclure les avis, ajoutez aussi #[Groups(['produit:read'])] et configurez Avis.php
    #[ORM\ManyToMany(targetEntity: Avis::class, mappedBy: 'produit')]
    private Collection $avis;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['produit:read'])]
    private ?string $image_mini1 = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['produit:read'])]
    private ?string $image_mini2 = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['produit:read'])]
    private ?string $image_mini3 = null;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    #[Groups(['produit:read'])]
    private $nombreAvisParProduit = 0;

    #[ORM\Column(type: 'json', nullable: true)]
    #[Groups(['produit:read'])]
    private array $compositions = [];

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(['produit:read'])]
    private ?string $presentation = null;

    public function __construct()
    {
        $this->avis = new ArrayCollection();
    }
    
    public function __toString(): string
    {
        return $this->nom ?? 'Produit sans nom';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdCategorie(): ?Categorie
    {
        return $this->id_categorie;
    }

    public function setIdCategorie(?Categorie $id_categorie): static
    {
        $this->id_categorie = $id_categorie;
        return $this;
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

    public function getDefinition(): ?string
    {
        return $this->definition;
    }

    public function setDefinition(string $definition): static
    {
        $this->definition = $definition;
        return $this;
    }

    public function getUtilisation(): ?string
    {
        return $this->utilisation;
    }

    public function setUtilisation(string $utilisation): static
    {
        $this->utilisation = $utilisation;
        return $this;
    }

    public function getPrix(): ?float
    {
        return $this->prix;
    }

    public function setPrix(float $prix): static
    {
        $this->prix = $prix;
        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): static
    {
        $this->stock = $stock;
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

    /**
     * @return Collection<int, Avis>
     */
    public function getAvis(): Collection
    {
        return $this->avis;
    }

    public function addAvis(Avis $avi): static
    {
        if (!$this->avis->contains($avi)) {
            $this->avis->add($avi);
            // Si la méthode addProduit existe dans Avis.php
            // $avi->addProduit($this); 
        }

        return $this;
    }

    public function removeAvis(Avis $avi): static
    {
        if ($this->avis->removeElement($avi)) {
            // Si la méthode removeProduit existe dans Avis.php
            // $avi->removeProduit($this); 
        }

        return $this;
    }

    public function getImageMini1(): ?string
    {
        return $this->image_mini1;
    }

    public function setImageMini1(?string $image_mini1): static
    {
        $this->image_mini1 = $image_mini1;

        return $this;
    }

    public function getImageMini2(): ?string
    {
        return $this->image_mini2;
    }

    public function setImageMini2(?string $image_mini2): static
    {
        $this->image_mini2 = $image_mini2;

        return $this;
    }

    public function getImageMini3(): ?string
    {
        return $this->image_mini3;
    }

    public function setImageMini3(?string $image_mini3): static
    {
        $this->image_mini3 = $image_mini3;

        return $this;
    }

    public function getNombreAvisParProduit(): ?int
    {
        return $this->nombreAvisParProduit;
    }

    public function setNombreAvisParProduit(int $nombreAvisParProduit): self
    {
        $this->nombreAvisParProduit = $nombreAvisParProduit;
        return $this;
    }

    public function getCompositions(): array
    {
        return $this->compositions;
    }

    public function setCompositions(?array $compositions): static
    {
        $this->compositions = $compositions ?? [];

        return $this;
    }

    public function getPresentation(): ?string
    {
        return $this->presentation;
    }

    public function setPresentation(?string $presentation): static
    {
        $this->presentation = $presentation;

        return $this;
    }

}
