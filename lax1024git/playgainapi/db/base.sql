DROP TABLE IF EXISTS `t_auth_group`;
CREATE TABLE `t_auth_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键，自增ID',
  `title` varchar(20) NOT NULL DEFAULT '' COMMENT '角色名称',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '0状态：0禁用，1正常',
  `rules` text COMMENT '规则ID，多个规则","隔开',
  `delete_time` int(10) unsigned DEFAULT '0' COMMENT '删除日期',
  `update_time` int(10) unsigned DEFAULT '0' COMMENT '更新日期',
  `create_time` int(10) unsigned DEFAULT '0' COMMENT '创建日期',
  `store_id` int(11) DEFAULT '0' COMMENT '店铺归属',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of t_auth_group
-- ----------------------------
INSERT INTO `t_auth_group` VALUES ('4', '管理员', '1', '119,266,273,395,396,397,398,399,400,1038,1039,1040,1041,1042,1043,1044,1045,1046,1047,1048,1049,1050,249,265,427,428,430,429', '0', '1700207066', '1568786270', '0');

-- ----------------------------
-- Table structure for t_auth_group_access
-- ----------------------------
DROP TABLE IF EXISTS `t_auth_group_access`;
CREATE TABLE `t_auth_group_access` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键，自增ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '用户ID',
  `group_id` int(10) unsigned NOT NULL COMMENT '分组ID',
  `store_id` int(11) DEFAULT '0' COMMENT '归属店铺',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_user_id` (`user_id`) USING BTREE,
  KEY `idx_group_id` (`group_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of t_auth_group_access
-- ----------------------------
INSERT INTO `t_auth_group_access` VALUES ('39', '29', '4', '0');
INSERT INTO `t_auth_group_access` VALUES ('40', '28', '4', '0');

-- ----------------------------
-- Table structure for t_auth_rule
-- ----------------------------
DROP TABLE IF EXISTS `t_auth_rule`;
CREATE TABLE `t_auth_rule` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键，自增ID',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '规则唯一标识',
  `title` varchar(30) NOT NULL DEFAULT '' COMMENT '规则名称',
  `url` varchar(200) DEFAULT NULL COMMENT '规则URL',
  `url_param` varchar(30) DEFAULT NULL COMMENT '路由参数',
  `icon` varchar(60) DEFAULT NULL COMMENT '图标',
  `type` tinyint(3) unsigned DEFAULT '0' COMMENT '类型，0目录，1菜单，2页面，3按钮元素，4接口',
  `api_method` tinyint(3) unsigned DEFAULT '0' COMMENT '接口类型，0无，1get，2post，3delete，4put',
  `rank` int(10) unsigned DEFAULT '0' COMMENT '排序，数值越大权重越高',
  `parent_id` int(10) unsigned DEFAULT '0' COMMENT '父级ID',
  `delete_time` int(10) unsigned DEFAULT '0' COMMENT '删除日期',
  `update_time` int(10) unsigned DEFAULT '0' COMMENT '更新日期',
  `create_time` int(10) unsigned DEFAULT '0' COMMENT '创建日期',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `idx_name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1055 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of t_auth_rule
-- ----------------------------
INSERT INTO `t_auth_rule` VALUES ('119', 'home', '工作台', '/home', null, 'iconfont icon-gongzuotai', '1', '0', '1000', '0', '0', '1567415120', '1559197777');
INSERT INTO `t_auth_rule` VALUES ('139', 'auth', '权限管理', '', '', 'iconfont icon-quanxianguanli', '0', '0', '550', '0', '0', '1594279859', '1559197777');
INSERT INTO `t_auth_rule` VALUES ('239', 'authUser', '管理员', '/system/auth/user', null, null, '1', '0', '0', '139', '0', '1559197777', '1559197777');
INSERT INTO `t_auth_rule` VALUES ('240', 'authRole', '角色分组', '/system/auth/role', null, null, '1', '0', '0', '139', '0', '1559197777', '1559197777');
INSERT INTO `t_auth_rule` VALUES ('241', 'authRule', '菜单权限', '/system/auth/rule', null, null, '1', '0', '0', '139', '0', '1559197777', '1559197777');
INSERT INTO `t_auth_rule` VALUES ('242', 'authRuleEdit', '编辑', '/system/auth/rule/edit', '/:id?', null, '2', '0', '0', '241', '0', '1559197777', '1559197777');
INSERT INTO `t_auth_rule` VALUES ('243', 'authRoleEdit', '编辑', '/system/auth/role/edit', '/:id?', null, '2', '0', '0', '240', '0', '1559197777', '1559197777');
INSERT INTO `t_auth_rule` VALUES ('244', 'authUserEdit', '编辑', '/system/auth/user/edit', '/:id?', null, '2', '0', '0', '239', '0', '1559197777', '1559197777');
INSERT INTO `t_auth_rule` VALUES ('249', 'system', '系统管理', '', '', 'iconfont icon-xitongshezhi', '0', '0', '500', '0', '0', '1594279874', '1564560451');
INSERT INTO `t_auth_rule` VALUES ('265', 'editpwd', '修改密码', '/system/editpwd', '', '', '1', '0', '0', '249', '0', '1700031560', '1564738110');
INSERT INTO `t_auth_rule` VALUES ('401', 'authUserDelBtn', '删除按钮', '', '', '', '3', '0', '0', '239', '0', '1574233280', '1574233280');
INSERT INTO `t_auth_rule` VALUES ('402', 'auth/user/page', '获取列表', 'auth/user/page', '', '', '4', '1', '0', '239', '0', '1574233297', '1574233297');
INSERT INTO `t_auth_rule` VALUES ('403', 'auth/user/info', '获取详情', 'auth/user/info', '', '', '4', '1', '0', '244', '0', '1574233313', '1574233313');
INSERT INTO `t_auth_rule` VALUES ('404', 'auth/user/save', '保存', 'auth/user/save', '', '', '4', '2', '0', '244', '0', '1574233327', '1574233327');
INSERT INTO `t_auth_rule` VALUES ('405', 'auth/user/delete', '删除', 'auth/user/delete', '', '', '4', '2', '0', '401', '0', '1574233341', '1574233341');
INSERT INTO `t_auth_rule` VALUES ('406', 'auth/user/status', '保存状态', 'auth/user/status', '', '', '4', '2', '0', '239', '0', '1574233360', '1574233360');
INSERT INTO `t_auth_rule` VALUES ('407', 'authRoleDelBtn', '删除按钮', '', '', '', '3', '0', '0', '240', '0', '1574233392', '1574233392');
INSERT INTO `t_auth_rule` VALUES ('408', 'auth/group/page', '获取列表', 'auth/group/page', '', '', '4', '1', '0', '240', '0', '1574233409', '1574233409');
INSERT INTO `t_auth_rule` VALUES ('409', 'auth/group/status', '修改状态', 'auth/group/status', '', '', '4', '2', '0', '240', '0', '1574233424', '1574233424');
INSERT INTO `t_auth_rule` VALUES ('410', 'auth/group/info', '获取详情', 'auth/group/info', '', '', '4', '1', '0', '243', '0', '1574233439', '1574233439');
INSERT INTO `t_auth_rule` VALUES ('411', 'auth/group/all', '获取所有', 'auth/group/all', '', '', '4', '1', '0', '240', '0', '1574233454', '1574233454');
INSERT INTO `t_auth_rule` VALUES ('412', 'auth/group/save', '保存', 'auth/group/save', '', '', '4', '2', '0', '243', '0', '1574233469', '1574233469');
INSERT INTO `t_auth_rule` VALUES ('413', 'auth/group/delete', '删除', 'auth/group/delete', '', '', '4', '2', '0', '407', '0', '1574233483', '1574233483');
INSERT INTO `t_auth_rule` VALUES ('414', 'authRuleDelBtn', '删除按钮', '', '', '', '3', '0', '0', '241', '0', '1574233513', '1574233513');
INSERT INTO `t_auth_rule` VALUES ('415', 'auth/rule/tree', '获取列表', 'auth/rule/tree', '', '', '4', '1', '0', '241', '0', '1574233526', '1574233526');
INSERT INTO `t_auth_rule` VALUES ('416', 'auth/rule/info', '获取详情', 'auth/rule/info', '', '', '4', '1', '0', '242', '0', '1574233541', '1574233541');
INSERT INTO `t_auth_rule` VALUES ('417', 'auth/rule/save', '保存', 'auth/rule/save', '', '', '4', '2', '0', '242', '0', '1574233556', '1574233556');
INSERT INTO `t_auth_rule` VALUES ('418', 'auth/rule/delete', '删除', 'auth/rule/delete', '', '', '4', '2', '0', '414', '0', '1574233573', '1574233573');
INSERT INTO `t_auth_rule` VALUES ('427', 'account/editpwd', '修改密码', 'account/editpwd', '', '', '4', '2', '0', '265', '0', '1574233794', '1574233794');
INSERT INTO `t_auth_rule` VALUES ('428', 'account/profile', '用户信息', 'account/profile', '', '', '4', '1', '0', '249', '0', '1574233827', '1574233827');
INSERT INTO `t_auth_rule` VALUES ('429', 'caches/reset', '重置缓存', 'caches/reset', '', '', '4', '2', '0', '430', '0', '1574236964', '1574233845');
INSERT INTO `t_auth_rule` VALUES ('430', 'cachesBtn', '重置缓存按钮', '', '', '', '3', '0', '0', '249', '0', '1574236954', '1574236845');
INSERT INTO `t_auth_rule` VALUES ('435', 'user/delcache', '清除缓存', 'user/delcache', '', '', '4', '2', '0', '434', '0', '1574303889', '1574303889');
INSERT INTO `t_auth_rule` VALUES ('438', 'authUserDelCacheBtn', '清除缓存按钮', '', '', '', '3', '0', '0', '239', '0', '1574317463', '1574317463');
INSERT INTO `t_auth_rule` VALUES ('439', 'auth/user/delcache', '清除缓存', 'auth/user/delcache', '', '', '4', '2', '0', '438', '0', '1574317480', '1574317480');
INSERT INTO `t_auth_rule` VALUES ('462', 'sysConfig', '参数配置', '/system/config', '', '', '1', '0', '0', '249', '0', '1700031419', '1577936415');
INSERT INTO `t_auth_rule` VALUES ('463', 'sys/config/page', '获取列表', 'sys/config/page', '', '', '4', '1', '0', '462', '0', '1574233297', '1574233297');
INSERT INTO `t_auth_rule` VALUES ('464', 'sys/config/info', '获取详情', 'auth/user/info', '', '', '4', '1', '0', '462', '0', '1574233313', '1574233313');
INSERT INTO `t_auth_rule` VALUES ('465', 'sys/config/save', '保存', 'auth/user/save', '', '', '4', '2', '0', '462', '0', '1574233327', '1574233327');
INSERT INTO `t_auth_rule` VALUES ('466', 'sys/config/delete', '删除', 'auth/user/delete', '', '', '4', '2', '0', '462', '0', '1574233341', '1574233341');
INSERT INTO `t_auth_rule` VALUES ('1053', 'sysConfigEdit', '参数编辑', '/system/config/edit', '/:id?', '', '2', '0', '0', '462', '0', '1559197777', '1559197777');
INSERT INTO `t_auth_rule` VALUES ('1054', 'sysConfigDelBtn', '删除按钮', '', '', '', '3', '0', '0', '462', '0', '1574233392', '1574233392');

-- ----------------------------
-- Table structure for t_auth_user
-- ----------------------------
DROP TABLE IF EXISTS `t_auth_user`;
CREATE TABLE `t_auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增ID',
  `username` varchar(20) NOT NULL COMMENT '登录用户名',
  `password` varchar(100) NOT NULL COMMENT '登录密码',
  `realname` varchar(20) NOT NULL DEFAULT '' COMMENT '真实姓名',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像地址',
  `status` tinyint(3) unsigned DEFAULT '1' COMMENT '状态标识，0禁用，1正常',
  `login_num` int(10) unsigned DEFAULT '0' COMMENT '登录次数',
  `login_last_ip` varchar(15) DEFAULT NULL COMMENT '最后登录IP',
  `login_last_dt` int(10) unsigned DEFAULT NULL COMMENT '最后登录时间',
  `delete_time` int(10) unsigned DEFAULT '0' COMMENT '删除日期',
  `update_time` int(10) unsigned DEFAULT '0' COMMENT '更新日期',
  `create_time` int(10) unsigned DEFAULT '0' COMMENT '创建日期',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `idx_username` (`username`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of t_auth_user
-- ----------------------------
INSERT INTO `t_auth_user` VALUES ('1', 'admin', '$2y$10$LR/AlOhedu99zMeWVgB34OAoQ.p5IlZGwGmoDpDRxIUeg/XZ3n/cS', '超级管理员', null, '1', '205', '127.0.0.1', '1573119576', '0', '1668417736', '1528700859');
INSERT INTO `t_auth_user` VALUES ('28', 'lax', '$2y$10$pO/prFBwhS6mwaTzYZsoYOiAI22sIIMlA6kgse2ccjXulJ5rwpOTy', 'aaa', 'https://wqyallu.oss-cn-shanghai.aliyuncs.com/admin/2024/03/07/6f137348ed8c62f30be9bb9bf93acc76.png', '1', '0', null, null, '0', '1709791882', '1700206869');
INSERT INTO `t_auth_user` VALUES ('29', 'xe100', '$2y$10$lBNfhED0XF0KkSlCVG1P.uN/EDnuXLh/BIpG5WOee6bcOIUDpGEVW', '锌赫', null, '1', '0', null, null, '0', '1700314515', '1700314515');

-- ----------------------------
-- Table structure for t_sys_config
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_config`;
CREATE TABLE `t_sys_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增ID',
  `name` varchar(50) DEFAULT '' COMMENT '参数名称',
  `key` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '数据键值',
  `value` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '数据内容',
  `add_time` int(11) DEFAULT '0' COMMENT '添加时间',
  `update_time` int(11) DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`,`key`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='系统配置数据';

-- ----------------------------
-- Records of t_sys_config
-- ----------------------------
INSERT INTO `t_sys_config` VALUES ('1', 'OSS链接地址', 'ossUrl', 'https://wqyallu.oss-cn-shanghai.aliyuncs.com', '1709710173', '1709710958');
INSERT INTO `t_sys_config` VALUES ('2', 'OSS地区域名', 'ossRegion', 'oss-cn-shanghai', '1709710890', '1709710890');
INSERT INTO `t_sys_config` VALUES ('3', 'OSS节点域名', 'ossEndpoint', 'oss-cn-shanghai.aliyuncs.com', '1709710937', '1709710937');
INSERT INTO `t_sys_config` VALUES ('4', 'OSS存储空间名称', 'ossBucket', 'wqyallu', '1709711087', '1709711087');
INSERT INTO `t_sys_config` VALUES ('5', 'OSS账号KEY', 'ossAccessKeyId', 'REDACTED', '1709711122', '1709711122');
INSERT INTO `t_sys_config` VALUES ('6', 'OSS账号秘钥', 'ossAccessKeySecret', '8vj7D3t3Tc5fnOoPterQqyJAOo3fFU', '1709711148', '1709711148');
