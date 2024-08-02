<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaylistVideos extends Model
{
    use HasFactory;

    protected $fillable = [
        'playlist_id', 'video_id'
    ];

    public function video()
    {
        return $this->belongsTo(Video::class);
    }

    public function playlist()
    {
        return $this->belongsTo(Playlist::class);
    }
}
