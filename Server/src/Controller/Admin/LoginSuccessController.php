<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class LoginSuccessController extends AbstractController
{
    #[Route('/admin/login-success', name: 'admin_login_success')]
    #[IsGranted('ROLE_ADMIN')]
    public function loginSuccess(): Response
    {
        // Rediriger vers le dashboard admin après une connexion réussie
        return $this->redirectToRoute('app_admin_admin_index');
    }
}