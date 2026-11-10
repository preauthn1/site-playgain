<template>
    <div class="layout-header">
        <div class="collapse u-left" @click="toggleSider">
            <i class="iconfont el-icon-s-fold u-f-20" v-show="!isCollapse"></i>
            <i class="iconfont el-icon-s-unfold u-f-20" v-show="isCollapse"></i>
        </div>

        <slot></slot>

        <ul class="navs u-right">
            <li>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <img :src="defaultAvatar" class="avatar">
                        <span class="u-pl-10">{{ realname }}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="iconfont hg-icon-jichu" @click.native="resetRedis" v-if="hasPerm('cachesBtn')">重置缓存</el-dropdown-item>
                        <el-dropdown-item icon="iconfont hg-icon-mima1" @click.native="jumpPage('editpwd')" v-if="hasPerm('editpwd')">修改密码</el-dropdown-item>
                        <el-dropdown-item icon="iconfont hg-icon-tuichu" @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
    </div>
</template>

<script>
    import defaultAvatar from '@/assets/imgs/avatar.svg'
    import { mapActions,mapGetters} from 'vuex'

    export default {
        name: "LayoutHeader",
        data(){
            return {
                defaultAvatar:defaultAvatar
            }
        },
        computed: {
            ...mapGetters({
                isCollapse: "siderCollapsed",
                avatar:"avatar",
                realname:"realname"
            })
        },
        methods:{
            ...mapActions([
                'handleLogOut'
            ]),
            toggleSider() {
                this.$store.dispatch("toggleSider")
            },
            jumpPage(name){
                this.$router.push({name:name}).catch(()=>{})
            },
            resetRedis(){
                this.$confirm("此操作将重新生成缓存, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$api.caches.create().then(response => {
                        if(response.code==1){
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            })
                        }
                    })
                }).catch(()=>{})
            },
            logout(){
                this.$confirm("此操作将退出系统, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.handleLogOut()
                }).catch(()=>{})
            }
        }
    }
</script>
