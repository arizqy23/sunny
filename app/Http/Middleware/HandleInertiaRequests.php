<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * Template Blade root untuk halaman pertama Inertia.
     */
    protected $rootView = 'app';

    /**
     * Versi asset untuk cache busting.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Data yang di-share ke semua Inertia pages (public only).
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
                'info'    => fn () => $request->session()->get('info'),
            ],
            'app' => [
                'name' => config('app.name', 'Sunny'),
                'url'  => config('app.url'),
            ],
        ];
    }
}
