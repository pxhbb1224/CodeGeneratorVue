<template>
  <div style="padding:20px">
        <div style="width: 90%; margin: 0 auto; margin-bottom:50px;"> 
            <div class="table-header">
              <el-row>
              <el-col :span="3">
                <el-button icon="el-icon-back" 
                           size="small"
                           style="float: left; margin-left:20px"
                           type="primary" 
                           @click="onClickReturn"
                >返回管理列表</el-button>
              </el-col>
                <el-col :span="18">
                    新建项目
                </el-col>
                <el-col :span="3">
                  <el-button icon="el-icon-check" 
                           size="small"
                           style="float: right; margin-right:20px"
                           type="success" 
                           @click="onClickAdd"
                  >保存</el-button>
                </el-col>
            </el-row>
            </div>
          <config-component ref="configRef"></config-component>
        </div>
  </div>
</template>

<script>
import config from '@/views/generator/config'
export default {
    name: 'Generator',
    data() {
        return {}
    },
    created() {
        console.log('created')
    },
    mounted() {
      console.log('mounted')  
    },
    methods: {
        onClickReturn(){
          this.$router.go(-1)
        },
        onClickAdd(){
            this.$refs.configRef.onClickSave()
        }
    },
    components:{
      'config-component':config
    }
}
</script>

<style scoped>
.table-header{
    margin-top: 20px;
    margin-bottom: 40px;
    font-size: 25px;
    font-weight: bold;
    line-height: 30px;
}
.config-input{
    height:35px; 
    width:50%;
    margin-left:45px;
}
.edit-input {
    border: 1px solid #e5e6e7;
}
.info{
    text-align: left;
    margin-left:50px;
    font-weight: bold;
    font-size: 17px;
    color: rgb(94, 94, 94);
}
</style>