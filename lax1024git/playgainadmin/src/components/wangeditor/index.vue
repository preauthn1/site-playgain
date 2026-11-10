<template>
  <div id="app">
    <div id="editorElem"></div>
  </div>
</template>

<script>
import E from "wangeditor";
import oss from "@/libs/oss";
export default {
  props: {
    content: {
      type: String,
      default:""
    }
  },
  data() {
    return {
      editor: null, //富文本对象
    };
  },
  methods: {
    set_content(val) {
      //设置初始值
      this.editor.txt.html(val);
    },
  },
  mounted() {
    //初始化富文本
    this.editor = new E("#editorElem");
    this.editor.customConfig.pasteFilterStyle = false; //不转义
    this.editor.customConfig.menus = [
      // 菜单配置（因为在最新版的wangeditor中不能让功能图标换行，可以视情况而定删除功能）
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "image", // 插入图片
      "table", // 表格
      "undo", // 撤销
      "redo", // 重复
    ];
    this.editor.customConfig.customUploadImg = async function (files, insert) {
      //上傳圖片
      var oss_obj = {};
      oss_obj.file = files[0];
      oss_obj.filename = "file";
      oss_obj.folder = "goods_detail";
      oss_obj.onError = function () {
        // window.console.log('錯誤'+e)
      }; //錯誤回調
      oss_obj.onProgress = function () {
        // window.console.log('錯誤'+e)
      }; //錯誤回調
      oss_obj.onSuccess = function () {
        // window.console.log(e)
      }; //成功回調
      await oss.uploadFile(oss_obj).then((response) => {
        insert(response.url); //成功 插入图片
      });
    };
    var _this = this;
    this.editor.customConfig.onchange = function (html_val) {
      _this.$emit("getHtml", html_val); //返回父组件
    }; //內容變化
    this.editor.create();
  },
  watch: {
    content: {
      handler(val) {
        this.set_content(val);
      },
    },
  },
};
</script>

<style>
#app {
  #editorElem {
    img {
      max-width: 100%;
    }
  }
}
</style>
