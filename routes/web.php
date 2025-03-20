<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;

Route::get('/', function () {
    return view('welcome');
});

Route::get('update-count', function(){
    // retrieve a count.json which contains the current count value from that json file and then increments it
    $countFilePath = storage_path('app/count.json');
    $count = json_decode(file_get_contents($countFilePath));
    $count->count++;
    file_put_contents($countFilePath, json_encode($count));
    
    Broadcast::on('count-channel')
        ->as('count.changed')
        ->with(['count' => $count->count])
        ->send();
});

// New route to get the current count
Route::get('get-count', function() {
    // Check if count.json exists, create it if it doesn't
    $countFilePath = storage_path('app/count.json');
    if (!file_exists($countFilePath)) {
        // Create directory if it doesn't exist
        if (!file_exists(dirname($countFilePath))) {
            mkdir(dirname($countFilePath), 0755, true);
        }
        // Create initial count file
        file_put_contents($countFilePath, json_encode(['count' => 0]));
    }
    
    $count = json_decode(file_get_contents($countFilePath));
    return response()->json(['count' => $count->count]);
});

// reset count
Route::get('reset-count', function() {
    $countFilePath = storage_path('app/count.json');
    file_put_contents($countFilePath, json_encode(['count' => 0]));
    Broadcast::on('count-channel')
        ->as('count.changed')
        ->with(['count' => 0])
        ->send();
});
