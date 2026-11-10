<?php

namespace app\controller\api;

use app\base\BaseController;


/**
 * 小程序首页请求接口
 * Class Index
 * @package app\controller
 */
class Index extends BaseController
{
    protected function initialize()
    {
        parent::initialize();
    }

    /**
     * 测试
     * @return \think\response\Json
     */
    public function index()
    {
        return self::returnMsg(1, []);
    }
}
