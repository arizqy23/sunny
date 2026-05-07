<?php

namespace App\Livewire\Admin\Articles;

use App\Models\Article;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public string $search    = '';
    public string $category  = '';
    public string $status    = '';
    public string $sortBy    = 'created_at';
    public string $sortDir   = 'desc';
    public ?int   $deleteId  = null;
    public bool   $showDeleteModal = false; // ← DIPERBAIKI: nama diubah dari confirmDelete

    protected $paginationTheme = 'tailwind';

    public function updatingSearch(): void   { $this->resetPage(); }
    public function updatingCategory(): void { $this->resetPage(); }
    public function updatingStatus(): void   { $this->resetPage(); }

    public function sort(string $col): void
    {
        $this->sortBy  = $col;
        $this->sortDir = ($this->sortBy === $col && $this->sortDir === 'asc') ? 'desc' : 'asc';
    }

    public function togglePublished(int $id): void
    {
        $a = Article::findOrFail($id);
        $a->update([
            'is_published' => !$a->is_published,
            'published_at' => !$a->is_published ? now() : $a->published_at,
        ]);
        session()->flash('toast', ['type' => 'success', 'message' => 'Status artikel diperbarui.']);
    }

    public function confirmDelete(int $id): void
    {
        $this->deleteId        = $id;
        $this->showDeleteModal = true; // ← DIPERBAIKI
    }

    public function delete(): void
    {
        if ($this->deleteId) {
            Article::findOrFail($this->deleteId)->delete();
            session()->flash('toast', ['type' => 'success', 'message' => 'Artikel berhasil dihapus.']);
        }
        $this->deleteId        = null;
        $this->showDeleteModal = false; // ← DIPERBAIKI
    }

    public function cancelDelete(): void
    {
        $this->deleteId        = null;
        $this->showDeleteModal = false; // ← DIPERBAIKI
    }

    public function render()
    {
        $categories = Article::distinct()->pluck('category')->filter()->sort()->values();

        $articles = Article::query()
            ->when($this->search, fn($q) => $q->where('title', 'like', "%{$this->search}%")
                ->orWhere('excerpt', 'like', "%{$this->search}%"))
            ->when($this->category, fn($q) => $q->where('category', $this->category))
            ->when($this->status === 'published',   fn($q) => $q->where('is_published', true))
            ->when($this->status === 'unpublished', fn($q) => $q->where('is_published', false))
            ->orderBy($this->sortBy, $this->sortDir)
            ->paginate(10);

        return view('admin.articles.index', compact('articles', 'categories'))
            ->layout('admin.layouts.app', ['title' => 'Manajemen Artikel']);
    }
}
