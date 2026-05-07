<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Pagination\Paginator;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        // Set pagination view hanya untuk request admin
        if (request()->is('admin*')) {
            Paginator::defaultView('admin.components.pagination');
            Paginator::defaultSimpleView('admin.components.pagination');
        }
    }
}
