<?php

namespace App\Repositories;

use App\Models\Playlist;
use Illuminate\Support\Facades\Auth;

class PlaylistRepository
{
    protected $model;

    public function __construct(Playlist $playlist)
    {
        $this->model = $playlist;
    }

    public function createPlaylist($data)
    {
        return $this->model->create($data);
    }

    public function getUserPlaylists()
    {
        return $this->model->where('user_id', Auth::id())->get();
    }

    public function findPlaylistById($id)
    {
        return $this->model->findOrFail($id);
    }

    public function deletePlaylist($id)
    {
        return $this->model->where('id', $id)->delete();
    }
}
