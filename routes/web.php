<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Admin\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES — React SPA via Inertia
|--------------------------------------------------------------------------
*/
Route::middleware('inertia')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');

    Route::prefix('produk')->name('products.')->group(function () {
        Route::get('/',       [ProductController::class, 'index'])->name('index');
        Route::get('/{slug}', [ProductController::class, 'show'])->name('show');
    });

    Route::prefix('artikel')->name('articles.')->group(function () {
        Route::get('/',       [ArticleController::class, 'index'])->name('index');
        Route::get('/{slug}', [ArticleController::class, 'show'])->name('show');
    });

    Route::prefix('hubungi-kami')->name('contact.')->group(function () {
        Route::get('/',  [ContactController::class, 'index'])->name('index');
        Route::post('/', [ContactController::class, 'store'])->name('store');
    });
});

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES — Blade + Livewire (TANPA Inertia)
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->name('admin.')->group(function () {

    // Guest only
    Route::middleware('guest:admin')->group(function () {
        Route::get('login',  [AuthController::class, 'showLogin'])->name('login');
        Route::post('login', [AuthController::class, 'login'])->name('login.post');
    });

    // Logout
    Route::post('logout', [AuthController::class, 'logout'])
        ->name('logout')
        ->middleware('auth:admin');

    // Panel (auth required)
    Route::middleware('auth:admin')->group(function () {
        // Dashboard — sekarang pakai Livewire agar layout konsisten
        Route::get('/', \App\Livewire\Admin\Dashboard::class)->name('dashboard');

        Route::get('produk',            \App\Livewire\Admin\Products\Index::class)->name('products.index');
        Route::get('produk/buat',       \App\Livewire\Admin\Products\Form::class)->name('products.create');
        Route::get('produk/{id}/edit',  \App\Livewire\Admin\Products\Form::class)->name('products.edit');
        Route::get('artikel',           \App\Livewire\Admin\Articles\Index::class)->name('articles.index');
        Route::get('artikel/buat',      \App\Livewire\Admin\Articles\Form::class)->name('articles.create');
        Route::get('artikel/{id}/edit', \App\Livewire\Admin\Articles\Form::class)->name('articles.edit');
        Route::get('pesan',             \App\Livewire\Admin\Messages\Index::class)->name('messages.index');
        Route::get('pesan/{id}',        \App\Livewire\Admin\Messages\Show::class)->name('messages.show');
    });
});
