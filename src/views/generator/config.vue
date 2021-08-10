<template>
  <div>
      <el-row>
        <el-collapse v-model="activeNames">
          <el-collapse-item name='1'>
            <template slot="title">
                <i class="info el-icon-info">项目信息</i>
            </template>
            <el-row style="margin-top:15px"/>
                <!-- <el-collapse-item title="项目信息" name="1"> -->
            <el-form ref="projectData" :rules="rules" :model="projectData" size="small" label-width="100px">
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
            </el-form>
        </el-collapse-item>
      
        <el-collapse-item name='2'>
            <template slot="title">
                <div class="info el-icon-s-tools">其他信息</div>
            </template>
            
            <el-row style="margin-top:15px"/>
            
            <el-form ref="configData" :rules="rules" :model="configData" size="small" label-width="100px">
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
            </el-form>

                <!-- <el-row style="font-weight:bold; text-align:left;">
                  <el-form-item label="是否覆盖" prop="needCovered" class="config-input" label-width="100px">
                    <el-switch
                        style="display: block; margin-top:6px;"
                        v-model="configData.needCovered"
                        active-color="#13ce66"
                        inactive-value=0
                        active-value=1>
                    </el-switch>
                  </el-form-item>
                </el-row> -->
        </el-collapse-item>
      </el-collapse>
    </el-row>
  </div>
</template>

<script>
import service from '@/http/http'
export default {
    name: 'Generator',
    data() {
        return {
            activeNames: ['1','2'],
            projectData:{
              projectName: '',
              description: '',
              generateTime: '',
            },
            configData:{
              packageName: '',
              authorName: '',
              prefix: '',
              needCovered: 0
            },
            rules: {
              projectName: [
              { required: true, message: '请输入项目名称', trigger: 'blur' },
              ],
            },
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
          this.validForm()
        },
        validForm(){
            this.$refs['projectData'].validate((valid) => {
            if (valid) {
              console.log("ProjectValid success")
              this.$message({
                    message:  `项目新建已提交`,
                    type: 'success'
              });
              this.addDate()
              service.post('/user/config', {
                // id:1,
                // name:"sakura"
                packageName:this.configData.packageName,
                authorName:this.configData.authorName,
                prefix:this.configData.prefix,
                needCovered:this.configData.needCovered,
                description:this.projectData.description,
                projectName:this.projectData.projectName,
                generateTime:this.projectData.generateTime
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
            } else {
              console.log('error submit!!');
              this.$message({
                message:  `请完成必填信息`,
                type: 'warning'
              });
              return false;
            }
          });
        },
        generateSuccess() {
            this.$alert('保存成功', '结果', {
            confirmButtonText: '确定',
            callback: action => {
                this.$router.go(-1)
            }
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
        },
        add0(m){
	        return m<10?'0'+m : m
        },
        addDate(){
            var time = new Date()
	        var y = time.getFullYear()
	        var m = time.getMonth()+1
	        var d = time.getDate()
	        var h = time.getHours()
	        var mm = time.getMinutes()
	        var s = time.getSeconds()
            var nowTime = y+'/'+this.add0(m)+'/'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s)
            this.projectData.generateTime = nowTime
            console.log(nowTime)
        }
    },
}
</script>

<style scoped>
.table-header{
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