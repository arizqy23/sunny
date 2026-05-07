@if ($paginator->hasPages())
<nav class="flex items-center justify-between">
    <p class="text-sm text-slate-500">
        Menampilkan <span class="font-semibold text-slate-900">{{ $paginator->firstItem() }}</span>–<span class="font-semibold text-slate-900">{{ $paginator->lastItem() }}</span>
        dari <span class="font-semibold text-slate-900">{{ $paginator->total() }}</span> data
    </p>
    <div class="flex items-center gap-1">
        {{-- Previous --}}
        @if ($paginator->onFirstPage())
            <span class="px-3 py-1.5 text-sm text-slate-300 border border-slate-100 rounded-lg cursor-not-allowed">←</span>
        @else
            <button wire:click="previousPage" class="px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">←</button>
        @endif

        {{-- Page numbers --}}
        @foreach ($elements as $element)
            @if (is_string($element))
                <span class="px-3 py-1.5 text-sm text-slate-400">…</span>
            @endif
            @if (is_array($element))
                @foreach ($element as $page => $url)
                    @if ($page == $paginator->currentPage())
                        <span class="px-3 py-1.5 text-sm font-bold bg-lime-500 text-white rounded-lg">{{ $page }}</span>
                    @else
                        <button wire:click="gotoPage({{ $page }})" class="px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">{{ $page }}</button>
                    @endif
                @endforeach
            @endif
        @endforeach

        {{-- Next --}}
        @if ($paginator->hasMorePages())
            <button wire:click="nextPage" class="px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">→</button>
        @else
            <span class="px-3 py-1.5 text-sm text-slate-300 border border-slate-100 rounded-lg cursor-not-allowed">→</span>
        @endif
    </div>
</nav>
@endif
