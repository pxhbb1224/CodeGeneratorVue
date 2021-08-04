<template>
  <div style="padding:20px">
    <el-form ref="ConfigData" :model="configData" size="small" label-width="90px">
        <el-card style="width: 90%; margin: 0 auto; margin-bottom:50px;"> 
            <div class="table-header">
            新建项目
                <el-button icon="el-icon-check" 
                           size="small"
                           style="float: right; margin-right:20px"
                           type="success" 
                           @click="generator"
                >生成</el-button>
            </div>
          <el-row style="margin-top:20px">
            <el-collapse v-model="activeNames">
              <el-collapse-item>
                <template slot="title">
                    <i class="info el-icon-info">项目信息</i>
                </template>
                <el-row style="margin-top:15px"/>
                <!-- <el-collapse-item title="项目信息" name="1"> -->
                <el-row style="font-weight:bold; text-align:left;">
                  <el-form-item label="项目名称" prop="packageName" class="config-input" label-width="100px">
                    <el-input v-model="configData.packageName"></el-input>
                  </el-form-item>
                </el-row>
                <el-row style="font-weight:bold; text-align:left;">
                  <el-form-item label="描述" prop="packageName" class="config-input" label-width="100px">
                    <el-input v-model="configData.packageName"></el-input>
                  </el-form-item>
                </el-row>
              </el-collapse-item>

              <el-collapse-item>
                <template slot="title">
                  <div class="info el-icon-s-tools">配置信息</div>
                </template>

                <el-row style="margin-top:15px"/>

                <el-row style="font-weight:bold; text-align:left;">
                  <el-form-item label="包名" prop="packageName" class="config-input" label-width="100px">
                    <el-input v-model="configData.packageName"></el-input>
                  </el-form-item>
                </el-row>

                <el-row style="font-weight:bold; text-align:left;">
                  <el-form-item label="作者名" prop="authorName" class="config-input" label-width="100px">
                    <el-input v-model="configData.authorName"></el-input>
                  </el-form-item>
                </el-row>

                <el-row style="font-weight:bold; text-align:left;">
                  <el-form-item label="去表前缀" prop="prefix" class="config-input" label-width="100px">
                    <el-input v-model="configData.prefix"></el-input>
                  </el-form-item>
                </el-row>

                <el-row style="font-weight:bold; text-align:left;">
                  <el-form-item label="是否覆盖" prop="needCovered" class="config-input" label-width="100px">
                    <el-switch
                        style="display: block; margin-top:6px;"
                        v-model="configData.needCovered"
                        active-color="#13ce66"
                        inactive-value=0
                        active-value=1>
                    </el-switch>
                  </el-form-item>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-row>
        </el-card>
    </el-form>
  </div>
</template>

<script>
import service from '@/http/http'
export default {
    name: 'Generator',
    data() {
        return {
            activeNames: ['1'],
            configData:{
                packageName: '',
                authorName: '',
                moduleName: '',
                frontEndPath: '',
                interfaceName: '',
                prefix: '',
                needCovered: 0
            }
        }
    },
    created() {
        console.log('created')
    },
    mounted() {
      console.log('mounted')  
    },
    methods: {
        generator(){
            service.post('/user/config', {
                // id:1,
                // name:"sakura"
                packageName:this.configData.packageName,
                authorName:this.configData.authorName,
                moduleName:this.configData.moduleName,
                frontEndPath:this.configData.frontEndPath,
                interfaceName:this.configData.interfaceName,
                prefix:this.configData.prefix,
                needCovered:this.configData.needCovered
            })
            service.post('')
            .then(res => {
                if (res.data.code === 200) {
                    console.log(res.data)
                    this.generateSuccess(res.data.data)
                }

            })
            .catch(function (error) {
            console.log(error);
            });
        },
        generateSuccess(data) {
            var info = ''
            if (data){
                info = '生成成功'
            }
            else{
                info = '生成失败'
            }
            this.$alert(info, '结果', {
            confirmButtonText: '确定',
            // callback: action => {
            //     this.$message({
            //         type: 'info',
            //         message: `action: ${ action }`
            //     });
            // }
            });
        },
        generateFail() {
            this.$alert('生成失败', '结果', {
            confirmButtonText: '确定',
            // callback: action => {
            //     this.$message({
            //         type: 'info',
            //         message: `action: ${ action }`
            //     });
            // }
            });
        }
    },
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