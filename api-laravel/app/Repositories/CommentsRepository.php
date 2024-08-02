<?php

namespace App\Repositories;

use App\Models\Comments;

class CommentsRepository
{
    protected $model;

    public function __construct(Comments $comments)
    {
        $this->model = $comments;
    }

    public function createComment($data)
    {
        return $this->model->create($data);
    }

    public function getCommentsByVideoId($videoId)
    {
        return $this->model->where('video_id', $videoId)->with('user')->get();
    }

    public function getCommentById($id)
    {
        return Comments::find($id);
    }

    public function deleteComment($id)
    {
        $comment = Comments::find($id);
        if ($comment) {
            $comment->delete();
        }
    }
}
