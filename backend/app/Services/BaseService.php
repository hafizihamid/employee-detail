<?php

namespace App\Services;

class BaseService
{
    public function formatGeneralResponse($message, $status, $httpCode)
    {
        $response = [
            'status' => $status,
            'http_code' => $httpCode,
            'message' => $message
        ];

        return $response;
    }
}
