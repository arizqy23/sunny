<div class="space-y-5">

    {{-- Header --}}
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
            <div class="flex items-center gap-3">
                <h2 class="text-2xl font-bold text-slate-900">Pesan Masuk</h2>
                @if($unreadCount > 0)
                <span class="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {{ $unreadCount }} baru
                </span>
                @endif
            </div>
            <p class="text-slate-500 text-sm mt-0.5">Pesan dari form kontak website</p>
        </div>
        @if($unreadCount > 0)
        <button wire:click="markAllRead"
            class="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            ✅ Tandai Semua Dibaca
        </button>
        @endif
    </div>

    {{-- Filters --}}
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
                <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input wire:model.live.debounce.350ms="search" type="text"
                    placeholder="Cari nama, email, atau topik..."
                    class="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 transition-all">
            </div>
            <select wire:model.live="status"
                class="px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500 bg-white">
                <option value="">Semua Pesan</option>
                <option value="unread">Belum Dibaca</option>
                <option value="read">Sudah Dibaca</option>
            </select>
        </div>
    </div>

    {{-- Messages list --}}
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="divide-y divide-slate-50">
            @forelse($messages as $msg)
            <div class="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors {{ !$msg->is_read ? 'bg-lime-50/30' : '' }}">
                {{-- Avatar --}}
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-lime-500 flex items-center justify-center text-sm font-bold text-gray-900 flex-shrink-0 mt-0.5">
                    {{ strtoupper(substr($msg->name, 0, 1)) }}
                </div>

                {{-- Content --}}
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-3">
                        <div class="min-w-0">
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="font-bold text-slate-900 text-sm">{{ $msg->name }}</span>
                                @if(!$msg->is_read)
                                <span class="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                                <span class="text-[10px] font-bold text-red-500 uppercase tracking-wide">Baru</span>
                                @endif
                            </div>
                            <p class="text-slate-500 text-xs mt-0.5">{{ $msg->email }}
                                @if($msg->phone) · {{ $msg->phone }} @endif
                            </p>
                            <p class="text-slate-700 text-sm font-semibold mt-1">{{ $msg->topic }}</p>
                            <p class="text-slate-500 text-xs mt-0.5 line-clamp-1">{{ $msg->message }}</p>
                        </div>
                        <div class="flex items-center gap-1 flex-shrink-0">
                            <span class="text-slate-400 text-xs whitespace-nowrap">{{ $msg->created_at->diffForHumans() }}</span>
                        </div>
                    </div>
                </div>

                {{-- Actions --}}
                <div class="flex items-center gap-1 flex-shrink-0">
                    <a href="{{ route('admin.messages.show', $msg->id) }}" wire:navigate
                        class="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-all" title="Baca pesan">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                    </a>
                    @if(!$msg->is_read)
                    <button wire:click="markRead({{ $msg->id }})"
                        class="p-2 rounded-xl text-slate-400 hover:text-lime-600 hover:bg-lime-50 transition-all" title="Tandai dibaca">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                    </button>
                    @endif
                    <button wire:click="confirmDelete({{ $msg->id }})"
                        class="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all" title="Hapus">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </div>
            @empty
            <div class="px-6 py-16 text-center">
                <div class="text-4xl mb-3">📭</div>
                <p class="text-slate-500 font-medium">Tidak ada pesan ditemukan</p>
                <p class="text-slate-400 text-sm mt-1">
                    {{ $status === 'unread' ? 'Semua pesan sudah dibaca!' : 'Belum ada pesan masuk.' }}
                </p>
            </div>
            @endforelse
        </div>
        @if($messages->hasPages())
        <div class="px-6 py-4 border-t border-slate-100">
            {{ $messages->links('admin.components.pagination') }}
        </div>
        @endif
    </div>

    {{-- Confirm Delete Modal --}}
    @if($confirmDelete)
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" wire:click="cancelDelete"></div>
        <div class="relative bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🗑️</div>
            <h3 class="font-bold text-slate-900 text-lg mb-2">Hapus Pesan?</h3>
            <p class="text-slate-500 text-sm mb-6">Pesan ini akan dihapus permanen.</p>
            <div class="flex gap-3">
                <button wire:click="cancelDelete" class="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-50 transition-colors">Batal</button>
                <button wire:click="delete" class="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold text-sm rounded-xl hover:bg-red-700 transition-colors">Hapus</button>
            </div>
        </div>
    </div>
    @endif
</div>
