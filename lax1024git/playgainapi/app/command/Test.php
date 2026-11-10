<?php
declare (strict_types=1);

namespace app\command;

use think\console\Command;
use think\console\Input;
use think\console\Output;

/**
 * 指令
 * Class Test
 * @package app\command
 */
class Test extends Command
{
    protected function configure()
    {
        $this->setName('test')->setDescription('the test command');
    }

    /**
     *
     * @param Input $input
     * @param Output $output
     * @return int|void|null
     * @throws \think\Exception
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    protected function execute(Input $input, Output $output)
    {
    }
}
