<?php

namespace App\Controller;

use App\Entity\Client;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

#[Route('/api/client')]
final class ClientController extends AbstractController
{
    #[Route('/{id}', name: 'app_client_get', methods: ['GET'])]
    public function getClient(int $id, EntityManagerInterface $em): JsonResponse
    {
        $client = $em->getRepository(Client::class)->find($id);

        if (!$client) {
            return $this->json(['error' => 'Client non trouvé'], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            'id' => $client->getId(),
            'nom' => $client->getNom(),
            'prenom' => $client->getPrenom(),
            'email' => $client->getEmail(),
            'telephone' => $client->getTelephone(),
            'adresse' => $client->getAdresse(),
            'photo' => $client->getPhoto(),
            'created_at' => $client->getCreatedAt()?->format('Y-m-d H:i:s'),
        ]);
    }

    #[Route('/{id}/update', name: 'app_client_update', methods: ['PUT'])]
    public function updateClient(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $client = $em->getRepository(Client::class)->find($id);

        if (!$client) {
            return $this->json(['error' => 'Client non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // Handle text fields from form data
        if ($request->request->has('nom')) {
            $client->setNom($request->request->get('nom'));
        }
        if ($request->request->has('prenom')) {
            $client->setPrenom($request->request->get('prenom'));
        }
        if ($request->request->has('telephone')) {
            $client->setTelephone($request->request->get('telephone'));
        }
        if ($request->request->has('adresse')) {
            $client->setAdresse($request->request->get('adresse'));
        }

        // Handle photo upload if provided
        $file = $request->files->get('photo');
        if ($file) {
            // Validate file type
            $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            if (!in_array($file->getMimeType(), $allowedMimeTypes)) {
                return $this->json(['error' => 'Format de fichier non autorisé. Utilisez JPG, PNG ou WEBP'], Response::HTTP_BAD_REQUEST);
            }

            // Validate file size (max 5MB)
            if ($file->getSize() > 5 * 1024 * 1024) {
                return $this->json(['error' => 'Le fichier est trop volumineux (max 5MB)'], Response::HTTP_BAD_REQUEST);
            }

            $uploadsDirectory = $this->getParameter('kernel.project_dir') . '/public/image/avatars';

            // Create directory if it doesn't exist
            if (!is_dir($uploadsDirectory)) {
                mkdir($uploadsDirectory, 0777, true);
            }

            // Generate unique filename
            $newFilename = uniqid() . '.' . $file->guessExtension();

            try {
                $file->move($uploadsDirectory, $newFilename);

                // Delete old photo if it's not the default
                $oldPhoto = $client->getPhoto();
                if ($oldPhoto && $oldPhoto !== 'default-avatar.jpg') {
                    $oldPhotoPath = $uploadsDirectory . '/' . $oldPhoto;
                    if (file_exists($oldPhotoPath)) {
                        unlink($oldPhotoPath);
                    }
                }

                // Update client photo
                $client->setPhoto($newFilename);
            } catch (FileException $e) {
                return $this->json(['error' => 'Erreur lors de l\'upload du fichier'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }

        $em->flush();

        return $this->json([
            'success' => true,
            'message' => 'Profil mis à jour avec succès',
            'client' => [
                'id' => $client->getId(),
                'nom' => $client->getNom(),
                'prenom' => $client->getPrenom(),
                'email' => $client->getEmail(),
                'telephone' => $client->getTelephone(),
                'adresse' => $client->getAdresse(),
                'photo' => $client->getPhoto(),
                'photoUrl' => $client->getPhoto() ? '/image/avatars/' . $client->getPhoto() : null,
            ]
        ]);
    }

    #[Route('/{id}/upload-photo', name: 'app_client_upload_photo', methods: ['POST'])]
    public function uploadPhoto(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $client = $em->getRepository(Client::class)->find($id);

        if (!$client) {
            return $this->json(['error' => 'Client non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $file = $request->files->get('photo');

        if (!$file) {
            return $this->json(['error' => 'Aucun fichier fourni'], Response::HTTP_BAD_REQUEST);
        }

        // Validate file type
        $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!in_array($file->getMimeType(), $allowedMimeTypes)) {
            return $this->json(['error' => 'Format de fichier non autorisé. Utilisez JPG, PNG ou WEBP'], Response::HTTP_BAD_REQUEST);
        }

        // Validate file size (max 5MB)
        if ($file->getSize() > 5 * 1024 * 1024) {
            return $this->json(['error' => 'Le fichier est trop volumineux (max 5MB)'], Response::HTTP_BAD_REQUEST);
        }

        $uploadsDirectory = $this->getParameter('kernel.project_dir') . '/public/image/avatars';
        
        // Create directory if it doesn't exist
        if (!is_dir($uploadsDirectory)) {
            mkdir($uploadsDirectory, 0777, true);
        }

        // Generate unique filename
        $newFilename = uniqid() . '.' . $file->guessExtension();

        try {
            $file->move($uploadsDirectory, $newFilename);
            
            // Delete old photo if it's not the default
            $oldPhoto = $client->getPhoto();
            if ($oldPhoto && $oldPhoto !== 'default-avatar.jpg') {
                $oldPhotoPath = $uploadsDirectory . '/' . $oldPhoto;
                if (file_exists($oldPhotoPath)) {
                    unlink($oldPhotoPath);
                }
            }

            // Update client photo
            $client->setPhoto($newFilename);
            $em->flush();

            return $this->json([
                'success' => true,
                'message' => 'Photo de profil mise à jour avec succès',
                'photo' => $newFilename,
                'photoUrl' => '/image/avatars/' . $newFilename
            ]);
        } catch (FileException $e) {
            return $this->json(['error' => 'Erreur lors de l\'upload du fichier'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
