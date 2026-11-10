import logoImg from "@/assets/imgs/logo.png";
import logoAside from "@/assets/imgs/logo.png";
import logoSample from "@/assets/imgs/logo.png";

export default {
    // logo图片
    logoImg: logoImg,

    // logo侧边
    logoAside: logoAside,

    // logo简版
    logoSample: logoSample,

    // 版权归属
    copyright: "XXXXX科技有限公司",

    // 接口地址
    apiUrl: {
        dev: "/app_admin",
        debug: "/app_admin",
        pro: "/app_admin",
    },
    // 系统配置
    sysConfig: {
         // oss配置文件
        ossUrl: "",
        ossRegion: "",
        ossAccessKeyId: "",
        ossAccessKeySecret: "",
        ossBucket: "",
    },
    // aes加密
    aes: {
        key: "c900b15a7f0912a5",
        iv: "9012700612310671",
    },
    // 秘钥
    key_iv: "O6r0sXtEiqJWK2Npghsf2fNNAcQsCRrhJfgYUh1oHGv8tibyb5j2fc/lPz5HUmYs",

    // cookie有效期
    cookieExpires: 1,

    // access_token key
    accessTokenKey: "XGQ_ADMIN_ACCESS_TOKEN",

    // refresh_token key
    refreshTokenKey: "XGQ_ADMIN_REFRESH_TOKEN",
};
