<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVideoRequest;
use App\Models\Video;
use App\Repositories\VideoRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class VideoController extends Controller
{
    protected $videoRepository;

    public function __construct(VideoRepository $videoRepository)
    {
        $this->videoRepository = $videoRepository;
    }

    public function edit($id)
    {
        try {
            $video = $this->videoRepository->findVideoById($id);
            return response()->json($video, 200);
        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 500);
        }
    }

    public function store(StoreVideoRequest $request)
    {
        $validator = $request->validated();

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $data = [
                "title" => $request->input('title'),
                "user_id" => Auth::id(),
                "category_id" => $request->input('category'),
            ];
            $video = $this->videoRepository->createVideo($data);

            if ($request->hasFile('media')) {
                $path = $request->file('media')->store("public/videos/{$video->user_id}", [
                    'disk' => 's3',
                    'visibility' => 'public',
                    'acl' => 'public-read'
                ]);
                $this->videoRepository->storeVideoPath($video, $path);
            }

            if ($request->hasFile('thumbnail')) {
                $path = $request->file('thumbnail')->store("public/thumbnails/{$video->user_id}", [
                    'disk' => 's3',
                    'visibility' => 'public',
                    'acl' => 'public-read'
                ]);
                $this->videoRepository->storeThumbnailPath($video, $path);
            }

            return response()->json(['message' => 'Video created successfully', 'video' => $video], 200);

        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 500);
        }
    }

    public function all(Request $request)
    {
        try {
            $page = $request->input('page', 1);
            $category = json_decode($request->input('category', null));
            $videos = $this->videoRepository->getAllVideos($category, $page);
            $data = [];
            foreach ($videos as $video) {
                $thumbPath = storage_path("app/" . $video->thumb_path);
                if (empty($video->thumb_path)) {
                    $thumbPath = storage_path("app/public/default_thumb.png");
                }
                if (!File::exists($thumbPath)) {
                    continue;
                }
                $data[] = [
                    'id' => $video->id,
                    'title' => $video->title,
                    'user' => $video->user,
                    'thumbnail' => base64_encode(File::get($thumbPath)),
                ];
            }

            return response()->json($data, 200);

        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 500);
        }
    }

    public function allFromPlaylist(Request $request, $id)
    {
        try {
            $page = $request->input('page', 1);
            $category = json_decode($request->input('category', null));
            $videos = $this->videoRepository->getVideosFromPlaylist($id, Auth::id(), $page, $category);
            $data = []; 
            foreach ($videos as $video) {
                $thumbPath = storage_path("app/" . $video->thumb_path);
                if (empty($video->thumb_path)) {
                    $thumbPath = storage_path("app/public/default_thumb.png");
                }
                if (!File::exists($thumbPath)) {
                    continue;
                }
                $data[] = [
                    'id' => $video->video_id,
                    'title' => $video->title,
                    'user' => $video->user,
                    'thumbnail' => base64_encode(File::get($thumbPath)),
                ];
            }

            return response()->json($data, 200);

        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 500);
        }
    }
}
