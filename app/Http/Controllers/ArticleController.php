<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Articles/Index', [
            'articles' => Article::published()
                ->latest('published_at')
                ->get([
                    'id', 'title', 'slug', 'excerpt', 'category',
                    'emoji', 'color', 'image',               // ← image disertakan
                    'read_time', 'is_featured', 'published_at',
                ])
                ->map(fn ($a) => array_merge($a->toArray(), [
                    'date'     => $a->published_at?->format('d M Y') ?? '',
                    'featured' => $a->is_featured,
                ])),
        ]);
    }

    public function show(string $slug): Response
    {
        $article = Article::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $article->increment('views');

        return Inertia::render('Articles/Show', [
            'article' => $article,
            'related' => Article::published()
                ->where('id', '!=', $article->id)
                ->where('category', $article->category)
                ->limit(3)
                ->get([
                    'id', 'title', 'slug', 'emoji', 'color', 'image', // ← image & color disertakan
                    'read_time', 'published_at',
                ]),
        ]);
    }
}
