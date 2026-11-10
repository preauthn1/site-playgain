<?php

use think\facade\Env;

return [
    // 超级管理员用户名
    'administrator' => 'admin',

    // JWT加密key
    'jwt_key' => 'REDACTED',

    // AES加密key
    'aes' => [
        'key' => 'c922b15a7f3562a5',
        'iv' => '9512741612342671'
    ],
    // 前端AES加密key
    'aes_web' => [
        'key' => 'c900b15a7f0912a5',
        'iv' => '9012700612310671'
    ],
    //接口是否加密配置
    'aes_encrypt' => false,

    // 新增用户初始默认密码
    'default_pwd' => '123456',

    // token设置
    'token_set' => [
        // 后台
        'admin' => [
            'access_expires' => 2 * 3600,
            'refresh_expires' => 24 * 3600,
            'white_path' => [
                'app_admin/account/token',
                'app_admin/account/logout'
            ]
        ],
        // 前台
        'index' => [
            'access_expires' => 30 * 24 * 3600
        ]
    ],

    // 阿里云oss配置
    'aliyun_oss' => [
        'accessKeyId' => 'REDACTED',
        'accessKeySecret' => 'REDACTED',
        'endpoint' => 'oss-cn-shanghai.aliyuncs.com',
        'region' => 'oss-cn-shanghai',
        'bucket' => 'ykzn',
        'url' => 'http://ykzn.oss-cn-shanghai.aliyuncs.com'
    ],
];
