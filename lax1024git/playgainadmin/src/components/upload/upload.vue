<template>
  <div>
    <el-upload
      ref="upload"
      action
      :multiple="multiple"
      :accept="accept"
      :file-list="fileList"
      :limit="parseInt(limit)"
      :http-request="uploadFile"
      :before-remove="beforeRemove"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-exceed="onExceed"
      :list-type="listType"
      :auto-upload="autoUpload"
      :disabled="disabled"
    >
      <i
        class="el-icon-plus"
        :id="'uploadGoods' + index"
        v-if="listType == 'picture-card'"
      ></i>
      <el-button size="small" type="success" v-else>点击上传</el-button>
      <div slot="tip" class="el-upload__tip">{{ tips }}</div>
    </el-upload>
  </div>
</template>

<script>
// import oss from "@/libs/oss";
// import {upload} from '@/libs/axios'
import common from "@/api/modules/common"

export default {
  name: "Upload",
  data() {
    return {
      fileList: [],
    };
  },
  props: {
    fileArr: {
      type: Array,
      default: function () {
        return [];
      },
    },
    index: {
      type: Number,
      default: 10000,
    },
    multiple: Boolean,
    accept: String,
    fileFolder: String,
    limit: Number,
    listType: String,
    tips: String,
    maxSize: {
      type: Number,
      default: 0,
    },
    maxWidth: {
      type: Number,
      default: 0,
    },
    maxHeight: {
      type: Number,
      default: 0,
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async uploadFile(param) {
      let that = this;
      param.folder = this.fileFolder;
      await common.upload(param).then((response) => {
        response["index"] = that.index;
        this.fileList = this.fileList.concat([response]);
        // console.log(this.fileList)
        this.$emit("getUploadFiles", this.fileList);
      });
    },
    handleChange(file, fileList) {
      var _this = this;
      const isTypeTrue = /^image\/(jpeg|png|jpg)$/.test(file.raw.type);
      if (_this.maxSize != 0) {
        const isLt3M = file.raw.size / 1024 / 1024 < _this.maxSize;
        if (!isLt3M) {
          this.$message.error("上传图片大小不能超过" + _this.maxSize + "M!");
          return;
        }
        if (!isTypeTrue) {
          this.$message.error("上传图片格式不对!");
          return;
        }
      }
      if (_this.maxWidth != 0 && _this.maxHeight != 0) {
        new Promise(function (resolve, reject) {
          //upload内部需要一个promise,简单的return出false并没有什么用
          let width = _this.maxWidth;
          let height = _this.maxHeight;
          let floatx = 20;
          let _URL = window.URL || window.webkitURL;
          let img = new Image();
          img.onload = function () {
            let _w = Math.abs(img.width - width);
            let _h = Math.abs(img.height - height);
            let valid = false;
            if ((_w > 0 || _w < floatx) && (_h > 0 || _h < floatx)) {
              valid = true;
            } else {
              valid = false;
            }
            valid ? resolve() : reject();
          };
          img.src = _URL.createObjectURL(file.raw); //onload是异步加载
        }).then(
          () => {
            _this.imageUrl = URL.createObjectURL(file.raw);
            return file.raw;
          },
          () => {
            this.$message.error(
              "上传的图片必须是" + _this.maxWidth + "*" + _this.maxHeight + "!"
            );
            return Promise.reject();
          }
        );
      }
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的csv文件
      }
    },
    beforeRemove() {
      return this.$confirm(`确定删除该文件吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => {
        window.console.log(err);
      });
    },
    onExceed() {
      this.$message.error("最多上传" + this.limit + "个文件");
    },
    async onRemove(file) {
      await common.delfile(file.url).then(() => {
        this.fileList.splice(
          this.fileList.findIndex((item) => item.url === file.url),
          1
        );
        this.$emit("getUploadFiles", this.fileList);
      });
    },
    onPreview(file) {
      window.open(file.url);
    },
    onSubmit() {
      this.$refs.upload.submit();
    },
  },
  watch: {
    fileArr: {
      immediate: true,
      handler(val) {
        this.fileList = val;
      },
    },
  },
};
</script>
