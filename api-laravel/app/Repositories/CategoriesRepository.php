<?php

namespace App\Repositories;

use App\Models\Category;

class CategoriesRepository
{
    protected $model;

    public function __construct(Category $category)
    {
        $this->model = $category;
    }

    public function all()
    {
        return $this->model->all();
    }
}
