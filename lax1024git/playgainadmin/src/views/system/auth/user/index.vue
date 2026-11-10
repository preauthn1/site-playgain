<template>
    <div class="u-p-20">
        <el-card shadow="never">
            <div slot="header">
                <b class="u-f-16">用户列表</b>
                <router-link :to="{name:'authUserEdit'}" v-if="hasPerm('authUserEdit')">
                    <el-button type="danger" size="small" icon="el-icon-plus" round class="u-right u-5mt">添加</el-button>
                </router-link>
            </div>

            <el-form :inline="true" :model="queryForm" size="small" class="u-text-center">
                <el-form-item label="角色">
                    <el-select v-model="queryForm.group_id" clearable>
                        <el-option label="全部" value=""></el-option>
                        <el-option :label="role.title"
                                   :value="role.id"
                                   v-for="role in groupList"
                                   :key="role.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="queryForm.status" clearable>
                        <el-option label="全部" value=""></el-option>
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="queryForm.keyword" placeholder="输入用户姓名查询"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="getPageData(true)">查询</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="tableData" class="u-mt-10">
                <el-table-column label="序号" type="index" :index="getIndexNo" width="100"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="姓名" prop="realname"></el-table-column>
                <el-table-column label="角色" prop="group_title"></el-table-column>
                <el-table-column label="用户状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status"
                                   :active-value="1"
                                   :inactive-value="0"
                                   active-color="#13ce66"
                                   @change="handleStatus(scope.row.id,scope.row.status)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="添加日期" prop="create_time"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="handleRoute(scope.row.id,'authUserEdit')" v-if="hasPerm('authUserEdit')">编辑</el-button>
                        <el-button size="mini" type="text" @click="handleDelete(scope.row.id)" v-if="hasPerm('authUserDelBtn')">删除</el-button>
                        <el-button size="mini" type="text" @click="handleDelCache(scope.row.id)" v-if="hasPerm('authUserDelCacheBtn')">清除缓存</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="u-mt-20 u-text-center">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handlePageChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40,50]"
                        :page-size="limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import commonPage from '@/mixins/common-page'

    export default {
        mixins:[commonPage],
        data() {
            return {
                apiName:'authUser',
                groupList:[],
                queryForm:{
                    group_id:'',
                    status:'',
                    keyword:''
                }
            }
        },
        methods: {
            afterOnLoad(){
                this.$api.authGroup.all().then(response => {
                    if(response.code==1){
                        this.groupList = response.data.groupList
                    }
                })
            },
            handleDelCache(id){
                this.$confirm('确认清除用户缓存吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.authUser.delcache(id).then(response => {
                        if(response.code==1){
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            })
                        }
                    })
                }).catch(()=>{})
            }
        }
    }
</script>