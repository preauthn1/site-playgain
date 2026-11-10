<?php

namespace app\upgrade;

use app\upgrade\interfaces\Ver;
use think\facade\Db;

abstract class VersionBase implements Ver
{

    /**
     * 判断表名是否存在
     * @param string $full_table_name 表名称带前缀
     * @param string $config 数据库配置
     * @return bool
     */
    public function existTable($full_table_name, $config = "")
    {
        return $this->existTableFullName($full_table_name, $config);
    }

    /**
     * 根据SQL创建表 自动判断表是否存在
     * @param $full_table_name
     * @param string $sql
     * @param string $config
     */
    public function createTableSql($full_table_name, $sql = '', $config = "")
    {
        if (!$this->existTableFullName($full_table_name, $config)) {
            $this->execute($sql, $config);
        }
    }

    public function existTableFullName($full_table_name, $config = "")
    {
        $exist = Db::connect($config)->query("show tables like '{$full_table_name}'");
        return empty($exist) ? false : true;
    }

    /**
     * 判断表是否存在字段
     * @param string $full_table_name 表名称带前缀
     * @param string $field 字段名称
     * @param string $config 数据库配置
     * @return bool
     */
    public function existTableField($full_table_name, $field, $config = "")
    {
        $fields = $this->getFields($full_table_name, $config);
        return in_array($field, $fields);
    }

    /**
     * 获取表的所有字段
     * @param type $full_table_name 表名称带前缀
     * @param type $config 数据库配置
     * @return type
     */
    public function getFields($full_table_name, $config = "")
    {
        $fields = Db::connect($config)->query("show COLUMNS FROM {$full_table_name}");
        $res = [];
        foreach ($fields as $value) {
            $res[] = $value['Field'];
        }

        return $res;
    }

    /**
     * 判断表是否存在字段
     * @param string $full_table_name 表名称带前缀
     * @param string $index 字段名称
     * @param string $config 数据库配置
     * @return bool
     */
    public function existTableIndex($full_table_name, $index, $config = "")
    {
        $indexs = $this->getIndexs($full_table_name, $config);
        return in_array($index, $indexs);
    }

    /**
     * 获取表的所有索引
     * @param type $full_table_name 表名称带前缀
     * @param type $config 数据库配置
     * @return type
     */
    public function getIndexs($full_table_name, $config = "")
    {
        $fields = Db::connect($config)->query("show index FROM {$full_table_name}");
        $res = [];
        foreach ($fields as $value) {
            $res[] = $value['Key_name'];
        }

        return $res;
    }

    /**
     * 执行SQL
     * @param type $sql
     * @param type $config 数据库配置
     */
    public function execute($sql, $config = "")
    {
        Db::connect($config)->execute($sql);
    }

    /**
     * 执行SQL 要插入的数据是否存在
     * @param type $sql
     * @param type $config 数据库配置
     * @return Array
     */
    public function getTableData($sql, $config = "")
    {
        $ret = Db::connect($config)->query($sql);
        Db::connect($config)->close();
        return $ret;
    }

}
