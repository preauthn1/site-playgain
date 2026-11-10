<?php

namespace app\controller\api;

use app\base\BaseEncryptController;
use app\libs\Oss;
use app\model\system\SysConfigModel;
use think\Request;

/**
 * 通用处理
 * Class Common
 * @package app\controller
 */
class Common extends BaseEncryptController
{

    /**
     * 获取阿里云OSS签名
     * @param $folder
     * @return \think\response\Json
     */
    public function onOssSign($folder)
    {
        $oss = new Oss();
        $sign = $oss->sign($folder);
        return self::returnMsg(1, $sign);
    }
}
