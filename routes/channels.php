<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return true;
    //return (int) $user->id === (int) $id;
});

Broadcast::channel('count-channel', function ($user) {
    return true;
});