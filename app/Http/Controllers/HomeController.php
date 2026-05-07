<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Article;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Ambil produk aktif & featured dari DB, urutkan by sort_order
        $featuredProducts = Product::where('is_active', true)
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug', 'tagline', 'emoji', 'color_config', 'image_path'])
            ->map(function ($p) {
                return [
                    'id'      => $p->id,
                    'name'    => $p->name,
                    'slug'    => $p->slug,
                    'tagline' => $p->tagline,
                    'emoji'   => $p->emoji ?? '🧴',
                    'color'   => $p->color_config['card'] ?? 'from-lime-200 to-green-200',
                    'image'   => $p->image_path
                        ? asset('storage/' . $p->image_path)
                        : null,
                ];
            });

        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts,
            'stats' => [
                'customers'    => '5 Juta+',
                'antibacterial'=> '99.9%',
                'years'        => '15+',
            ],
        ]);
    }
}
