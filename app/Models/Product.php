<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'brand',
        'sku',
        'price',
        'tkdn_percent',
        'specs',
        'image_url',
        'inaproc_url',
        'order_num',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'tkdn_percent' => 'decimal:2',
        'is_active' => 'boolean',
        'order_num' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
