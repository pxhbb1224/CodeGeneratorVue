<template>
    <div class="page">
      <el-dialog
        :visible.sync="dialogVisible"
        width="80%"
        top=5vh
        :before-close="handleClose">
        <generator-component :msg="configTitle" ref="generateRef" @closeFatherDialog="closeFatherDialog"></generator-component>
        <span slot="footer" class="dialog-footer" style="margin-right:65px;">
          <el-button icon="el-icon-close"
                     size="small" 
                     type="primary" 
                     @click="dialogVisible = false">取 消</el-button>
          <el-button icon="el-icon-check" 
                     size="small"
                     type="success" 
                     @click="onClickSaveProject()"
                  >保存</el-button>
        </span>
        </el-dialog>
      <el-container style="height:100%">
        <el-aside width="200px">
            <el-menu
            :default-active=menuActive
            class="el-menu-vertical-demo"
            text-color="#3C4E61"
            background-color="#69829C"
            active-text-color="#E3F1F7"
            style="font-weight: bold;height:100%; text-align:left"
            @select="handleSelect">
            <div class="menutitle">
                <i class="el-icon-s-promotion"></i>
                代码生成器平台</div>
            <el-menu-item index="1" style="padding-left:25px">
                <i class="el-icon-menu" style="color:#3C4E61;"></i>
                <span slot="title">项目列表</span>
            </el-menu-item>
            <el-menu-item index="2" style="padding-left:25px">
                <i class="el-icon-folder-add" style="color:#3C4E61;"></i>
                <span slot="title">新建项目</span>
            </el-menu-item>
            <el-submenu index="3" v-if="ifShowManager">
                <template slot="title">
                    <i class="el-icon-folder-opened" style="color:#3C4E61;padding-left:6px" ></i>
                    <span slot="title"  style="font-size: 17px;">项目管理</span>
                </template>
                <el-menu-item index="3-1" v-if="ifShowManager" class="el-submenu-item">
                    <i class="el-icon-tickets" style="color:#3C4E61;"></i>
                    <span slot="title" style="font-size: 14px;">实体列表</span>
                </el-menu-item>
                <el-menu-item index="3-2" v-if="ifShowManager">
                    <i class="el-icon-s-tools" style="color:#3C4E61;"></i>
                    <span slot="title" style="font-size: 14px;">配置管理</span>
                </el-menu-item>
                <el-menu-item index="3-3" v-if="ifShowManager">
                    <i class="el-icon-document-add" style="color:#3C4E61;"></i>
                    <span slot="title" style="font-size: 14px;">添加实体</span>
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container>
          <el-header style="width: 100%;">
              <div class="title">
                <el-row>
                  <el-col :span="21" style="padding-left:162px">
                    {{title}}
                  </el-col>
                  <el-col :span="3">
                    <el-button 
                    icon="el-icon-plus" 
                    style="float:right; margin-right:20px;"
                    size="small" 
                    type="primary"
                    plain
                    @click="onClickAdd">{{addText}}</el-button>
                  </el-col>
                </el-row>
              </div>
          </el-header>
          <el-main style="margin-top:43px">
            <settings-component ref="settingsRef" :project="currProject" v-if="ifShowSettings" :changeTitle.sync="title"></settings-component>
            <div  v-if="ifShowMain">
              <el-table stripe v-loading="loading" :data="projectData" style="width: 100%;font-family:Microsoft YaHei" :header-cell-style="{background:'#69829C',color:'#E3F1F7'}">
                <el-table-column prop="name" label="项目名" align="center"/>
                <el-table-column prop="info" label="描述" align="center"/>
                <el-table-column prop="tableCount" label="表数量" align="center"/>
                <el-table-column prop="generateTime" label="更新时间" align="center" />
                <el-table-column label="操作" width="400" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" icon="el-icon-download" type="primary" @click="onClickDownload(scope.row)" plain>生成</el-button>
                    <el-button icon="el-icon-s-help" size="mini" type="warning" @click="onClickSettings(scope.row)" plain>管理</el-button>
                    <el-button icon="el-icon-delete" size="mini" type="danger" @click="onClickDeteleProject(scope.row)" plain>删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import service from '@/http/http'
