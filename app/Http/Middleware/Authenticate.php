<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Redirect ke halaman login yang sesuai berdasarkan guard.
     * Guard 'admin' → /admin/login
     * Guard lain    → /login (default public)
     */
    protected function redirectTo(Request $request): ?string
    {
        if (! $request->expectsJson()) {
            // Cek apakah request ada di route admin
            if ($request->is('admin*') || in_array('admin', $this->guards)) {
                return route('admin.login');
            }
            return route('home');
        }
        return null;
    }
}
