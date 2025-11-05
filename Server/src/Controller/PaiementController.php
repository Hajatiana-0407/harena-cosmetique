<?php

namespace App\Controller;

use App\Repository\PaiementRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Stripe\PaymentIntent;
use Stripe\Stripe;

final class PaiementController extends AbstractController
{
    #[Route('/paiement', name: 'app_paiement')]
    public function index(PaiementRepository $paiementRepository): Response
    {
        $paiements = $paiementRepository->findAll();

        // Le sérialiseur va automatiquement utiliser les propriétés et méthodes
        // qui ont le groupe 'paiement:read', y compris votre méthode getCommandeId().
        return $this->json($paiements, 200, [], ['groups' => 'paiement:read']);
    }

    /**
     * Crée un PaymentIntent Stripe et, si un paymentMethodId est fourni, essaye de confirmer.
     * Entrée JSON attendue:
     * {
     *   "amount": <integer> (en unités minimales ex: EUR en centimes),
     *   "currency": "eur" (optionnel, défaut: eur),
     *   "paymentMethodId": "pm_..." (optionnel)
     * }
     * Réponse: { success: bool, clientSecret?: string, error?: string }
     */
    #[Route('/api/create-payment', name: 'api_create_payment', methods: ['POST'])]
    public function createPayment(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true) ?? [];

            // Récupère la clé Stripe depuis l'environnement (compat: STRIPE_API_KEY ou STRIPE_SECRET_KEY)
            $stripeKey = $_ENV['STRIPE_API_KEY'] ?? ($_ENV['STRIPE_SECRET_KEY'] ?? null);
            if (!$stripeKey) {
                return $this->json([
                    'success' => false,
                    'error' => 'Stripe secret key is not configured.'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            Stripe::setApiKey($stripeKey);

            $amount = (int)($data['amount'] ?? 0);
            $currency = $data['currency'] ?? 'eur';
            $paymentMethodId = $data['paymentMethodId'] ?? null;

            if ($amount <= 0) {
                return $this->json([
                    'success' => false,
                    'error' => 'Invalid amount. Must be a positive integer in the smallest currency unit.'
                ], Response::HTTP_BAD_REQUEST);
            }

            $createParams = [
                'amount' => $amount,
                'currency' => $currency,
                // Vous pouvez ajouter ici metadata, description, receipt_email, etc.
                // 'metadata' => [ 'order_id' => $data['orderId'] ?? '' ],
            ];

            // Si un paymentMethodId est fourni, on demande une confirmation immédiate
            if ($paymentMethodId) {
                $createParams['payment_method'] = $paymentMethodId;
                $createParams['confirm'] = true;
            }

            $paymentIntent = PaymentIntent::create($createParams);

            return $this->json([
                'success' => true,
                // Expose le client_secret pour un flux Elements côté client si non confirmé
                'clientSecret' => $paymentIntent->client_secret ?? null,
                'status' => $paymentIntent->status,
            ]);
        } catch (\Throwable $e) {
            return $this->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
