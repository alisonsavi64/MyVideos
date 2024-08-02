<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use App\Repositories\CommentsRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentsController extends Controller
{
    protected $commentsRepository;

    public function __construct(CommentsRepository $commentsRepository)
    {
        $this->commentsRepository = $commentsRepository;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required|string|max:255',
            'videoId' => 'required|exists:videos,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $data = [
                'description' => $request->input('description'),
                'user_id' => Auth::id(),
                'video_id' => $request->input('videoId')
            ];
            $comment = $this->commentsRepository->createComment($data);

            return response()->json($comment, 200);
        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 500);
        }
    }

    public function all($id)
    {
        try {
            $comments = $this->commentsRepository->getCommentsByVideoId($id);
            return response()->json($comments, 200);
        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 500);
        }
    }

    public function delete($id)
    {
        try {
            $comment = $this->commentsRepository->getCommentById($id);
            if (!$comment) {
                return response()->json(['Error' => 'Comment not found.'], 404);
            }

            $this->commentsRepository->deleteComment($id);

            return response()->json(['Success' => 'Comment deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 500);
        }
    }
}
