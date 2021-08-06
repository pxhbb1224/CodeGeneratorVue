<template>
  <div>
      <el-form ref="ConfigData" :model="configData" size="small" label-width="90px">
          <el-row style="margin-top:20px">
            <el-collapse v-model="activeNames">
              <el-collapse-item>
                <template slot="title">
                    <i class="info el-icon-info">项目信息</i>
                </template>
                <el-row style="margin-top:15px"/>
                <!-- <el-collapse-item title="项目信息" name="1"> -->
                <el-row style="font-weight:bold; text-align:left;">
                  <el-form-item label="项目名称" prop="projectName" class="config-input" label-width="100px">
                    <el-input v-model="projectData.projectName"></el-input>
                  </el-form-item>
                </el-row>
                <el-row style="font-weight:bold; text-align:left;">
                  <el-form-item label="描述" prop="description" class="config-input" label-width="100px">
                    <el-input v-model="projectData.description"></el-input>
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
            projectData:{
              projectName: '',
              description: ''
            },
            configData:{
              packageName: '',
              authorName: '',
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
        onClickReturn(){
          this.$router.go(-1)
        },
        onClickSave(){
            //this.generateSuccess(true)
            service.post('/user/config', {
                // id:1,
                // name:"sakura"
                packageName:this.configData.packageName,
                authorName:this.configData.authorName,
                prefix:this.configData.prefix,
                needCovered:this.configData.needCovered,
                description:this.projectData.description,
                projectName:this.projectData.projectName
            }).then(res => {
                if (res.data.code === 200 && res.data.data) {
                    console.log(res.data)
                    this.generateSuccess()
                }
                else{
                  this.generateFail()
                }
            }).catch(function (error) {
            console.log(error);
            });
        },
        generateSuccess() {
            this.$alert('保存成功', '结果', {
            confirmButtonText: '确定',
            // callback: action => {
            //     if(data){
            //       this.$confirm('是否添加表?', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'info'
            //       }).then(() => {
            //         this.$router.push({  
            //           path: '/view',   
            //           name: 'View',  
            //           params: {   
            //           projectName: this.projectData.projectName,   
            //           }
            //         })  
            //       }).catch(() => {
            //         this.$router.go(-1)        
            //       });
            //     }
            //   }
            });
        },
        generateFail() {
            this.$alert('保存失败', '结果', {
            confirmButtonText: '确定',
            // callback: action => {
            //     this.$message({
            //         type: 'info',
            //         message: `action: ${ action }`
            //     });
            // }
            });
        },
        initConfigData(configData){
            console.log("getConfigData")
            this.configData.packageName = configData.packageName,
            this.configData.authorName = configData.authorName,
            this.configData.prefix = configData.prefix,
            this.configData.needCovered = configData.needCovered,
            this.projectData.description = configData.description,
            this.projectData.projectName = configData.projectName
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