<div class="max-w-2xl space-y-5">

    {{-- Header --}}
    <div class="flex items-center gap-3">
        <a href="{{ route('admin.messages.index') }}" wire:navigate
            class="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-white border border-slate-200 transition-all shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
        </a>
        <div>
            <h2 class="text-2xl font-bold text-slate-900">Detail Pesan</h2>
            <p class="text-slate-500 text-sm mt-0.5">{{ $message->created_at->format('d F Y, H:i') }} WIB</p>
        </div>
    </div>

    {{-- Message Card --}}
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        {{-- Sender info --}}
        <div class="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-lime-400 to-lime-500 flex items-center justify-center text-xl font-bold text-gray-900 flex-shrink-0">
                    {{ strtoupper(substr($message->name, 0, 1)) }}
                </div>
                <div class="flex-1">
                    <div class="flex items-center gap-2 flex-wrap">
                        <h3 class="font-bold text-slate-900 text-lg">{{ $message->name }}</h3>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                            {{ $message->is_read ? 'bg-slate-100 text-slate-500' : 'bg-lime-100 text-lime-700' }}">
                            {{ $message->is_read ? '✓ Sudah dibaca' : '● Baru' }}
                        </span>
                    </div>
                    <p class="text-slate-500 text-sm mt-0.5 flex items-center gap-2 flex-wrap">
                        <span>✉️ {{ $message->email }}</span>
                        @if($message->phone)
                        <span class="text-slate-300">·</span>
                        <span>📞 {{ $message->phone }}</span>
                        @endif
                    </p>
                </div>
            </div>
        </div>

        {{-- Topic & Message --}}
        <div class="px-6 py-5">
            <div class="mb-4">
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Topik</p>
                <p class="font-bold text-slate-900 text-base">{{ $message->topic }}</p>
            </div>

            <div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Pesan</p>
                <div class="bg-slate-50 rounded-2xl p-5 text-slate-700 text-sm leading-relaxed border border-slate-100 whitespace-pre-wrap">{{ $message->message }}</div>
            </div>
        </div>

        {{-- Meta --}}
        <div class="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
            <div class="flex flex-wrap gap-4 text-xs text-slate-400">
                <span>🕐 {{ $message->created_at->format('d M Y H:i') }} WIB</span>
                @if($message->ip_address)
                <span>🌐 IP: {{ $message->ip_address }}</span>
                @endif
            </div>
        </div>
    </div>

    {{-- Actions --}}
    <div class="flex flex-wrap gap-3">
        <a href="mailto:{{ $message->email }}?subject=Re: {{ $message->topic }}"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-lime-500 to-lime-400 text-gray-900 font-bold text-sm rounded-xl shadow-sm hover:shadow-lime-500/30 hover:-translate-y-0.5 transition-all duration-200">
            ✉️ Balas via Email
        </a>
        @if($message->phone)
        <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $message->phone) }}?text=Halo+{{ urlencode($message->name) }}%2C+terima+kasih+telah+menghubungi+Sunny"
            target="_blank"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white font-bold text-sm rounded-xl hover:bg-[#22c55e] transition-colors shadow-sm">
            💬 WhatsApp
        </a>
        @endif
        <button wire:click="delete"
            wire:confirm="Yakin ingin menghapus pesan ini?"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-red-200 text-red-600 font-semibold text-sm rounded-xl hover:bg-red-50 transition-colors shadow-sm ml-auto">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Hapus Pesan
        </button>
    </div>
</div>
