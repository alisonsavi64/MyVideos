<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    protected $model;

    public function __construct(User $user)
    {
        $this->model = $user;
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function update($user, array $data)
    {
        $user->update($data);
        return $user->fresh();
    }

    public function delete($user)
    {
        return $user->delete();
    }
}
