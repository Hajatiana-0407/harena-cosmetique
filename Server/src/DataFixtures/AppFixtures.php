<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Client;
use App\Entity\Categorie;
use App\Entity\Produit;
use App\Entity\Avis;
use App\Entity\Commande;
use App\Entity\Paiement;
use App\Entity\Contact;
use App\Entity\Temoignage;
use App\Entity\Article;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use DateTimeImmutable;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        /* ================= USERS ================= */
        for ($i = 0; $i < 3; $i++) {
            $u = new User();
            $u->setEmail("admin$i@example.com");
            $u->setRoles(['ROLE_ADMIN']);
            $u->setPassword(password_hash('password123', PASSWORD_DEFAULT));
            $manager->persist($u);
        }

        /* ================= CLIENTS ================= */
        $clients = [];
        for ($i = 0; $i < 15; $i++) {
            $c = new Client();
            $c->setNom($faker->lastName());
            $c->setPrenom($faker->firstName());
            $c->setEmail("client$i@example.com");
            $c->setPassword(password_hash('client123', PASSWORD_DEFAULT));
            $c->setAdresse($faker->streetAddress() . ', ' . $faker->city());
            $c->setTelephone($faker->phoneNumber());
            $c->setCreatedAt(DateTimeImmutable::createFromMutable(
                $faker->dateTimeBetween('-1 year', 'now')
            ));
            $manager->persist($c);
            $clients[] = $c;
        }

        /* ================= CATEGORIES ================= */
        $categoryNames = ['Cosmétiques', 'Alimentation', 'Artisanat', 'Bijoux', 'Décoration', 'Vêtements'];
        $categoryTypes = ['Bio', 'Artisanal', 'Naturel', 'Local'];
        $categories = [];

        foreach ($categoryNames as $name) {
            $cat = new Categorie();
            $cat->setNom($name);
            $cat->setType($faker->randomElement($categoryTypes));
            $cat->setDescription("Découvrez notre sélection de $name de qualité, fabriqués avec soin et passion.");
            $cat->setCreatedAt(DateTimeImmutable::createFromMutable(
                $faker->dateTimeBetween('-2 year', 'now')
            ));
            $manager->persist($cat);
            $categories[] = $cat;
        }

        /* ================= PRODUITS ================= */
        $productsSamples = [
            ['Savon à l’aloé', 'Hydrate et protège la peau', 'Usage quotidien', 5, 50],
            ['Huile essentielle de lavande', 'Relaxante et apaisante', 'Diffusion ou massage', 12, 30],
            ['Bougie parfumée', 'Ambiance chaleureuse et parfumée', 'Allumer 1h max', 8, 100],
            ['T-shirt en coton bio', 'Confortable et écologique', 'Port quotidien', 20, 80],
            ['Sac en raphia', 'Artisanat local et durable', 'Transport léger', 25, 40]
        ];

        $produits = [];
        for ($i = 0; $i < 25; $i++) {
            $sample = $faker->randomElement($productsSamples);
            $prod = new Produit();
            $prod->setIdCategorie($faker->randomElement($categories));
            $prod->setNom($sample[0]);
            $prod->setDefinition($sample[1]);
            $prod->setUtilisation($sample[2]);
            $prod->setPrix($faker->randomFloat(2, $sample[3], $sample[3]+10));
            $prod->setStock($faker->numberBetween($sample[4], $sample[4]+50));
            $prod->setImage("image_$i.jpg");
            $prod->setImageMini1("mini1_$i.jpg");
            $prod->setImageMini2("mini2_$i.jpg");
            $prod->setImageMini3("mini3_$i.jpg");
            $prod->setNombreAvisParProduit(0);
            $prod->setCompositions(["Ingrédients naturels de haute qualité"]);
            $prod->setPresentation("Ce produit est soigneusement sélectionné pour répondre à vos besoins.");

            $manager->persist($prod);
            $produits[] = $prod;
        }

        /* ================= AVIS ================= */
        $avisList = [];
        for ($i = 0; $i < 40; $i++) {
            $a = new Avis();
            $a->setIdClient($faker->randomElement($clients));
            $a->setDatePost(DateTimeImmutable::createFromMutable(
                $faker->dateTimeBetween('-1 year', 'now')
            ));
            $a->setEtoiles($faker->randomFloat(1, 3, 5));
            $a->setTitre($faker->sentence(3));
            $a->setContenu($faker->realText(80));

            $manager->persist($a);
            $avisList[] = $a;
        }

        /* ================= PRODUIT + AVIS ================= */
        foreach ($avisList as $av) {
            $prod = $faker->randomElement($produits);
            $prod->setNombreAvisParProduit($prod->getNombreAvisParProduit() + 1);
            $prod->addAvis($av);
        }

        /* ================= COMMANDES & PAIEMENTS ================= */
        foreach ($clients as $cl) {
            for ($i = 0; $i < rand(1, 3); $i++) {
                $cmd = new Commande();
                $cmd->setIdClient($cl);
                $cmd->setCreatedAt(DateTimeImmutable::createFromMutable(
                    $faker->dateTimeBetween('-6 months', 'now')
                ));
                $cmd->setTotal($faker->randomFloat(2, 20, 400));
                $cmd->setStatut($faker->randomElement(['En attente', 'Confirmé', 'Payé', 'Livré']));
                $manager->persist($cmd);

                $pay = new Paiement();
                $pay->setIdCommande($cmd);
                $pay->setMethode($faker->randomElement(['Mobile Money', 'Espèces', 'Carte bancaire']));
                $pay->setCreatedAt(DateTimeImmutable::createFromMutable(
                    $faker->dateTimeBetween('-6 months', 'now')
                ));
                $pay->setMontant($cmd->getTotal());
                $manager->persist($pay);
            }
        }

        /* ================= CONTACTS ================= */
        for ($i = 0; $i < 20; $i++) {
            $con = new Contact();
            $con->setIdClient($faker->randomElement($clients));
            $con->setEmail("client$i@example.com");
            $con->setSujet($faker->realText(10));
            $con->setMessages($faker->realText(100));
            $con->setCreatedAt(DateTimeImmutable::createFromMutable(
                $faker->dateTimeBetween('-6 months', 'now')
            ));
            $manager->persist($con);
        }

        /* ================= TEMOIGNAGES ================= */
        for ($i = 0; $i < 12; $i++) {
            $t = new Temoignage();
            $t->setIdClient($faker->randomElement($clients));
            $t->setTitre($faker->sentence(3)); // Added missing title
            $t->setContenu($faker->realText(80));
            $t->setImage("temoignage_$i.jpg");
            $t->setCreatedAt(DateTimeImmutable::createFromMutable(
                $faker->dateTimeBetween('-2 months', 'now')
            ));
            $manager->persist($t);
        }

        /* ================= ARTICLES ================= */
        $articleSamples = [
            ['Bienfaits du savon naturel', 'Découvrez pourquoi les savons naturels sont meilleurs pour la peau et l’environnement.'],
            ['Astuces pour un mode de vie bio', '10 conseils simples pour intégrer le bio dans votre quotidien.'],
            ['Artisanat local à soutenir', 'L’importance de soutenir les artisans locaux et leurs savoir-faire.'],
            ['Guide des huiles essentielles', 'Comment utiliser les huiles essentielles pour améliorer votre bien-être.'],
        ];

        for ($i = 0; $i < 15; $i++) {
            $sample = $faker->randomElement($articleSamples);
            $art = new Article();
            $art->setTitre($sample[0]);
            $art->setContenu($sample[1]);
            $art->setImage("article_$i.jpg");
            $art->setAuteur($faker->name());
            $art->setCreatedAt(DateTimeImmutable::createFromMutable(
                $faker->dateTimeBetween('-3 months', 'now')
            ));
            $manager->persist($art);
        }

        $manager->flush();
    }
}
