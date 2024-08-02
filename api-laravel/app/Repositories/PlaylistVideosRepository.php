<?php

namespace App\Repositories;

use App\Models\PlaylistVideos;
use Illuminate\Support\Facades\Auth;

class PlaylistVideosRepository
{
    protected $model;

    public function __construct(PlaylistVideos $playlistVideos)
    {
        $this->model = $playlistVideos;
    }

    public function createPlaylistVideo($data)
    {
        return $this->model->create($data);
    }

    public function getPlaylistVideosByVideoId($videoId)
    {
        return $this->model->join('playlists', 'playlist_videos.playlist_id', '=', 'playlists.id')
            ->where('playlist_videos.video_id', $videoId)
            ->where('playlists.user_id', Auth::id())
            ->get();
    }

    public function deletePlaylistVideo($playlistId, $videoId)
    {
        return $this->model->where('playlist_id', $playlistId)
            ->where('video_id', $videoId)
            ->whereExists(function ($query) {
                $query->selectRaw(1)
                    ->from('playlists')
                    ->whereColumn('playlists.id', 'playlist_videos.playlist_id')
                    ->where('playlists.user_id', '=', Auth::id());
            })
            ->delete();
    }

    public function deletePlaylistVideosByVideoId($videoId)
    {
        $playlistVideoIds = $this->model->join('playlists', 'playlist_videos.playlist_id', '=', 'playlists.id')
            ->where('playlist_videos.video_id', $videoId)
            ->where('playlists.user_id', Auth::id())
            ->pluck('playlist_videos.id')
            ->toArray();

        return $this->model->whereIn('id', $playlistVideoIds)->delete();
    }
}
