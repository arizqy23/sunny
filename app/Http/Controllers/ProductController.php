<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Products/Index', [
            'products' => Product::active()
                ->orderBy('sort_order')
                ->get([
                    'id', 'name', 'slug', 'tagline', 'description',
                    'price_min', 'price_max', 'emoji', 'color_config',
                    'benefits', 'specs', 'sizes', 'is_featured', 'image_path',
                ])
                ->map(fn($p) => $this->formatProduct($p)),
        ]);
    }

    public function show(string $slug): Response
    {
        $product = Product::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Products/Show', [
            'product' => $this->formatProduct($product, full: true),
            'related' => Product::active()
                ->where('id', '!=', $product->id)
                ->orderBy('sort_order')
                ->limit(3)
                ->get(['id', 'name', 'slug', 'tagline', 'emoji', 'color_config', 'image_path'])
                ->map(fn($p) => [
                    'id'          => $p->id,
                    'name'        => $p->name,
                    'slug'        => $p->slug,
                    'tagline'     => $p->tagline,
                    'emoji'       => $p->emoji ?? '🧴',
                    'color_config'=> $p->color_config,
                    'image'       => $p->image_path ? asset('storage/' . $p->image_path) : null,
                ]),
        ]);
    }

    // ─── Helper: format product untuk React ─────────────────────────────────
    private function formatProduct(Product $p, bool $full = false): array
    {
        $cfg = $p->color_config ?? [];

        $base = [
            'id'          => $p->id,
            'name'        => $p->name,
            'slug'        => $p->slug,
            'tagline'     => $p->tagline,
            'description' => $p->description,
            'emoji'       => $p->emoji ?? '🧴',
            'image'       => $p->image_path ? asset('storage/' . $p->image_path) : null,
            'price_min'   => (float) ($p->price_min ?? 0),
            'price_max'   => (float) ($p->price_max ?? 0),
            'sizes'       => $p->sizes ?? [],
            'benefits'    => $p->benefits ?? [],
            'specs'       => $p->specs ?? [],
            'is_featured' => $p->is_featured,
            'color_config'=> [
                'bg'     => $cfg['bg']     ?? 'from-lime-50 to-green-50',
                'badge'  => $cfg['badge']  ?? 'bg-lime-100 text-lime-700',
                'card'   => $cfg['card']   ?? 'from-lime-200 to-green-200',
                'accent' => $cfg['accent'] ?? 'text-lime-600',
                'btn'    => $cfg['btn']    ?? 'from-lime-400 to-green-400',
                'ring'   => $cfg['ring']   ?? 'ring-lime-300',
                'blob1'  => $cfg['blob1']  ?? '#AADF28',
                'blob2'  => $cfg['blob2']  ?? '#00C896',
            ],
        ];

        // Field tambahan hanya untuk halaman detail
        if ($full) {
            $base['ingredients'] = $p->ingredients ?? null;
            $base['how_to_use']  = $p->how_to_use  ?? null;
        }

        return $base;
    }
}
