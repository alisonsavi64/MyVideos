<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use App\Repositories\PlaylistRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PlaylistController extends Controller
{
    protected $playlistRepository;

    public function __construct(PlaylistRepository $playlistRepository)
    {
        $this->playlistRepository = $playlistRepository;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $data = [
                "description" => $request->input('description'),
                "user_id" => Auth::id(),
            ];
            $playlist = $this->playlistRepository->createPlaylist($data);

            return response()->json($playlist, 200);

        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 500);
        }
    }

    public function all(Request $request)
    {
        try {
            $playlists = $this->playlistRepository->getUserPlaylists();

            return response()->json($playlists, 200);

        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 500);
        }
    }

    public function edit($id)
    {
        try {
            $playlist = $this->playlistRepository->findPlaylistById($id);

            return response()->json($playlist, 200);

        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 500);
        }
    }

    public function delete($id)
    {
        try {
            $this->playlistRepository->deletePlaylist($id);

            return response()->json('OK', 200);

        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 500);
        }
    }
}
