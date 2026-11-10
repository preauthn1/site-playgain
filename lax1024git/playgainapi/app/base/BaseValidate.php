<?php

namespace app\base;

use think\Validate;

/**
 * 验证基础类
 * Class BaseValidate
 * @package app\base
 */
class BaseValidate extends Validate
{
    public function sceneAdd()
    {
        return $this->remove('id', 'require');
    }

    public function sceneUpStatus()
    {
        return $this->only(['id', 'status']);
    }
}
