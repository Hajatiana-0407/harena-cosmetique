<?php
namespace App\DataFixtures;

use App\Entity\Article;
use App\Entity\Categorie;
use App\Entity\Client;
use App\Entity\Commande;
use App\Entity\Paiement;
use App\Entity\Produit;
use App\Entity\Temoignage;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create('fr_FR');

        // --------- CATEGORIES ---------
        $categories = [];
        for ($i = 0; $i < 5; $i++) {
            $cat = new Categorie();
            $cat->setNom($faker->word());
            $cat->setType($faker->randomElement(['Visage', 'Cheveux', 'Corps', 'Parfum']));
            $cat->setDescription($faker->sentence(6));
            $cat->setCreatedAt(new \DateTimeImmutable());
            $manager->persist($cat);
            $categories[] = $cat;
        }

        // --------- PRODUITS ---------
        $produits = [];
        for ($i = 0; $i < 20; $i++) {
            $prod = new Produit();
            $prod->setNom($faker->words(2, true));
            $prod->setDefinition($faker->sentence(10));
            $prod->setUtilisation($faker->sentence(12));
            $prod->setPrix($faker->randomFloat(2, 5, 200));
            $prod->setStock($faker->numberBetween(0, 200));
            $prod->setImage('/image/beauty.jpg'); // Utiliser l'image temporaire
            $prod->setImageMini1('/image/beauty.jpg');
            $prod->setImageMini2('/image/beauty.jpg');
            $prod->setImageMini3('/image/beauty.jpg');
            $prod->setCompositions('Ingrédients naturels');
            $prod->setPresentation('Produit de qualité');
            $prod->setIdCategorie($categories[array_rand($categories)]);
            $manager->persist($prod);
            $produits[] = $prod;
        }

        // --------- CLIENTS ---------
        $clients = [];
        for ($i = 0; $i < 10; $i++) {
            $client = new Client();
            $client->setNom($faker->lastName());
            $client->setPrenom($faker->firstName());
            $client->setEmail($faker->unique()->safeEmail());
            $client->setPassword(password_hash('password', PASSWORD_BCRYPT));
            $client->setAdresse($faker->address());
            $client->setTelephone($faker->numberBetween(261320000000, 261349999999));
            $client->setCreatedAt(new \DateTimeImmutable());
            $manager->persist($client);
            $clients[] = $client;
        }

        // --------- COMMANDES + PAIEMENTS ---------
        foreach ($clients as $c) {
            for ($i = 0; $i < $faker->numberBetween(1, 3); $i++) {
                $commande = new Commande();
                $commande->setIdClient($c);
                $commande->setCreatedAt(new \DateTimeImmutable());
                $commande->setTotal($faker->randomFloat(2, 20, 500));
                $commande->setStatut($faker->randomElement(['en_attente', 'payée', 'annulée']));
                $manager->persist($commande);

                // Paiement lié
                $paiement = new Paiement();
                $paiement->setIdCommande($commande);
                $paiement->setMethode($faker->randomElement(['Mobile Money', 'Espèces', 'Carte']));
                $paiement->setCreatedAt(new \DateTimeImmutable());
                $paiement->setMontant($commande->getTotal());
                $manager->persist($paiement);
            }
        }

        // --------- ARTICLES ---------
        for ($i = 0; $i < 15; $i++) {
            $article = new Article();
            $article->setTitre($faker->sentence(4));
            $article->setContenu($faker->paragraph(3));
            $article->setAuteur($faker->name()); // Ajouter l'auteur
            $article->setCreatedAt(new \DateTimeImmutable());
            $article->setImage('/image/beauty.jpg'); // Utiliser l'image temporaire
            $manager->persist($article);
        }

        // --------- TEMOIGNAGES ---------
        foreach ($clients as $c) {
            if ($faker->boolean(60)) { // 60% des clients laissent un témoignage
                $t = new Temoignage();
                $t->setContenu($faker->sentence(10));
                $t->setCreatedAt(new \DateTimeImmutable());
                $t->setImage('/image/beauty.jpg'); // Utiliser l'image temporaire
                $t->addIdClient($c); // Corriger la méthode
                $manager->persist($t);
            }
        }

        $manager->flush();
    }
}
