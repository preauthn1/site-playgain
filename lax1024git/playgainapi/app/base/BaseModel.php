<?php

namespace app\base;

use think\facade\Cache;
use think\facade\Config;
use think\Model;

/**
 * 模型基础类
 * Class BaseModel
 * @package app\base
 */
class BaseModel extends Model
{
    protected $deleteTime = 'delete_time';
    protected $defaultSoftDelete = 0;
    public $redis;
    public $redis_key;

    public function __construct(array $data = [])
    {
        parent::__construct($data);
        $this->redis = Cache::store('redis')->handler();
        $redis_config = Config::get('cache.stores');
        $this->redis_key = $redis_config['redis']['prefix'] . $this->name;
    }

    /**
     * 删除redis key
     * @param $id
     * @param $suffix
     * @return mixed
     */
    public function delRedis($id, $suffix = '')
    {
        return $this->redis->hDel($this->redis_key . $suffix, $id);
    }

    /**
     * 设置redis
     * @param $obj
     * @param $suffix
     * @return mixed
     */
    public function setRedis($obj, $suffix = '')
    {
        return $this->redis->hSet($this->redis_key . $suffix, $obj["id"], serialize($obj));
    }

    /**
     * 获取缓存数据
     * @param $id
     * @param $suffix
     * @return mixed
     */
    public function getRedis($id, $suffix = '')
    {
        $data = $this->redis->hGet($this->redis_key . $suffix, $id);
        if (!empty($data)) {
            return unserialize($data);
        }
        return [];
    }

    /**
     * 获取单条数据-redis
     * @param $key
     * @param $pk
     * @param $suffix
     * @return array|Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getInfoByRedis($key, $pk = 'id', $suffix = '')
    {
        $data = $this->redis->hGet($this->redis_key . $suffix, $key);
        if ($data) {
            $data = unserialize($data);
        } else {
            $data = $this->where($pk, $key)->find();
            if (!empty($data)) {
                $this->setRedis($data->toArray(), $suffix);
            }
        }
        return $data;
    }

    /**
     * 获取单条数据
     * @param $id
     * @param string $field
     * @param string $with
     * @return array|Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getInfo($id, $field = '*', $with = '')
    {
        $data = $this->with($with)->field($field)->where('id', $id)->find();

        return $data;
    }

    /**
     * 获取所有数据-redis
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getAllByRedis()
    {
        $dataList = [];
        if ($this->redis->exists($this->redis_key)) {
            $objList = $this->redis->hGetAll($this->redis_key);
            foreach ($objList as $key => $obj) {
                $data = unserialize($obj);
                array_push($dataList, $data);
            }
        } else {
            $objList = $this->select()->toArray();
            foreach ($objList as $obj) {
                $this->setRedis($obj);
                array_push($dataList, $obj);
            }
        }
        return $dataList;
    }

    /**
     * 获取所有数据-redis rank
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getAllByRedisRank()
    {
        $dataList = [];
        if ($this->redis->exists($this->redis_key . ':rank')) {
            $objList = $this->redis->zRevRange($this->redis_key . ':rank', 0, -1);
            foreach ($objList as $id) {
                $data = $this->getInfoByRedis($id);
                array_push($dataList, $data);
            }
        } else {
            $objList = $this->order('rank', 'DESC')->select()->toArray();
            foreach ($objList as $obj) {
                $this->redis->zAdd($this->redis_key . ':rank', $obj['rank'], $obj['id']);
                $this->setRedis($obj);
                array_push($dataList, $obj);
            }
        }
        return $dataList;
    }

    /**
     * 获取分页列表
     * @param $map
     * @param $order
     * @param $current_page
     * @param $list_rows
     * @param string $field
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getPageList($map, $order, $current_page, $list_rows, $field = '*')
    {
        $model = $this;
        if (isset($map['like'])) {
            foreach ($map['like'] as $key => $value) {
                $model = $model->whereLike($key, $value, 'OR');
            }
            unset($map['like']);
        }
        $model = $model->where($map)->field($field);
        $dataList = $model
            ->order($order)
            ->paginate(['page' => $current_page, 'list_rows' => $list_rows], false);
        $current = $dataList->currentPage();
        $total = $dataList->total();
        $limit = $dataList->listRows();
        $ret = ['total' => $total, 'current' => $current, 'limit' => $limit, 'dataList' => $dataList->items()];
        return $ret;
    }

    /**
     * 获取所有 符合条件的数据
     * @param array $map
     * @param string $field
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getAll($map = [], $field = '*')
    {
        $list = $this->where($map)->field($field)->select();
        if (empty($list)) {
            return [];
        }
        return $list->toArray();
    }

    /**
     * 获取所有 符合条件的数据
     * @param array $map
     * @param string $order
     * @param string $field
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getList($map = [], $order = 'id DESC', $field = '*')
    {
        $list = $this->where($map)->order($order)->field($field)->select();
        if (empty($list)) {
            return [];
        }
        return $list->toArray();
    }

    /**
     * 保存数据
     * @param $data
     * @param bool $setRedis
     * @param bool $setRedisRank
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function saveData($data, $setRedis = false, $setRedisRank = false)
    {
        if (!empty($data['id'])) {
            $flag = $this->update($data, ['id' => $data['id']]);
            $id = $data['id'];
        } else {
            unset($data['id']);
            $data['create_time'] = time();
            $data['update_time'] = time();
            $flag = $this->strict(false)->insertGetId($data);
            $id = $flag;
        }
        if (false !== $flag && !empty($id) && $setRedis) {
            $obj = $this->getInfo($id);
            if ($setRedisRank) {
                if (isset($data['rank'])) {
                    $this->redis->zAdd($this->redis_key . ':rank', $data['rank'], $id);
                }
                if (isset($data['status'])) {
                    if ($data['status'] == 1) {
                        $this->redis->zAdd($this->redis_key . ':rank', $obj['rank'], $id);
                    } else {
                        $this->redis->zRem($this->redis_key . ':rank', $id);
                    }
                }
                $this->setRedis($obj);
            } else {
                if (isset($data['status'])) {
                    if ($data['status'] == 0) {
                        $this->delRedis($id);
                    } else {
                        $this->setRedis($obj);
                    }
                } else {
                    $this->setRedis($obj);
                }
            }
        }
        return ['flag' => $flag, 'id' => $id];
    }
}
