<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Repositories\VideoRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class VideoController extends Controller
{
    protected $videoRepository;

    public function __construct(VideoRepository $videoRepository)
    {
        $this->videoRepository = $videoRepository;
    }

    public function play($id)
    {
        $video = $this->videoRepository->findVideoById($id);

        $path = storage_path("app/" . $video->video_path);
        if (!File::exists($path)) {
            abort(404);
        }

        $headers = [
            'Content-Type' => 'video/mp4',
            'Content-Length' => filesize($path),
            'Content-Disposition' => 'inline; filename="' . $path . '"',
            'Accept-Ranges' => 'bytes',
        ];

        return response()->stream(function () use ($path) {
            $stream = fopen($path, 'r');
            fpassthru($stream);
            fclose($stream);
        }, 200, $headers);
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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|exists:categories,id',
            'media' => 'required|file|mimes:mp4,mov,avi',
            'thumbnail' => 'image|mimes:jpeg,png,jpg,gif',
        ], [
            'category.exists' => 'The selected category does not exist.',
            'media.max' => 'The media file may not be greater than :max kilobytes.',
            'thumbnail.max' => 'The thumbnail may not be greater than :max kilobytes.',
        ]);

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
                $this->videoRepository->storeVideoMedia($video, $request->file('media'));
            }

            if ($request->hasFile('thumbnail')) {
                $this->videoRepository->storeVideoThumbnail($video, $request->file('thumbnail'));
            } else {
                $defaultThumbnailPath = $this->videoRepository->getDefaultThumbnailPath();
                if (file_exists($defaultThumbnailPath)) {
                    $fileNameToStore = $video->id . '.png';
                    $path = Storage::putFileAs("public/thumbnails/{$video->user_id}", $defaultThumbnailPath, $fileNameToStore);
                    $video->thumb_path = $path;
                    $video->save();
                }
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
