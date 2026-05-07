<!DOCTYPE html>
<html lang="id" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $title ?? 'Dashboard' }} — Sunny Admin</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/admin.css'])
    @livewireStyles
</head>
<body class="h-full bg-slate-50 font-jakarta antialiased"
    x-data="{ sidebarOpen: false }"
    @keydown.escape.window="sidebarOpen = false">

{{-- SIDEBAR --}}
<aside class="fixed inset-y-0 left-0 z-50 w-64 bg-gray-950 flex flex-col transition-transform duration-300 ease-out"
    :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'">

    <div class="h-16 flex items-center px-6 border-b border-white/[0.06] flex-shrink-0">
        <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-yellow-400 to-lime-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <span class="text-sm leading-none">☀️</span>
            </div>
            <div>
                <p class="text-white font-bold text-sm leading-none">Sunny</p>
                <p class="text-gray-500 text-[10px] leading-none mt-0.5 font-medium tracking-widest uppercase">Admin Panel</p>
            </div>
        </a>
    </div>

    <nav class="flex-1 overflow-y-auto py-5 px-3 space-y-0.5">
        <p class="text-gray-600 text-[10px] font-semibold tracking-[0.15em] uppercase px-3 mb-3">Menu Utama</p>
        @php
            $navItems = [
                ['route' => 'admin.dashboard',      'icon' => '▦',  'label' => 'Dashboard',   'match' => 'admin.dashboard'],
                ['route' => 'admin.products.index', 'icon' => '🧴', 'label' => 'Produk',       'match' => 'admin.products.*'],
                ['route' => 'admin.articles.index', 'icon' => '📝', 'label' => 'Artikel',      'match' => 'admin.articles.*'],
                ['route' => 'admin.messages.index', 'icon' => '💬', 'label' => 'Pesan Masuk',  'match' => 'admin.messages.*'],
            ];
            $unreadMessages = \App\Models\ContactMessage::where('is_read', false)->count();
        @endphp
        @foreach($navItems as $item)
        @php $isActive = request()->routeIs($item['match']); @endphp
        <a href="{{ route($item['route']) }}"
            class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 {{ $isActive ? 'bg-lime-500/20 text-lime-400' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]' }}">
            <span class="w-5 text-center flex-shrink-0 leading-none">{{ $item['icon'] }}</span>
            <span class="flex-1">{{ $item['label'] }}</span>
            @if($item['route'] === 'admin.messages.index' && $unreadMessages > 0)
                <span class="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">{{ $unreadMessages > 99 ? '99+' : $unreadMessages }}</span>
            @elseif($isActive)
                <span class="w-1.5 h-1.5 rounded-full bg-lime-400 flex-shrink-0"></span>
            @endif
        </a>
        @endforeach

        <div class="pt-4 mt-4 border-t border-white/[0.06]">
            <p class="text-gray-600 text-[10px] font-semibold tracking-[0.15em] uppercase px-3 mb-3">Lainnya</p>
            <a href="{{ route('home') }}" target="_blank"
                class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all">
                <span class="w-5 text-center leading-none">🌐</span>
                <span class="flex-1">Lihat Website</span>
                <svg class="w-3 h-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
            </a>
        </div>
    </nav>

    <div class="flex-shrink-0 p-3 border-t border-white/[0.06]">
        <div class="flex items-center gap-3 px-3 py-2.5 rounded-xl">
            <img src="{{ auth('admin')->user()->avatar_url }}" alt="{{ auth('admin')->user()->name }}"
                class="w-8 h-8 rounded-lg object-cover flex-shrink-0">
            <div class="flex-1 min-w-0">
                <p class="text-white text-sm font-semibold truncate leading-none">{{ auth('admin')->user()->name }}</p>
                <p class="text-gray-500 text-xs truncate mt-0.5 capitalize">{{ auth('admin')->user()->role }}</p>
            </div>
            <form method="POST" action="{{ route('admin.logout') }}">
                @csrf
                <button type="submit" title="Logout" class="text-gray-600 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-white/5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                </button>
            </form>
        </div>
    </div>
</aside>

{{-- BACKDROP mobile --}}
<div x-show="sidebarOpen"
    x-transition:enter="transition-opacity duration-200" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
    x-transition:leave="transition-opacity duration-200" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0"
    @click="sidebarOpen = false"
    class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
    style="display:none">
</div>

{{-- MAIN --}}
<div class="lg:pl-64 flex flex-col min-h-full">
    <header class="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 flex items-center px-4 sm:px-6 gap-4">
        <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
        </button>
        <div class="flex-1">
            <h1 class="text-slate-900 font-bold text-base">{{ $title ?? 'Dashboard' }}</h1>
        </div>
        <div class="flex items-center gap-2">
            @php $unreadCount = \App\Models\ContactMessage::where('is_read', false)->count(); @endphp
            <a href="{{ route('admin.messages.index') }}" class="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                @if($unreadCount > 0)
                <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                @endif
            </a>
            <div class="flex items-center gap-2 pl-2 border-l border-slate-200">
                <img src="{{ auth('admin')->user()->avatar_url }}" alt="{{ auth('admin')->user()->name }}" class="w-8 h-8 rounded-lg object-cover">
                <span class="hidden sm:block text-sm font-semibold text-slate-700">{{ auth('admin')->user()->name }}</span>
            </div>
        </div>
    </header>

    <main class="flex-1 p-4 sm:p-6 lg:p-8">
        @if(session('toast'))
        <div x-data="{ show: true }"
            x-init="setTimeout(() => show = false, 3500)"
            x-show="show"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 translate-y-3 scale-95"
            x-transition:enter-end="opacity-100 translate-y-0 scale-100"
            x-transition:leave="transition ease-in duration-200"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"
            class="fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border {{ session('toast.type') === 'success' ? 'bg-gray-900 text-white border-white/10' : 'bg-red-600 text-white border-red-500' }}"
            style="display:none">
            <span class="text-base leading-none">{{ session('toast.type') === 'success' ? '✅' : '❌' }}</span>
            <p class="text-sm font-medium">{{ session('toast.message') }}</p>
            <button @click="show = false" class="ml-1 opacity-60 hover:opacity-100 transition-opacity">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
        @endif

        {{ $slot }}
    </main>
</div>

@livewireScripts
{{-- Livewire 3 sudah otomatis bundle Alpine.js — jangan tambah CDN Alpine lagi --}}
</body>
</html>
