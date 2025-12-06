<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251206072258 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE article (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(255) NOT NULL, contenu VARCHAR(500) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', image VARCHAR(255) NOT NULL, auteur VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE avis (id INT AUTO_INCREMENT NOT NULL, id_client_id INT DEFAULT NULL, date_post DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', etoiles DOUBLE PRECISION DEFAULT NULL, titre VARCHAR(255) DEFAULT NULL, contenu VARCHAR(255) DEFAULT NULL, INDEX IDX_8F91ABF099DED506 (id_client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE produit_avis (avis_id INT NOT NULL, produit_id INT NOT NULL, INDEX IDX_A609D61F197E709F (avis_id), INDEX IDX_A609D61FF347EFB (produit_id), PRIMARY KEY(avis_id, produit_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categorie (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(100) NOT NULL, type VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE client (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) DEFAULT NULL, adresse VARCHAR(255) NOT NULL, telephone VARCHAR(255) NOT NULL, photo VARCHAR(255) DEFAULT NULL, created_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE commande (id INT AUTO_INCREMENT NOT NULL, id_client_id INT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', total DOUBLE PRECISION NOT NULL, statut VARCHAR(255) NOT NULL, items JSON NOT NULL, INDEX IDX_6EEAA67D99DED506 (id_client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contact (id INT AUTO_INCREMENT NOT NULL, id_client_id INT DEFAULT NULL, messages VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', sujet VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, nom VARCHAR(255) DEFAULT NULL, INDEX IDX_4C62E63899DED506 (id_client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message (id INT AUTO_INCREMENT NOT NULL, client_id INT NOT NULL, contenu LONGTEXT NOT NULL, expediteur VARCHAR(50) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', lu TINYINT(1) NOT NULL, INDEX IDX_B6BD307F19EB6921 (client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger (id INT AUTO_INCREMENT NOT NULL, client_id INT DEFAULT NULL, conversation VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', objet VARCHAR(255) DEFAULT NULL, destinateur VARCHAR(255) DEFAULT NULL, INDEX IDX_E22A430119EB6921 (client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE paiement (id INT AUTO_INCREMENT NOT NULL, id_commande_id INT NOT NULL, methode VARCHAR(255) NOT NULL, cerated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', montant VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_B1DC7A1E9AF8E3A3 (id_commande_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE panier (id INT AUTO_INCREMENT NOT NULL, idclient_id INT NOT NULL, items JSON NOT NULL, updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_24CC0DF267F0C0D4 (idclient_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE produit (id INT AUTO_INCREMENT NOT NULL, id_categorie_id INT DEFAULT NULL, nom VARCHAR(255) NOT NULL, definition VARCHAR(500) NOT NULL, utilisation VARCHAR(500) NOT NULL, prix DOUBLE PRECISION NOT NULL, stock VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, image_mini1 VARCHAR(255) DEFAULT NULL, image_mini2 VARCHAR(255) DEFAULT NULL, image_mini3 VARCHAR(255) DEFAULT NULL, compositions VARCHAR(255) DEFAULT NULL, presentation VARCHAR(255) DEFAULT NULL, INDEX IDX_29A5EC279F34925F (id_categorie_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE temoignage (id INT AUTO_INCREMENT NOT NULL, id_client_id INT DEFAULT NULL, contenu VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', image VARCHAR(255) NOT NULL, titre VARCHAR(255) NOT NULL, auteur VARCHAR(255) DEFAULT NULL, INDEX IDX_BDADBC4699DED506 (id_client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF099DED506 FOREIGN KEY (id_client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE produit_avis ADD CONSTRAINT FK_A609D61F197E709F FOREIGN KEY (avis_id) REFERENCES avis (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE produit_avis ADD CONSTRAINT FK_A609D61FF347EFB FOREIGN KEY (produit_id) REFERENCES produit (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE commande ADD CONSTRAINT FK_6EEAA67D99DED506 FOREIGN KEY (id_client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT FK_4C62E63899DED506 FOREIGN KEY (id_client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F19EB6921 FOREIGN KEY (client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE messenger ADD CONSTRAINT FK_E22A430119EB6921 FOREIGN KEY (client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE paiement ADD CONSTRAINT FK_B1DC7A1E9AF8E3A3 FOREIGN KEY (id_commande_id) REFERENCES commande (id)');
        $this->addSql('ALTER TABLE panier ADD CONSTRAINT FK_24CC0DF267F0C0D4 FOREIGN KEY (idclient_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE produit ADD CONSTRAINT FK_29A5EC279F34925F FOREIGN KEY (id_categorie_id) REFERENCES categorie (id)');
        $this->addSql('ALTER TABLE temoignage ADD CONSTRAINT FK_BDADBC4699DED506 FOREIGN KEY (id_client_id) REFERENCES client (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF099DED506');
        $this->addSql('ALTER TABLE produit_avis DROP FOREIGN KEY FK_A609D61F197E709F');
        $this->addSql('ALTER TABLE produit_avis DROP FOREIGN KEY FK_A609D61FF347EFB');
        $this->addSql('ALTER TABLE commande DROP FOREIGN KEY FK_6EEAA67D99DED506');
        $this->addSql('ALTER TABLE contact DROP FOREIGN KEY FK_4C62E63899DED506');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F19EB6921');
        $this->addSql('ALTER TABLE messenger DROP FOREIGN KEY FK_E22A430119EB6921');
        $this->addSql('ALTER TABLE paiement DROP FOREIGN KEY FK_B1DC7A1E9AF8E3A3');
        $this->addSql('ALTER TABLE panier DROP FOREIGN KEY FK_24CC0DF267F0C0D4');
        $this->addSql('ALTER TABLE produit DROP FOREIGN KEY FK_29A5EC279F34925F');
        $this->addSql('ALTER TABLE temoignage DROP FOREIGN KEY FK_BDADBC4699DED506');
        $this->addSql('DROP TABLE article');
        $this->addSql('DROP TABLE avis');
        $this->addSql('DROP TABLE produit_avis');
        $this->addSql('DROP TABLE categorie');
        $this->addSql('DROP TABLE client');
        $this->addSql('DROP TABLE commande');
        $this->addSql('DROP TABLE contact');
        $this->addSql('DROP TABLE message');
        $this->addSql('DROP TABLE messenger');
        $this->addSql('DROP TABLE paiement');
        $this->addSql('DROP TABLE panier');
        $this->addSql('DROP TABLE produit');
        $this->addSql('DROP TABLE temoignage');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
