<?php
namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;
use Psr\Log\LoggerInterface;

class PapiService
{
    private HttpClientInterface $client;
    private LoggerInterface $logger;
    private string $apiKey;
    private string $baseUrl;

    public function __construct(HttpClientInterface $client, LoggerInterface $logger)
    {
        $this->client = $client;
        $this->logger = $logger;
        $this->apiKey = getenv('PAPI_API_KEY') ?: $_ENV['PAPI_API_KEY'] ?? null;
        $this->baseUrl = getenv('PAPI_BASE_URL') ?: $_ENV['PAPI_BASE_URL'] ?? 'https://app.papi.mg/dashboard/api';
    }

    public function createPaymentLink(array $payload): array
    {
        $response = $this->client->request('POST', rtrim($this->baseUrl, '/') . '/payment-links', [
            'headers' => [
                'Content-Type' => 'application/json',
                'Token' => $this->apiKey,
            ],
            'json' => $payload,
            'timeout' => 30,
        ]);

        return $response->toArray(false);
    }
}
