<?php
// src/Controller/PapiWebhookController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PapiWebhookController extends AbstractController
{
    #[Route('/api/webhook/papi', name: 'webhook_papi', methods: ['POST'])]
    public function webhook(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        file_put_contents(__DIR__ . '/../../var/log/papi_webhook.log', date('c') . ' ' . json_encode($data) . PHP_EOL, FILE_APPEND);

        // TODO: vérifier notificationToken + mettre à jour la commande en BD
        return new Response('OK', 200);
    }
}
