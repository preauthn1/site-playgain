<?php

namespace app\libs;

/**
 * 通用工具处理
 * Class Util
 * @package app\libs
 */
class Util
{
    /**
     * 数据格式化
     * @param $data
     * @return mixed
     */
    public static function numberFormat($data)
    {
        foreach ($data as $key => $value) {
            if (floatval($data[$key]) > 9999 || floatval($data[$key]) < -9999) {
                $data[$key] = round($data[$key] / 10000, 2) . "W";
            }
        }
        return $data;
    }

    /**
     * 获取客户端真实的ip
     * @return bool|mixed
     */
    public static function get_real_ip()
    {
        $ip = FALSE;
        //客户端IP 或 NONE
        if (!empty($_SERVER["HTTP_CLIENT_IP"])) {
            $ip = $_SERVER["HTTP_CLIENT_IP"];
        }
        //多重代理服务器下的客户端真实IP地址（可能伪造）,如果没有使用代理，此字段为空
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ips = explode(", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
            if ($ip) {
                array_unshift($ips, $ip);
                $ip = FALSE;
            }
            for ($i = 0; $i < count($ips); $i++) {
                if (!preg_match("^(10│172.16│192.168).", $ips[$i])) {
                    $ip = $ips[$i];
                    break;
                }
            }
        }
        //客户端IP 或 (最后一个)代理服务器 IP
        return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
    }

    /**
     * 数组层级缩进转换-父子包含
     * @param $list
     * @param $p_id
     * @return array
     */
    public static function levelTreeChildren($list, $p_id)
    {
        $r = array();
        foreach ($list as $id => $item) {
            if ($item['parent_id'] == $p_id) {
                $length = count($r);
                $r[$length] = $item;
                if ($t = self::levelTreeChildren($list, $item['id'])) {
                    $r[$length]['children'] = $t;
                }
            }
        }
        return $r;
    }

    /**
     * 对二维数组进行排序
     * 模拟 数据表记录按字段排序
     * @param array $array 要排序的数组
     * @param string $orderKey 排序关键字/字段
     * @param string $orderType 排序方式，'asc':升序，'desc':降序
     * @param string $orderValueType 排序字段值类型，'number':数字，'string':字符串
     */
    public static function listOrder(&$array, $orderKey, $orderType = 'asc', $orderValueType = 'string')
    {
        if (is_array($array)) {
            $orderArr = array();
            foreach ($array as $val) {
                $orderArr[] = $val[$orderKey];
            }
            $orderType = ($orderType == 'asc') ? SORT_ASC : SORT_DESC;
            $orderValueType = ($orderValueType == 'string') ? SORT_STRING : SORT_NUMERIC;
            array_multisort($orderArr, $orderType, $orderValueType, $array);
        }
    }

    /**
     * 获取全部子集以及制定字段
     * @param $list
     * @param string $field
     * @return array
     */
    public static function getChildrenIds($list, $field = "id")
    {
        $ids = [];
        foreach ($list as $key => $value) {
            $ids_temp = [];
            $ids_temp = Util::getChildrenId($value, $ids_temp, $field);
            if (empty($ids_temp)) {
                $ids[$key]['title'] = $value['name'];
                $ids[$key]['ids'] = $ids_temp;
                $ids[$key]['ids_str'] = $value['id'];
            } else {
                $ids_temp[] = $value['id'];
                $ids[$key]['title'] = $value['name'];
                $ids[$key]['ids'] = $ids_temp;
                $ids[$key]['ids_str'] = implode(',', $ids_temp);
            }
        }
        return $ids;
    }

    /**
     * 获取单条子集制定字段数组
     * @param $list
     * @param array $ids
     * @param string $field
     * @return array
     */
    public static function getChildrenId($list, &$ids, $field = "id")
    {
        if (empty($list['children'])) {
            return $ids;
        }
        foreach ($list['children'] as $value) {
            $ids[] = $value[$field];
            if (!empty($value['children'])) {
                Util::getChildrenId($value, $ids);
            }
        }
        return $ids;
    }

    /**
     * 获取随机字符串
     * @param $len
     * @param null $chars
     * @return string
     */
    public static function getRandomString($len, $chars = null)
    {
        if (is_null($chars)) {
            $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }
        mt_srand(10000000 * (double)microtime());
        for ($i = 0, $str = '', $lc = strlen($chars) - 1; $i < $len; $i++) {
            $str .= $chars[mt_rand(0, $lc)];
        }
        return $str;
    }

    /**
     * 手机号格式检查
     * @param string $mobile
     * @return bool
     */
    public static function isMobileNumber($mobile)
    {
        if (!is_numeric($mobile)) {
            return false;
        }
        $reg = "/^1[0123456789]\d{9}$/";

        return preg_match($reg, $mobile) ? true : false;
    }

    /**
     * 获取富文本图片
     *
     * @param [type] $content
     * @return void
     */
    public static function getContentImgs($content)
    {
        $pattern = '/<img((?!src).)*src[\s]*=[\s]*[\'"](?<src>[^\'"]*)[\'"]/i';
        preg_match_all($pattern, $content, $matchContent);
        return $matchContent['src'];
    }

    /**
     * 判断是否是
     * @param $name
     * @param $str
     * @return bool
     */
    public static function isInString($name, $str)
    {
        $name = base64_encode($name);
        $str = base64_encode($str);
        $len = strpos($name, $str);
        if ($len === false) {
            return false;
        }
        return true;
    }
}