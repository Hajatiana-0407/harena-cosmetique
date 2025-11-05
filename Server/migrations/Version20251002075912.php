<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251002075912 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE avis (id INT AUTO_INCREMENT NOT NULL, id_client_id INT DEFAULT NULL, date_post DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', etoiles DOUBLE PRECISION DEFAULT NULL, INDEX IDX_8F91ABF099DED506 (id_client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE avis_produit (avis_id INT NOT NULL, produit_id INT NOT NULL, INDEX IDX_2A67C21197E709F (avis_id), INDEX IDX_2A67C21F347EFB (produit_id), PRIMARY KEY(avis_id, produit_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF099DED506 FOREIGN KEY (id_client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE avis_produit ADD CONSTRAINT FK_2A67C21197E709F FOREIGN KEY (avis_id) REFERENCES avis (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE avis_produit ADD CONSTRAINT FK_2A67C21F347EFB FOREIGN KEY (produit_id) REFERENCES produit (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE temoignage_produit DROP FOREIGN KEY FK_181F2D71F2410A1E');
        $this->addSql('ALTER TABLE temoignage_produit DROP FOREIGN KEY FK_181F2D71F347EFB');
        $this->addSql('DROP TABLE temoignage_produit');
        $this->addSql('ALTER TABLE temoignage DROP FOREIGN KEY FK_BDADBC4619EB6921');
        $this->addSql('DROP INDEX IDX_BDADBC4619EB6921 ON temoignage');
        $this->addSql('ALTER TABLE temoignage DROP client_id, DROP profession, CHANGE date_post created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE temoignage_produit (temoignage_id INT NOT NULL, produit_id INT NOT NULL, INDEX IDX_181F2D71F2410A1E (temoignage_id), INDEX IDX_181F2D71F347EFB (produit_id), PRIMARY KEY(temoignage_id, produit_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE temoignage_produit ADD CONSTRAINT FK_181F2D71F2410A1E FOREIGN KEY (temoignage_id) REFERENCES temoignage (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE temoignage_produit ADD CONSTRAINT FK_181F2D71F347EFB FOREIGN KEY (produit_id) REFERENCES produit (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF099DED506');
        $this->addSql('ALTER TABLE avis_produit DROP FOREIGN KEY FK_2A67C21197E709F');
        $this->addSql('ALTER TABLE avis_produit DROP FOREIGN KEY FK_2A67C21F347EFB');
        $this->addSql('DROP TABLE avis');
        $this->addSql('DROP TABLE avis_produit');
        $this->addSql('ALTER TABLE temoignage ADD client_id INT DEFAULT NULL, ADD profession VARCHAR(255) DEFAULT NULL, CHANGE created_at date_post DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE temoignage ADD CONSTRAINT FK_BDADBC4619EB6921 FOREIGN KEY (client_id) REFERENCES client (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_BDADBC4619EB6921 ON temoignage (client_id)');
    }
}
