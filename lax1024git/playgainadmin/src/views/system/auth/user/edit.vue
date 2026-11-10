<template>
    <div class="u-p-20">
        <el-card shadow="never">
            <div slot="header">
                <b class="u-f-16">
                    <span v-if="objForm.id">编辑</span>
                    <span v-else>添加</span>用户
                </b>
                <div class="u-right u-5mt">
                    <el-button type="success" size="small" icon="el-icon-document-checked"
                        @click="submitForm('objForm')">提交保存</el-button>
                    <el-button size="small" icon="el-icon-back" @click="$router.go(-1)">返回</el-button>
                </div>
            </div>
            <el-form :model="objForm" :rules="rules" ref="objForm" label-width="100px" class="u-form">
                <el-form-item label="所属角色" prop="group_id">
                    <el-select v-model="objForm.group_id" class="u-w-block" placeholder="请选择所属角色" clearable>
                        <el-option :label="role.title" :value="role.id" v-for="role in groupList" :key="role.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="objForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                    <el-input v-model="objForm.password" placeholder="请输入登录密码，不填则为默认密码123456"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="realname">
                    <el-input v-model="objForm.realname" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <upload file-folder="admin" :file-arr="fileList" list-type="picture-card" :limit="1"
                        accept="image/jpeg, image/png" tips="只能上传jpg/png文件，且不超过4MB" @getUploadFiles="getUploadFiles">
                    </upload>
                </el-form-item>

            </el-form>
        </el-card>
    </div>
</template>

<script>
import commonEdit from '@/mixins/common-edit'
import Upload from "@/components/upload/upload";

export default {
    components: {
        Upload
    },
    mixins: [commonEdit],
    data() {
        return {
            apiName: 'authUser',
            backRoute: 'authUser',
            groupList: [],
            fileList: [],
            objForm: {
                id: '',
                username: '',
                password: '',
                realname: '',
                group_id: '',
                status: 1,
                avatar: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { max: 30, message: '最大长度30个字符', trigger: 'blur' }
                ],
                password: [
                    { min: 6, max: 16, message: '密码长度6-16位', trigger: 'blur' }
                ],
                realname: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' },
                    { max: 30, message: '最大长度30个字符', trigger: 'blur' }
                ],
                group_id: [
                    { required: true, message: '请选择角色', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        getAuthGroupList() {
            this.$api.authGroup.all().then(response => {
                if (response.code == 1) {
                    this.groupList = response.data.groupList
                }
            })
        },
        getUploadFiles(files) {
            this.fileList = files;
            this.objForm.avatar = files[0]["url"];
        }
    },
    created() {
        this.getAuthGroupList()
    }
}
</script>