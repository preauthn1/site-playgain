module.exports = {
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            "BMap": "BMap"
        }
    },
    devServer: {
        open: true,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {  //配置跨域
            '/app_admin': {
                target: 'http://api.palygain.com/app_admin',  //这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: true,
                changOrigin: true,  //允许跨域
                pathRewrite: {
                    '^/app_admin': ''  //请求的时候使用这个api就可以
                }
            }
        }
    }
}
