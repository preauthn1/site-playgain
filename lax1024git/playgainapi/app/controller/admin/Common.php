<?php

namespace app\controller\admin;

use app\base\BaseEncryptController;
use app\model\system\SysConfigModel;

/**
 * 通用处理
 * Class Common
 * @package app\controller
 */
class Common extends BaseEncryptController
{
    /**
     * 图形验证码
     * @return mixed
     */
    public function getCaptcha()
    {
        return captcha();
    }

}
