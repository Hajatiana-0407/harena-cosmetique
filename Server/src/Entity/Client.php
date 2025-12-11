<?php

namespace App\Entity;

use App\Repository\ClientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ClientRepository::class)]
class Client implements PasswordAuthenticatedUserInterface
{
    public function getUsername(): string
    {
        return $this->email;
    }
    
    public function getUserIdentifier(): string
    {
        return $this->email;
    }
    // Ajout de 'client:read' pour l'API des clients
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['commande:read', 'client:read', 'temoignage:read', 'avis:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['commande:read', 'client:read'])] // 👈 'client:read' ajouté
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    #[Groups(['commande:read', 'client:read'])] // 👈 'client:read' ajouté
    private ?string $prenom = null;

    // Ces propriétés sont exposées uniquement lors de l'appel direct de l'API /clients
    #[ORM\Column(length: 255)]
    #[Groups('client:read')] // 👈 AJOUTÉ
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    // Le password ne doit jamais être sérialisé dans une API publique
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups('client:read')] // 👈 AJOUTÉ
    private ?string $adresse = null;

    #[ORM\Column(length: 255)]
    #[Groups('client:read')]
    private ?string $telephone = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups('client:read')]
    private ?string $photo = null;

    #[ORM\Column(type: "datetime_immutable", nullable: true)]
    #[Groups('client:read')]
    private ?\DateTimeImmutable $created_At = null;

    /**
     * @var Collection<int, Commande>
     */
    #[ORM\OneToMany(targetEntity: Commande::class, mappedBy: 'id_client')]
    #[Groups('client:read')] // 👈 Les commandes du client seront listées ici (leurs propriétés doivent avoir le groupe 'client:read' ou un groupe de relation dédié dans Commande.php)
    private Collection $commandes;

    /**
     * @var Collection<int, Temoignage>
     */
    #[ORM\OneToMany(targetEntity: Temoignage::class, mappedBy: 'id_client')]
    #[Groups('client:read')] // 👈 AJOUTÉ
    private Collection $temoignages;

    /**
     * @var Collection<int, Avis>
     */
    #[ORM\OneToMany(targetEntity: Avis::class, mappedBy: 'id_client')]
    #[Groups('client:read')] // 👈 AJOUTÉ
    private Collection $Contenu;

    /**
     * @var Collection<int, Message>
     */
    #[ORM\OneToMany(targetEntity: Message::class, mappedBy: 'client')]
    private Collection $messages;

    /**
     * @var Collection<int, Messenger>
     */
    #[ORM\OneToMany(targetEntity: Messenger::class, mappedBy: 'client')]
    private Collection $messengers;

    /**
     * @var Collection<int, Contact>
     */
    #[ORM\OneToMany(targetEntity: Contact::class, mappedBy: 'id_client')]
    private Collection $contacts;

    #[ORM\OneToOne(mappedBy: 'idclient', cascade: ['persist', 'remove'])]
    private ?Panier $panier = null;

    public function getPanier(): ?Panier
    {
        return $this->panier;
    }

    public function setPanier(Panier $panier): static
    {
        // set the owning side of the relation if necessary
        if ($panier->getIdclient() !== $this) {
            $panier->setIdclient($this);
        }

        $this->panier = $panier;

        return $this;
    }

    public function __construct()
    {
        $this->commandes = new ArrayCollection();
        $this->temoignages = new ArrayCollection();
        $this->Contenu = new ArrayCollection();
        $this->messages = new ArrayCollection();
        $this->messengers = new ArrayCollection();
        $this->contacts = new ArrayCollection();
    }
    
    public function __toString(): string
    {
        return $this->prenom . ' ' . $this->nom . ' (' . $this->email . ')';
    }

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

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(string $telephone): static
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(?string $photo): static
    {
        $this->photo = $photo;

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

    /**
     * @return Collection<int, Commande>
     */
    public function getCommandes(): Collection
    {
        return $this->commandes;
    }

    public function addCommande(Commande $commande): static
    {
        if (!$this->commandes->contains($commande)) {
            $this->commandes->add($commande);
            $commande->setIdClient($this);
        }

        return $this;
    }

    public function removeCommande(Commande $commande): static
    {
        if ($this->commandes->removeElement($commande)) {
            // set the owning side to null (unless already changed)
            if ($commande->getIdClient() === $this) {
                $commande->setIdClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Temoignage>
     */
    public function getTemoignages(): Collection
    {
        return $this->temoignages;
    }

    public function addTemoignage(Temoignage $temoignage): static
    {
        if (!$this->temoignages->contains($temoignage)) {
            $this->temoignages->add($temoignage);
            $temoignage->addIdClient($this);
        }

        return $this;
    }

    public function removeTemoignage(Temoignage $temoignage): static
    {
        if ($this->temoignages->removeElement($temoignage)) {
            $temoignage->removeIdClient($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Avis>
     */
    public function getContenu(): Collection
    {
        return $this->Contenu;
    }

    public function addContenu(Avis $contenu): static
    {
        if (!$this->Contenu->contains($contenu)) {
            $this->Contenu->add($contenu);
            $contenu->setIdClient($this);
        }

        return $this;
    }

    public function removeContenu(Avis $contenu): static
    {
        if ($this->Contenu->removeElement($contenu)) {
            // set the owning side to null (unless already changed)
            if ($contenu->getIdClient() === $this) {
                $contenu->setIdClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): static
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setClient($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): static
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getClient() === $this) {
                $message->setClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Messenger>
     */
    public function getMessengers(): Collection
    {
        return $this->messengers;
    }

    public function addMessenger(Messenger $messenger): static
    {
        if (!$this->messengers->contains($messenger)) {
            $this->messengers->add($messenger);
            $messenger->setClient($this);
        }

        return $this;
    }

    public function removeMessenger(Messenger $messenger): static
    {
        if ($this->messengers->removeElement($messenger)) {
            // set the owning side to null (unless already changed)
            if ($messenger->getClient() === $this) {
                $messenger->setClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Contact>
     */
    public function getContacts(): Collection
    {
        return $this->contacts;
    }

    public function addContact(Contact $contact): static
    {
        if (!$this->contacts->contains($contact)) {
            $this->contacts->add($contact);
            $contact->setIdClient($this);
        }

        return $this;
    }

    public function removeContact(Contact $contact): static
    {
        if ($this->contacts->removeElement($contact)) {
            // set the owning side to null (unless already changed)
            if ($contact->getIdClient() === $this) {
                $contact->setIdClient(null);
            }
        }

        return $this;
    }
}
