<?php
// src/Controller/PapiPayController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class PapiPayController extends AbstractController
{
    private string $apiKey = '$2a$12$abjdxfghijtlmnopqrutwuOH/owaqHPpBqTz1m2wsF3EFdBwLK0zu'; // Mets ta vraie API Key ici
    private HttpClientInterface $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    #[Route('/api/papi/create-payment', name: 'papi_payer', methods: ['POST'])]
    public function payer(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $phone = $data['phone'] ?? null;
        $amount = $data['amount'] ?? null;

        if (!$phone || !$amount) {
            return new JsonResponse(['error' => 'Numéro et montant requis'], 400);
        }

        $payload = [
            "amount" => (int)$amount,
            "clientName" => "Client React",
            "reference" => "ORDER-" . time(),
            "description" => "Paiement via PAPI",
            "successUrl" => "http://localhost:5173/success",
            "failureUrl" => "http://localhost:5173/failure",
            "notificationUrl" => "http://127.0.0.1:8000/webhook/papi",
            "validDuration" => 60,
            "payerPhone" => $phone,
            "isTestMode" => true
        ];

        try {
            $response = $this->client->request(
                "POST",
                "https://app.papi.mg/dashboard/api/payment-links",
                [
                    "headers" => [
                        "Content-Type" => "application/json",
                        "Token" => $this->apiKey
                    ],
                    "json" => $payload
                ]
            );

            $data = $response->toArray(false); // ne pas throw exception pour 4xx/5xx
            $status = $response->getStatusCode();

            if ($status >= 200 && $status < 300) {
                return new JsonResponse([
                    "paymentLink" => $data["data"]["paymentLink"] ?? null,
                    "transactionId" => $data["data"]["paymentReference"] ?? null
                ]);
            }

            return new JsonResponse(["error" => $data["error"] ?? "Erreur API"], 500);

        } catch (\Exception $e) {
            return new JsonResponse([
                "error" => "Erreur communication API : " . $e->getMessage()
            ], 500);
        }
    }
}
