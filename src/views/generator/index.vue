<template>
  <div>
        <div style="width: 95%; margin: 0 auto;"> 
            <div class="table-header">
              <el-row>
                <el-col :span="24">
                    {{msg}}
                </el-col>
            </el-row>
            </div>
          <config-component ref="configRef" @closeFatherDialog="closeFatherDialog"></config-component>
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
    props:["msg"],
    created() {
        console.log('created')
    },
    mounted() {
      console.log('mounted')  
    },
    methods: {
        onClickSave(){
          this.$refs.configRef.onClickSave()
        },
        initConfigData(configData){
          this.$nextTick(() => {
            this.$refs.configRef.initConfigData(configData)
          })
        },
        closeFatherDialog(){
          //传递给user/index
          this.$emit('closeFatherDialog');
        }
    },
    components:{
      'config-component':config
    }
}
</script>

<style scoped>
.table-header{
    margin-bottom: 30px;
    font-size: 25px;
    font-weight: bold;
    line-height: 20px;
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