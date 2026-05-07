<?php

namespace App\Livewire\Admin\Messages;

use App\Models\ContactMessage;
use Livewire\Component;

class Show extends Component
{
    public ContactMessage $message;

    public function mount(int $id): void
    {
        $this->message = ContactMessage::findOrFail($id);
        if (!$this->message->is_read) {
            $this->message->update(['is_read' => true]);
        }
    }

    public function delete(): void
    {
        $this->message->delete();
        session()->flash('toast', ['type' => 'success', 'message' => 'Pesan berhasil dihapus.']);
        $this->redirect(route('admin.messages.index'), navigate: true);
    }

    public function render()
    {
        return view('admin.messages.show')
            ->layout('admin.layouts.app', ['title' => 'Detail Pesan']);
    }
}
