<?php

namespace App\Interfaces;

interface MovieRepositoryInterface
{
    public function all();
    public function findById( int $id);
    public function destroy(int $id);
    public function handleUploadImage(object $file);
}
