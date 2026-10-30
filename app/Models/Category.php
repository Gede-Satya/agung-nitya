<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'order_label',
        'short_title',
        'title',
        'subtitle',
        'description',
        'theme',
        'cover_image',
        'icon_svg',
        'sub_types_summary',
        'order_num',
        'is_active',
    ];

    protected $casts = [
        'sub_types_summary' => 'array',
        'is_active' => 'boolean',
        'order_num' => 'integer',
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class)->orderBy('order_num', 'asc');
    }
}
