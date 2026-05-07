<div class="space-y-6">

    {{-- Welcome --}}
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
            <h2 class="text-2xl font-bold text-slate-900">
                Selamat datang, {{ auth('admin')->user()->name }}! 👋
            </h2>
            <p class="text-slate-500 text-sm mt-0.5">{{ now()->translatedFormat('l, d F Y') }}</p>
        </div>
        <a href="{{ route('home') }}" target="_blank"
            class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <span>🌐</span> Lihat Website
        </a>
    </div>

    {{-- Stats Grid --}}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        @php
        $cards = [
            ['label' => 'Total Produk',   'value' => $stats['products'],                  'sub' => $stats['products_active'].' aktif',       'icon' => '🧴', 'color' => 'lime',   'href' => route('admin.products.index')],
            ['label' => 'Total Artikel',  'value' => $stats['articles'],                  'sub' => $stats['articles_published'].' published', 'icon' => '📝', 'color' => 'blue',   'href' => route('admin.articles.index')],
            ['label' => 'Pesan Masuk',    'value' => $stats['messages'],                  'sub' => $stats['messages_unread'].' belum dibaca', 'icon' => '💬', 'color' => $stats['messages_unread'] > 0 ? 'red' : 'slate', 'href' => route('admin.messages.index')],
            ['label' => 'Total Views',    'value' => number_format($stats['total_views']), 'sub' => 'semua artikel',                          'icon' => '👁', 'color' => 'purple', 'href' => route('admin.articles.index')],
        ];
        $colorMap = [
            'lime'   => 'bg-lime-50 text-lime-700 ring-lime-200',
            'blue'   => 'bg-blue-50 text-blue-700 ring-blue-200',
            'red'    => 'bg-red-50 text-red-700 ring-red-200',
            'purple' => 'bg-purple-50 text-purple-700 ring-purple-200',
            'slate'  => 'bg-slate-50 text-slate-600 ring-slate-200',
        ];
        @endphp

        @foreach($cards as $card)
        <a href="{{ $card['href'] }}" wire:navigate
            class="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div class="flex items-start justify-between mb-4">
                <div class="w-11 h-11 rounded-xl {{ $colorMap[$card['color']] }} ring-1 flex items-center justify-center text-xl">
                    {{ $card['icon'] }}
                </div>
                <svg class="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </div>
            <p class="text-3xl font-bold text-slate-900">{{ $card['value'] }}</p>
            <p class="text-slate-500 text-xs font-medium mt-0.5">{{ $card['label'] }}</p>
            <p class="text-slate-400 text-[11px] mt-1">{{ $card['sub'] }}</p>
        </a>
        @endforeach
    </div>

    {{-- Two column section --}}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {{-- Recent Messages --}}
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div class="flex items-center gap-2">
                    <span class="text-base">💬</span>
                    <h3 class="font-bold text-slate-900 text-sm">Pesan Terbaru</h3>
                    @if($stats['messages_unread'] > 0)
                    <span class="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {{ $stats['messages_unread'] }}
                    </span>
                    @endif
                </div>
                <a href="{{ route('admin.messages.index') }}" wire:navigate class="text-lime-600 text-xs font-semibold hover:text-lime-700">Lihat semua →</a>
            </div>
            <div class="divide-y divide-slate-50">
                @forelse($recent_messages as $msg)
                <a href="{{ route('admin.messages.show', $msg->id) }}" wire:navigate
                    class="flex items-start gap-3 px-6 py-3.5 hover:bg-slate-50 transition-colors">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-lime-400 to-lime-500 flex items-center justify-center text-xs font-bold text-gray-900 flex-shrink-0 mt-0.5">
                        {{ strtoupper(substr($msg->name, 0, 1)) }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                            <p class="text-slate-900 text-sm font-semibold truncate">{{ $msg->name }}</p>
                            @if(!$msg->is_read)
                            <span class="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                            @endif
                        </div>
                        <p class="text-slate-500 text-xs truncate">{{ $msg->topic }}</p>
                    </div>
                    <span class="text-slate-400 text-[11px] flex-shrink-0">{{ $msg->created_at->diffForHumans(null, true) }}</span>
                </a>
                @empty
                <div class="px-6 py-8 text-center text-slate-400 text-sm">Belum ada pesan</div>
                @endforelse
            </div>
        </div>

        {{-- Recent Articles --}}
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div class="flex items-center gap-2">
                    <span class="text-base">📝</span>
                    <h3 class="font-bold text-slate-900 text-sm">Artikel Terbaru</h3>
                </div>
                <a href="{{ route('admin.articles.create') }}" wire:navigate class="text-lime-600 text-xs font-semibold hover:text-lime-700">+ Tulis baru →</a>
            </div>
            <div class="divide-y divide-slate-50">
                @forelse($recent_articles as $art)
                <a href="{{ route('admin.articles.edit', $art->id) }}" wire:navigate
                    class="flex items-center gap-3 px-6 py-3.5 hover:bg-slate-50 transition-colors">
                    <div class="flex-1 min-w-0">
                        <p class="text-slate-900 text-sm font-semibold truncate">{{ $art->title }}</p>
                        <div class="flex items-center gap-2 mt-0.5">
                            <span class="text-slate-400 text-xs">{{ $art->category }}</span>
                            <span class="text-slate-200">•</span>
                            <span class="text-slate-400 text-xs">{{ number_format($art->views) }} views</span>
                        </div>
                    </div>
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0
                        {{ $art->is_published ? 'bg-lime-100 text-lime-700' : 'bg-slate-100 text-slate-500' }}">
                        {{ $art->is_published ? 'Published' : 'Draft' }}
                    </span>
                </a>
                @empty
                <div class="px-6 py-8 text-center text-slate-400 text-sm">Belum ada artikel</div>
                @endforelse
            </div>
        </div>
    </div>

    {{-- Quick Actions --}}
    <div class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-white/[0.06]">
        <h3 class="text-white font-bold text-sm mb-4">⚡ Aksi Cepat</h3>
        <div class="flex flex-wrap gap-3">
            <a href="{{ route('admin.products.create') }}" wire:navigate
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-lime-500 hover:bg-lime-400 text-gray-900 font-bold text-sm rounded-xl transition-colors">
                🧴 Tambah Produk
            </a>
            <a href="{{ route('admin.articles.create') }}" wire:navigate
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl transition-colors">
                📝 Tulis Artikel
            </a>
            <a href="{{ route('admin.messages.index') }}" wire:navigate
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl transition-colors">
                💬 Cek Pesan
                @if($stats['messages_unread'] > 0)
                <span class="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{{ $stats['messages_unread'] }}</span>
                @endif
            </a>
        </div>
    </div>

</div>
