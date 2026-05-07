<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'phone', 'topic', 'message',
        'is_read', 'ip_address', 'user_agent',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];
}