import settings from '@/views/user/settings'
import generator from '@/views/generator/index'
export default {
    //export default:指定模块的默认输出，在其他模块中可以import
    name: 'UserManager',
    data() {
        return {
            menuActive:"1",
            currProject:'',
            configTitle: '新建项目',
            title:'项目管理',
            addText:'新建项目',
            dialogVisible: false,
            ifShowSettings : false,
            ifShowMain: true,
            ifShowManager:false,
            projectData:[],
            loading:true,

            iconColor: []

        }
    },
    mounted() {
        this.getProjectsInfo()
        this.initIconColor(1)
        this.projectData.push({
                name: 'test_projectName',
                info: 'test_info',
                tableCount: 3,
                updateTime: '2021/8/3',
            })
        this.loading = false

    },
    methods: {
        initIconColor(key){
            for(var i = 0;i<5;i++){
                var currName = 'iconColor'+i.toString()
                this.iconColor.push(currName)
            }
            this.changeIconColor(key)
        },
        changeIconColor(key){
            for(var i = 0;i < 5;i++){
                if((i+1).toString() == key){
                    this.iconColor[i] = 'color:#E3F1F7'
                }
                else{
                    this.iconColor[i] = 'color:#3C4E61'
                }
            }
        },
        onClickAdd() {
            console.log('clickAdd')
            if(this.ifShowMain){
                this.dialogVisible =  true
                // this.$router.push('/generator')
            }
            else{
                this.$refs.settingsRef.onClickAddTable()
            }
        },
        onClickSettings(project) {
            console.log('clickSettings')
            this.menuActive = "3-1"
            // this.changeIconColor(3)
            this.currProject = project
            this.title = this.currProject.name
            this.addText = '添加实体'
            this.ifShowSettings = true
            this.ifShowMain = false
            this.ifShowManager = true
            
            this.$nextTick(() => {
                this.$refs.settingsRef.getTablesInfo()
            })
        },
        onClickDownload(project) {
            console.log(project.name)
            service.request({
                url: '/user/generate',
                method:'post',
                data: { projectId: project.id},
                responseType: 'blob'
            }).then(res => {
                let link = document.createElement("a");
                link.href = window.URL.createObjectURL(new Blob([res.data]));
                link.target = "_blank";
                //文件名和格式
                link.download = project.name + ".zip";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);   
            })
        },
        onClickDeteleProject(currProject) {
            this.$confirm('是否删除该项目(项目下所有内容均被删除)?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log('currProjectName' + currProject.name)
                service.post('/user/deleteProject', {projectId:currProject.id}).then(res => {
                    console.log(res.data.data)
                    if (res.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        location.reload()
                    }
                    else{
                        this.$message({
                            type: 'warning',
                            message: '删除失败!'
                        });
                    }
                })    
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
                });          
            });
        },
        onClickSaveProject(){
            this.$nextTick(() => {
                this.$refs.generateRef.onClickSave()
            })
        },
        handleSelect(key, keyPath) {
            // this.changeIconColor(key)
            console.log(key, keyPath);
            console.log(this.ifShowManager)
            if(key === "1"){
                this.title = "项目管理"
                this.addText = '新建项目'
                this.ifShowSettings = false
                this.ifShowMain = true
                this.ifShowManager = false
                this.getProjectsInfo()
            }
            console.log(this.title);
            if (key == "2") {
                this.dialogVisible =  true
            }
            if (key == "3-1"){
                this.$nextTick(() => {
                    // this.changeIconColor(2)
                    this.$refs.settingsRef.handleClick("tableSettings")
                })
            }
            if (key == "3-2"){
                this.$nextTick(() => {
                    // this.changeIconColor(3)
                    this.$refs.settingsRef.handleClick("configSettings")
                })
            }
            if (key == "3-3"){
                this.$nextTick(() => {
                    // this.changeIconColor(4)
                    this.$refs.settingsRef.onClickAddTable()
                })
            }
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        closeFatherDialog(){
            //在关闭时重新请求projects数据
            this.dialogVisible = false
            this.getProjectsInfo()
        },
        getProjectsInfo(){
            service.get('/user/sendProjectData').then(res => {
            if (res.data.code === 200) {
                this.projectData = res.data.data
            }
            })
        }

    },
    components:{
        'settings-component':settings,
        'generator-component':generator
    }
}
</script>

<style scoped>
.page{
    height:100%;
}
.menutitle{
    color: #E3F1F7;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    padding-top:50px;
    text-align: center;
    height:70px;
    border-bottom:3px solid #e9e9e9;
}
.title{
    font-size: 28px;
    font-weight: bold;
    line-height: 30px;
    height:70px;
    padding-top:50px;
    color: #546c86;
    
}
.top-button-container{
    text-align: right;
}
.el-container {
    height: 100%;
}
.el-menu-item{
    font-size: 17px;
}
.el-submenu-item{
    background-color:#404749;
}

</style>