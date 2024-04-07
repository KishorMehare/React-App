<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

// User authentication route
Route::post('/login', function (Request $request) {
    // Validate request data
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    // Check if user exists
    $user = User::where('email', $credentials['email'])->first();

    if (!$user || !Hash::check($credentials['password'], $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Generate token
    $token = $user->createToken('authToken')->plainTextToken;

    return response()->json(['token' => $token]);
});

// Protected route requiring authorization
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

