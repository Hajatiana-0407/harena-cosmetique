<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251210203635 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact ADD message VARCHAR(1000) NOT NULL, ADD prenom VARCHAR(255) DEFAULT NULL, ADD address VARCHAR(255) DEFAULT NULL, ADD phone_number VARCHAR(20) DEFAULT NULL, ADD operator VARCHAR(50) DEFAULT NULL, ADD agree_to_policies TINYINT(1) DEFAULT NULL, DROP messages, DROP sujet');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact ADD messages VARCHAR(255) NOT NULL, ADD sujet VARCHAR(255) NOT NULL, DROP message, DROP prenom, DROP address, DROP phone_number, DROP operator, DROP agree_to_policies');
    }
}
