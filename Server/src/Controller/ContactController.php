<?php

namespace App\Controller;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

final class ContactController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private ValidatorInterface $validator;

    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    #[Route('/contact', name: 'app_contact', methods: ['GET', 'POST'])]
    public function index(Request $request): Response
    {
        if ($request->isMethod('POST')) {
            return $this->handleContactForm($request);
        }

        return $this->render('contact/index.html.twig', [
            'controller_name' => 'ContactController',
        ]);
    }

    private function handleContactForm(Request $request): JsonResponse
    {
        try {
            // Sanitize and validate input data
            $data = $this->sanitizeInput($request->request->all());

            // Validate required fields
            $errors = $this->validateContactData($data);
            if (!empty($errors)) {
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Données invalides: ' . implode(', ', $errors)
                ], 400);
            }

            // Create and save contact entity
            $contact = new Contact();
            $contact->setNom($data['Nom']);
            $contact->setPrenom($data['prenom']);
            $contact->setAddress($data['address']);
            $contact->setEmail($data['email']);
            $contact->setPhoneNumber($data['phone-number']);
            $contact->setOperator($data['operator']);
            $contact->setMessage($data['message']);
            $contact->setAgreeToPolicies($data['agree-to-policies']);
            $contact->setCreatedAt(new \DateTime());

            // Validate entity
            $entityErrors = $this->validator->validate($contact);
            if (count($entityErrors) > 0) {
                $errorMessages = [];
                foreach ($entityErrors as $error) {
                    $errorMessages[] = $error->getMessage();
                }
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Erreurs de validation: ' . implode(', ', $errorMessages)
                ], 400);
            }

            // Save to database
            $this->entityManager->persist($contact);
            $this->entityManager->flush();

            return new JsonResponse([
                'success' => true,
                'message' => 'Message envoyé avec succès !'
            ]);

        } catch (\Exception $e) {
            // Log the error for debugging
            error_log('Contact form error: ' . $e->getMessage());

            return new JsonResponse([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'envoi du message'
            ], 500);
        }
    }

    private function sanitizeInput(array $data): array
    {
        $sanitized = [];

        foreach ($data as $key => $value) {
            if (is_string($value)) {
                // Remove HTML tags and trim whitespace
                $sanitized[$key] = trim(strip_tags($value));
            } elseif (is_bool($value)) {
                $sanitized[$key] = $value;
            } else {
                $sanitized[$key] = $value;
            }
        }

        return $sanitized;
    }

    private function validateContactData(array $data): array
    {
        $errors = [];

        // Required fields validation
        $requiredFields = ['Nom', 'prenom', 'email', 'message'];
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                $errors[] = "Le champ {$field} est requis";
            }
        }

        // Email validation
        if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors[] = "L'adresse email n'est pas valide";
        }

        // Phone number validation (basic Madagascar format)
        if (!empty($data['phone-number'])) {
            $phone = preg_replace('/\s+/', '', $data['phone-number']);
            if (!preg_match('/^(\+261|0)[0-9]{9}$/', $phone)) {
                $errors[] = "Le numéro de téléphone n'est pas valide";
            }
        }

        // Message length validation
        if (!empty($data['message']) && strlen($data['message']) > 1000) {
            $errors[] = "Le message ne peut pas dépasser 1000 caractères";
        }

        // Name validation (no special characters)
        if (!empty($data['Nom']) && !preg_match('/^[a-zA-Z\s\'-]+$/', $data['Nom'])) {
            $errors[] = "Le nom contient des caractères invalides";
        }

        if (!empty($data['prenom']) && !preg_match('/^[a-zA-Z\s\'-]+$/', $data['prenom'])) {
            $errors[] = "Le prénom contient des caractères invalides";
        }

        // Privacy policy agreement
        if (!isset($data['agree-to-policies']) || !$data['agree-to-policies']) {
            $errors[] = "Vous devez accepter la politique de confidentialité";
        }

        return $errors;
    }
}
