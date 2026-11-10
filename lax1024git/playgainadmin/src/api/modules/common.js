import {get,upload} from '@/libs/axios'

const common = {
    // 统计
    config(formatData){
        return get('/common/config',formatData)
    },
     // 上传文件
     upload(formatData){
        return upload('/common/upload',formatData)
    },
     // 删除文件
     delfile(url){
        return get('/common/delfile',{url:url})
    },
}

export default common
