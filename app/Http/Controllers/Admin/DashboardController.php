<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Article;
use App\Models\ContactMessage;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'products'         => Product::count(),
            'products_active'  => Product::where('is_active', true)->count(),
            'articles'         => Article::count(),
            'articles_published' => Article::where('is_published', true)->count(),
            'messages'         => ContactMessage::count(),
            'messages_unread'  => ContactMessage::where('is_read', false)->count(),
            'total_views'      => Article::sum('views'),
        ];

        $recent_messages = ContactMessage::latest()
            ->limit(5)
            ->get(['id', 'name', 'email', 'topic', 'is_read', 'created_at']);

        $recent_articles = Article::latest('published_at')
            ->limit(5)
            ->get(['id', 'title', 'category', 'is_published', 'views', 'published_at']);

        return view('admin.dashboard.index', compact('stats', 'recent_messages', 'recent_articles'));
    }
}
