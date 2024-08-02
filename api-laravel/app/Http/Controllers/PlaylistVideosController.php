<?php

namespace App\Http\Controllers;

use App\Models\PlaylistVideos;
use App\Repositories\PlaylistVideosRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PlaylistVideosController extends Controller
{
    protected $playlistVideosRepository;

    public function __construct(PlaylistVideosRepository $playlistVideosRepository)
    {
        $this->playlistVideosRepository = $playlistVideosRepository;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'videoId' => 'required|exists:videos,id',
            'playlists' => 'required|array',
            'playlists.*.id' => 'required|exists:playlists,id',
        ], [
            'playlists.*.id.exists' => 'The selected playlist does not exist.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $videoId = $request->input('videoId');
            $playlistsSelecteds = $request->input("playlists");

            $this->playlistVideosRepository->deletePlaylistVideosByVideoId($videoId);

            foreach ($playlistsSelecteds as $index => $playlistSelected) {
                $data = [
                    'playlist_id' => $playlistSelected['id'],
                    'video_id' => $videoId,
                ];
                $this->playlistVideosRepository->createPlaylistVideo($data);
            }

            return response()->json('Ok', 200);

        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 500);
        }
    }

    public function edit($id)
    {
        try {
            $playlistsVideos = $this->playlistVideosRepository->getPlaylistVideosByVideoId($id);

            return response()->json($playlistsVideos, 200);

        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 500);
        }
    }

    public function delete($playlistId, $videoId)
    {
        try {
            $this->playlistVideosRepository->deletePlaylistVideo($playlistId, $videoId);

            return response()->json(['message' => 'Video deleted from playlist successfully'], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
