<?php

use think\facade\Route;

//【首页列表数据】
Route::group('app_index/', function () {
    Route::rule('index/index', 'Index/index');
})->prefix('api.');