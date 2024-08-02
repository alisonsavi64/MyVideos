<?php

namespace App\Repositories;

use App\Models\Video;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class VideoRepository
{
    protected $model;

    public function __construct(Video $video)
    {
        $this->model = $video;
    }

    public function createVideo($data)
    {
        return $this->model->create($data);
    }

    public function findVideoById($id)
    {
        return $this->model->findOrFail($id);
    }

    public function getAllVideos($category = null, $page = 1)
    {
        $query = $this->model->newQuery();
    
        if (!empty($category)) {
            $query->where('category_id', $category);
        }

        return $query->limit($page * 8)->get();
    }

    public function getVideosFromPlaylist($playlistId, $userId, $page = 1, $category = null)
    {
        $query = $this->model->join('playlist_videos', 'playlist_videos.video_id', '=', 'videos.id')
            ->join('playlists', 'playlists.id', '=', 'playlist_videos.playlist_id')
            ->where('playlists.id', $playlistId)
            ->where('playlists.user_id', $userId);
        
        if ($category) {
            $query->where('videos.category_id', $category);
        }
        
        return $query->limit($page * 8)->get();
    }
    
    public function storeVideoMedia($video, $mediaFile)
    {
        $extension = $mediaFile->getClientOriginalExtension();
        $fileNameToStore = $video->id . '.' . $extension;
        $path = $mediaFile->storeAs("public/videos/{$video->user_id}", $fileNameToStore);
        $video->video_path = $path;
        $video->save();
    }

    public function storeVideoThumbnail($video, $thumbnailFile)
    {
        $extension = $thumbnailFile->getClientOriginalExtension();
        $fileNameToStore = $video->id . '.' . $extension;
        $path = $thumbnailFile->storeAs("public/thumbnails/{$video->user_id}", $fileNameToStore);
        $video->thumb_path = $path;
        $video->save();
    }

    public function getDefaultThumbnailPath()
    {
        return public_path('default_thumb.png');
    }
}
