<?php

namespace App\Livewire\Admin\Messages;

use App\Models\ContactMessage;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public string $search  = '';
    public string $status  = '';
    public string $sortBy  = 'created_at';
    public string $sortDir = 'desc';
    public ?int   $deleteId = null;
    public bool   $confirmDelete = false;

    protected $paginationTheme = 'tailwind';

    public function updatingSearch(): void { $this->resetPage(); }
    public function updatingStatus(): void { $this->resetPage(); }

    public function markRead(int $id): void
    {
        ContactMessage::findOrFail($id)->update(['is_read' => true]);
    }

    public function markAllRead(): void
    {
        ContactMessage::where('is_read', false)->update(['is_read' => true]);
        session()->flash('toast', ['type' => 'success', 'message' => 'Semua pesan ditandai sudah dibaca.']);
    }

    public function confirmDelete(int $id): void
    {
        $this->deleteId      = $id;
        $this->confirmDelete = true;
    }

    public function delete(): void
    {
        if ($this->deleteId) {
            ContactMessage::findOrFail($this->deleteId)->delete();
            session()->flash('toast', ['type' => 'success', 'message' => 'Pesan berhasil dihapus.']);
        }
        $this->deleteId      = null;
        $this->confirmDelete = false;
    }

    public function cancelDelete(): void
    {
        $this->deleteId      = null;
        $this->confirmDelete = false;
    }

    public function render()
    {
        $messages = ContactMessage::query()
            ->when($this->search, fn($q) => $q->where('name', 'like', "%{$this->search}%")
                ->orWhere('email', 'like', "%{$this->search}%")
                ->orWhere('topic', 'like', "%{$this->search}%"))
            ->when($this->status === 'unread', fn($q) => $q->where('is_read', false))
            ->when($this->status === 'read',   fn($q) => $q->where('is_read', true))
            ->orderBy($this->sortBy, $this->sortDir)
            ->paginate(15);

        $unreadCount = ContactMessage::where('is_read', false)->count();

        return view('admin.messages.index', compact('messages', 'unreadCount'))
            ->layout('admin.layouts.app', ['title' => 'Pesan Masuk']);
    }
}
