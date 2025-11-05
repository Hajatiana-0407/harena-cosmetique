<?php

namespace App\DataFixtures;

use App\Entity\Article;
use App\Entity\Categorie;
use App\Entity\Produit;
use App\Entity\Client;
use App\Entity\Temoignage;
use App\Entity\Avis;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class TestDataFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Créer des catégories
        $categories = [];
        $categoriesData = [
            ['Soins pour cheveux', 'cheveux', 'Produits pour prendre soin de vos cheveux'],
            ['Soins du visage', 'visage', 'Produits pour le soin du visage'],
            ['Savons naturels', 'savon', 'Savons artisanaux et naturels'],
            ['Huiles essentielles', 'huile', 'Huiles essentielles pures']
        ];

        foreach ($categoriesData as [$nom, $type, $description]) {
            $categorie = new Categorie();
            $categorie->setNom($nom);
            $categorie->setType($type);
            $categorie->setDescription($description);
            $categorie->setCreatedAt(new \DateTimeImmutable());
            $manager->persist($categorie);
            $categories[] = $categorie;
        }

        // Créer des produits
        $produitsData = [
            ['Shampoing aux herbes', 'Shampoing naturel aux extraits d\'herbes', 'Appliquer sur cheveux mouillés, masser et rincer', 15000, 'En stock'],
            ['Crème hydratante', 'Crème hydratante pour le visage', 'Appliquer matin et soir sur peau propre', 25000, 'En stock'],
            ['Savon au karité', 'Savon artisanal au beurre de karité', 'Utiliser quotidiennement pour le corps', 8000, 'En stock'],
            ['Huile d\'argan', 'Huile d\'argan pure du Maroc', 'Quelques gouttes suffisent', 30000, 'En stock']
        ];

        $produits = [];
        foreach ($produitsData as $index => [$nom, $definition, $utilisation, $prix, $stock]) {
            $produit = new Produit();
            $produit->setNom($nom);
            $produit->setDefinition($definition);
            $produit->setUtilisation($utilisation);
            $produit->setPrix($prix);
            $produit->setStock($stock);
            $produit->setImage('/image/beauty.jpg');
            $produit->setImageMini1('/image/beauty.jpg');
            $produit->setImageMini2('/image/beauty.jpg');
            $produit->setImageMini3('/image/beauty.jpg');
            $produit->setCompositions('Ingrédients naturels');
            $produit->setPresentation('Produit de qualité');
            $produit->setIdCategorie($categories[$index % count($categories)]);
            $manager->persist($produit);
            $produits[] = $produit;
        }

        // Créer des articles
        $articlesData = [
            ['Les bienfaits des soins naturels', 'Découvrez les avantages des produits cosmétiques naturels...', 'Expert Beauté'],
            ['Comment prendre soin de ses cheveux', 'Guide complet pour des cheveux en bonne santé...', 'Coiffeur Pro'],
            ['Routine beauté quotidienne', 'Établir une routine beauté efficace...', 'Esthéticienne']
        ];

        foreach ($articlesData as [$titre, $contenu, $auteur]) {
            $article = new Article();
            $article->setTitre($titre);
            $article->setContenu($contenu);
            $article->setAuteur($auteur);
            $article->setImage('/image/beauty.jpg');
            $article->setCreatedAt(new \DateTimeImmutable());
            $manager->persist($article);
        }

        // Créer des clients de test
        $clientsData = [
            ['Marie', 'Rakoto', 'marie.rakoto@email.mg', 'Antananarivo', 34123456],
            ['Jean', 'Rasoamanarivo', 'jean.raso@email.mg', 'Fianarantsoa', 34234567],
            ['Sophie', 'Randriamiarana', 'sophie.rand@email.mg', 'Toamasina', 34345678]
        ];

        $clients = [];
        foreach ($clientsData as [$nom, $prenom, $email, $adresse, $telephone]) {
            $client = new Client();
            $client->setNom($nom);
            $client->setPrenom($prenom);
            $client->setEmail($email);
            $client->setAdresse($adresse);
            $client->setTelephone($telephone);
            $client->setPassword('test_password');
            $client->setCreatedAt(new \DateTimeImmutable());
            $manager->persist($client);
            $clients[] = $client;
        }

        // Créer des témoignages
        $temoignagesData = [
            'Excellent produit, je recommande vivement !',
            'Très satisfaite de mes achats, produits de qualité.',
            'Service client au top et livraison rapide.'
        ];

        foreach ($temoignagesData as $index => $contenu) {
            $temoignage = new Temoignage();
            $temoignage->setContenu($contenu);
            $temoignage->setImage('/image/beauty.jpg');
            $temoignage->setCreatedAt(new \DateTimeImmutable());
            $temoignage->addIdClient($clients[$index % count($clients)]);
            $manager->persist($temoignage);
        }

        // Créer des avis
        $avisData = [
            ['Très bon produit', 'Je suis très satisfaite de ce produit, il répond parfaitement à mes attentes.', 5],
            ['Qualité correcte', 'Le produit est correct mais sans plus. Prix un peu élevé.', 3],
            ['Excellent !', 'Produit exceptionnel, je le recommande à toutes mes amies !', 5]
        ];

        foreach ($avisData as $index => [$titre, $contenu, $etoiles]) {
            $avis = new Avis();
            $avis->setTitre($titre);
            $avis->setContenu($contenu);
            $avis->setEtoiles($etoiles);
            $avis->setDatePost(new \DateTimeImmutable());
            $avis->setIdClient($clients[$index % count($clients)]);
            $avis->addProduit($produits[$index % count($produits)]);
            $manager->persist($avis);
        }

        $manager->flush();
    }
}