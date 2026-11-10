export default {
    components:{},
    data(){
        return {
            apiName:'',
            backRoute:'',
            backPid:'',
            objForm:{id:''},
            submitFormEnd:true,
            rules:{},
            currentPage:1,
            resetInit:false
        }
    },
    methods:{
        beforeCreated(){},
        beforeGetInfo(){},
        afterGetInfo(){},
        beforeSubmit(){},
        submitEnd(){},
        async getInfo(){
            const self = this
            await self.beforeGetInfo()
            self.$api[self.apiName].info(self.objForm.id).then(response => {
                if(response.code==1){
                    self.objForm = response.data
                    self.afterGetInfo()
                }
            })
        },
        submitForm(formName) {
            if(!this.submitFormEnd){
                return;
            }
            this.submitFormEnd = false;
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    self.beforeSubmit()
                    self.$api[self.apiName].save(self.objForm).then(response => {
                        this.submitFormEnd = true;
                        if(response.code==1){
                            self.$message({
                                message:"操作成功",
                                type:"success"
                            })
                            self.$router.push({
                                name:self.backRoute,
                                params:{page:self.currentPage,id:self.backPid}
                            }).catch(()=>{})
                            self.submitEnd(1);
                        }else{
                            self.submitEnd(0);
                        }
                    })
                } else {
                    this.submitFormEnd = true;
                    return false
                }
            })
        }
    },
    created() {
        if(this.$route.params.id){
            this.objForm.id = this.$route.params.id
        }
        if(this.$route.params.page){
            this.currentPage = this.$route.params.page
        }
        this.beforeCreated();
        if(!this.resetInit){
            if(this.$route.params.id){
                this.getInfo()
            }else{
                this.beforeGetInfo()
            }
        }
    }
}
