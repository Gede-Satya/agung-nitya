<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'agency_name',
        'email',
        'phone',
        'service_needed',
        'message',
        'status',
        'admin_notes',
    ];
}
