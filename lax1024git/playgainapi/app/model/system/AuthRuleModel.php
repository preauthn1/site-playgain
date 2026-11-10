<?php

namespace app\model\system;

use app\base\BaseModel;
use app\libs\Util;
use think\model\concern\SoftDelete;

/**
 * 模型-权限菜单
 * Class AuthRuleModel
 * @package app\model
 */
class AuthRuleModel extends BaseModel
{
    use SoftDelete;

    protected $name = 'auth_rule';

    /**
     * 重置所有redis
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function resetAllRedis()
    {
        $this->redis->del($this->redis_key);
        $objList = $this->select();
        foreach ($objList as $obj) {
            $this->redis->hSet($this->redis_key, $obj["name"], serialize($obj->toArray()));
        }
    }

    /**
     * 彻底删除
     * @param $id
     * @return bool
     * @throws \Exception
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function delComplete($id)
    {
        $rule = self::onlyTrashed()->find($id);
        $this->delSubNode($id);
        return $rule->force()->delete();
    }

    /**
     * 还原数据
     * @param $id
     * @return bool
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function backData($id)
    {
        $rule = self::onlyTrashed()->find($id);
        $this->redis->hSet($this->redis_key, $rule["name"], serialize($rule->toArray()));
        return $rule->restore();
    }

    /**
     * 删除子节点
     * @param $id
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function delSubNode($id)
    {
        $dataList = $this->where('parent_id', $id)->select();
        foreach ($dataList as $obj) {
            $obj->force()->delete();
            $this->delSubNode($obj['id']);
        }
    }

    /**
     * 获取器-api_method_text
     * @param $value
     * @return mixed
     */
    public function getApiMethodTextAttr($value, $data)
    {
        if (!empty($data['api_method'])) {
            $method = ['1' => 'get', '2' => 'post', '3' => 'delete', '4' => 'put'];
            return $method[$data['api_method']];
        }
    }

    /**
     * 根据ID获取
     * @param $id
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getInfoById($id)
    {
        $data = $this->where('id', $id)->find();
        if ($data['parent_id'] != 0) {
            $pids = $this->getParentIds($data['parent_id'], [intval($data['parent_id'])]);
            $data['pids'] = array_reverse($pids);
        } else {
            $data['pids'] = [];
        }
        return $data;
    }

    /**
     * 获取父级ID集合
     * @param $parent_id
     * @param $ids
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getParentIds($parent_id, $ids)
    {
        $data = $this->field('id,parent_id')->where('id', $parent_id)->find();
        if ($data['parent_id'] != 0) {
            $pid = intval($data['parent_id']);
            array_push($ids, $pid);
            return $this->getParentIds($pid, $ids);
        }
        return $ids;
    }

    /**
     * 获取权限菜单
     * @param $group_rules
     * @param bool $is_admin
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getAuthMenu($group_rules, $is_admin = false)
    {
        $permission = [];
        $menuList = [];
        $ruleList = $this->getAll($group_rules, $is_admin);
        foreach ($ruleList as $rule) {
            if ($rule['type'] <= 2) {
                array_push($menuList, $rule);
            }
            array_push($permission, $rule);
        }
        $menuTree = Util::levelTreeChildren($menuList, 0);
        return ['menuTree' => $menuTree, 'permission' => $permission];
    }

    /**
     * 获取所有
     * @param string $group_rules
     * @param bool $is_admin
     * @return \think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getAll($group_rules = '', $is_admin = false)
    {
        $map = [];
        if (!$is_admin) {
            array_push($map, ['id', 'in', $group_rules]);
        }
        $ruleList = $this
            ->withoutField('create_time,update_time,delete_time')
            ->where($map)
            ->append(['api_method_text'])
            ->order('rank', 'DESC')
            ->select();
        return $ruleList->toArray();
    }
}
