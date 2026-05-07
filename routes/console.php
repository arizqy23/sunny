<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('sunny:stats', function () {
    $products = \App\Models\Product::count();
    $articles = \App\Models\Article::published()->count();
    $messages = \App\Models\ContactMessage::where('is_read', false)->count();
    $this->table(
        ['Metric', 'Count'],
        [
            ['Total Produk Aktif', \App\Models\Product::active()->count()],
            ['Total Artikel Published', $articles],
            ['Pesan Belum Dibaca', $messages],
        ]
    );
})->purpose('Show Sunny website statistics');
