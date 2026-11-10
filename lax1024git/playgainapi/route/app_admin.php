<?php

use think\facade\Route;

//【通用】验证码图片
Route::get('app_admin/common/captcha', 'admin.Common/getCaptcha');
//【账号】登录
Route::post('app_admin/account/login', 'admin.AuthUser/onLogin');
//【通用】获取系统配置参数
Route::get('app_admin/common/config', 'admin.Common/getConfig');

Route::group('app_admin/', function () {

    //【账号】退出登录
    Route::post('account/logout', 'AuthUser/onLogout');
    //【账号】修改密码
    Route::post('account/editpwd', 'AuthUser/onEditpwd');
    //【账号】刷新token
    Route::post('account/token', 'AuthUser/onToken');
    //【账号】用户信息
    Route::get('account/profile', 'AuthUser/getProfile');

    //【缓存】重新生成
    Route::post('caches/reset', 'Caches/onReset');

    //【工作台】
    Route::get('dashboard/statistics', 'Dashboard/getStatistics');

    //【权限-菜单规则】
    Route::get('auth/rule/tree', 'AuthRule/getTree');
    Route::get('auth/rule/info', 'AuthRule/getInfo');
    Route::post('auth/rule/save', 'AuthRule/onSave');
    Route::post('auth/rule/delete', 'AuthRule/onDelete');

    //【权限-角色分组】
    Route::get('auth/group/page', 'AuthGroup/getPage');
    Route::get('auth/group/info', 'AuthGroup/getInfo');
    Route::get('auth/group/all', 'AuthGroup/getAll');
    Route::post('auth/group/save', 'AuthGroup/onSave');
    Route::post('auth/group/delete', 'AuthGroup/onDelete');
    Route::post('auth/group/status', 'AuthGroup/onStatus');

    //【权限-用户管理】
    Route::get('auth/user/page', 'AuthUser/getPage');
    Route::get('auth/user/info', 'AuthUser/getInfo');
    Route::post('auth/user/save', 'AuthUser/onSave');
    Route::post('auth/user/delete', 'AuthUser/onDelete');
    Route::post('auth/user/status', 'AuthUser/onStatus');
    Route::post('auth/user/delcache', 'AuthUser/onDelCache');

    //【系统参数配置】
    Route::get('sys/config/page', 'SysConfig/getPage');
    Route::get('sys/config/info', 'SysConfig/getInfo');
    Route::post('sys/config/save', 'SysConfig/onSave');
    Route::post('sys/config/delete', 'SysConfig/onDelete');

})->prefix('admin.')->middleware(['token', 'auth']);
