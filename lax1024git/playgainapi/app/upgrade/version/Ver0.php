<?php

namespace app\upgrade\version;

use app\upgrade\VersionBase;

/**
 * 基础版本
 * Class Ver0
 * @package app\upgrade\version
 */
class Ver0 extends VersionBase
{

    public function run()
    {
        //创键建管理员表
        $sql = <<<SQL
CREATE TABLE `t_auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增ID',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '登录用户名',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '登录密码',
  `realname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '真实姓名',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '头像地址',
  `status` tinyint(3) unsigned DEFAULT '1' COMMENT '状态标识，0禁用，1正常',
  `app_id` int(11) DEFAULT '0' COMMENT '数据归属',
  `login_num` int(10) unsigned DEFAULT '0' COMMENT '登录次数',
  `login_last_ip` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '最后登录IP',
  `login_last_dt` int(10) unsigned DEFAULT NULL COMMENT '最后登录时间',
  `delete_time` int(10) unsigned DEFAULT '0' COMMENT '删除日期',
  `update_time` int(10) unsigned DEFAULT '0' COMMENT '更新日期',
  `create_time` int(10) unsigned DEFAULT '0' COMMENT '创建日期',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `idx_username` (`username`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='管理员表';
SQL;
        $this->createTableSql("t_auth_user", $sql);

        //创键建路由表
        $sql = <<<SQL
CREATE TABLE `t_auth_rule` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键，自增ID',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '规则唯一标识',
  `title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '规则名称',
  `url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '规则URL',
  `url_param` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '路由参数',
  `icon` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '图标',
  `type` tinyint(3) unsigned DEFAULT '0' COMMENT '类型，0目录，1菜单，2页面，3按钮元素，4接口',
  `api_method` tinyint(3) unsigned DEFAULT '0' COMMENT '接口类型，0无，1get，2post，3delete，4put',
  `rank` int(10) unsigned DEFAULT '0' COMMENT '排序，数值越大权重越高',
  `parent_id` int(10) unsigned DEFAULT '0' COMMENT '父级ID',
  `delete_time` int(10) unsigned DEFAULT '0' COMMENT '删除日期',
  `update_time` int(10) unsigned DEFAULT '0' COMMENT '更新日期',
  `create_time` int(10) unsigned DEFAULT '0' COMMENT '创建日期',
  `app_id` int(11) DEFAULT '0' COMMENT '数据归属',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `idx_name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='路由表';
SQL;
        $this->createTableSql("t_auth_rule", $sql);

        //创键权限分组表
        $sql = <<<SQL
CREATE TABLE `t_auth_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键，自增ID',
  `title` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '角色名称',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '0状态：0禁用，1正常',
  `rules` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '规则ID，多个规则","隔开',
  `delete_time` int(10) unsigned DEFAULT '0' COMMENT '删除日期',
  `update_time` int(10) unsigned DEFAULT '0' COMMENT '更新日期',
  `create_time` int(10) unsigned DEFAULT '0' COMMENT '创建日期',
  `app_id` int(11) DEFAULT '0' COMMENT '数据归属',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='权限分组表';
SQL;
        $this->createTableSql("t_auth_group", $sql);

        //创键授权关系表单
        $sql = <<<SQL
CREATE TABLE `t_auth_group_access` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键，自增ID',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
  `group_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '分组ID',
  `app_id` int(11) DEFAULT '0' COMMENT '数据归属',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_user_id` (`user_id`) USING BTREE,
  KEY `idx_group_id` (`group_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='授权关系表单';
SQL;
        $this->createTableSql("t_auth_group_access", $sql);

        //创键系统配置数据
        $sql = <<<SQL
CREATE TABLE `t_sys_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增ID',
  `name` varchar(50) DEFAULT '' COMMENT '参数名称',
  `key` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '数据键值',
  `value` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '数据内容',
  `add_time` int(11) DEFAULT '0' COMMENT '添加时间',
  `update_time` int(11) DEFAULT '0' COMMENT '更新时间',
  `app_id` int(11) DEFAULT '0' COMMENT '数据归属',
  PRIMARY KEY (`id`,`key`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='系统配置数据';
SQL;
        $this->createTableSql("t_sys_config", $sql);

        //插入默认数据
        $password = password_hash("123456", PASSWORD_BCRYPT);
        $sql = <<<SQL
INSERT INTO `t_auth_user` (`id`, `username`, `password`, `realname`, `avatar`, `status`, `app_id`, `login_num`, `login_last_ip`, `login_last_dt`, `delete_time`, `update_time`, `create_time`) VALUES ('1', 'admin', '{$password}', '超级管理员', NULL, '1', NULL, '205', '127.0.0.1', '1573119576', '0', '1668417736', '1528700859');
SQL;
        $this->execute($sql);

    }
}
