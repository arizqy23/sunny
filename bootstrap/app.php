<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Override Authenticate middleware agar redirect admin ke admin.login
        $middleware->redirectGuestsTo(function ($request) {
            if ($request->is('admin*')) {
                return route('admin.login');
            }
            return route('home');
        });

        // Daftarkan alias 'inertia' — hanya dipakai oleh public routes
        $middleware->alias([
            'inertia' => App\Http\Middleware\HandleInertiaRequests::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (\Symfony\Component\HttpFoundation\Response $response) {
            $status  = $response->getStatusCode();
            $isAdmin = request()->is('admin*');

            // Admin: biarkan Laravel/Blade tangani error-nya sendiri
            if ($isAdmin) {
                return $response;
            }

            // Public: render error page via Inertia React
            if (in_array($status, [403, 404, 419, 429, 500, 503])) {
                return Inertia::render('Error', ['status' => $status])
                    ->toResponse(request())
                    ->setStatusCode($status);
            }

            return $response;
        });
    })
    ->create();
