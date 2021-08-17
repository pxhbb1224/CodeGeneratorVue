<template>
    <div>
        <el-dialog
        :visible.sync="tableDialogVisible"
        width="90%"
        top=5vh
        :before-close="handleClose">
        <table-component :msg="tableTitle" ref="tableRef" @closeFatherDialog="closeFatherTableDialog"></table-component>
        <span slot="footer" class="dialog-footer" style="margin-right:65px;">
          <el-button icon="el-icon-close"
                     size="small" 
                     type="primary" 
                     @click="tableDialogVisible = false">取 消</el-button>
          <el-button icon="el-icon-check" 
                     size="small"
                     type="success" 
                     @click="onClickSaveTable()"
                  >保存</el-button>
        </span>
        </el-dialog>

        <el-dialog
        :visible.sync="configDialogVisible"
        width="80%"
        top=5vh
        :before-close="handleClose">
        <generator-component :msg="configTitle" ref="generateRef" @closeFatherDialog="closeFatherConfigDialog"></generator-component>
        <span slot="footer" class="dialog-footer" style="margin-right:65px;">
          <el-button icon="el-icon-close"
                     size="small" 
                     type="primary" 
                     @click="configDialogVisible = false">取 消</el-button>
          <el-button icon="el-icon-check" 
                     size="small"
                     type="success" 
                     @click="onClickSaveConfig()"
                  >保存</el-button>
        </span>
        </el-dialog>
          <div style="width:100%;margin:0 auto" v-if="ifShowTablesInfo">
            <el-table stripe v-loading="loading" :data="tablesData" style="width: 100%;font-family:Microsoft YaHei" align="center" :header-cell-style="{background:'#69829C',color:'#E3F1F7'}">
              <el-table-column prop="tableName" label="表名" align="center"/>
              <el-table-column prop="comment" label="描述" align="center"/>
              <el-table-column prop="generateTime" label="更新时间" align="center" />
              <el-table-column label="操作" width="500" align="center">
                <template slot-scope="scope">
                    <el-dropdown trigger="click" @command="handleCommand" placement=bottom-start style="margin-right:10px">
                        <el-button 
                            icon="el-icon-arrow-down" 
                            size="mini" type="success" 
                            @click="onClickShareTable()" 
                            plain>共享</el-button>
                        <el-dropdown-menu slot="dropdown">
                            <div v-for="(item, index) in projectData" :key="index">
                                <el-dropdown-item divided :command="beforeHandleCommand(item, scope.row)">{{item.name}}</el-dropdown-item>
                            </div>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button icon="el-icon-edit" size="mini" type="warning" @click="onClickEdit(scope.row)" plain>修改</el-button>
                    <el-button icon="el-icon-delete" size="mini" type="danger" @click="onClickDeteleTable(scope.row)" plain>删除</el-button>
                    
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="width:100%;margin:0 auto" v-if="ifShowConfigInfo">
            <div class="config-title">配置信息</div>
            <el-descriptions :column="1" border style="margin:auto;margin-top:2px;font-family:Microsoft YaHei">
                <el-descriptions-item label="项目名" :labelStyle="{'width':'200px'}">{{configData.projectName}}</el-descriptions-item>
                <el-descriptions-item label="项目描述" :labelStyle="{'width':'200px'}">{{configData.description}}</el-descriptions-item>
                <el-descriptions-item label="包名" :labelStyle="{'width':'200px'}">{{configData.packageName}}</el-descriptions-item>
                <el-descriptions-item label="作者名" :labelStyle="{'width':'200px'}">{{configData.authorName}}</el-descriptions-item>
                <el-descriptions-item label="去表前缀" :labelStyle="{'width':'200px'}">{{configData.prefix}}</el-descriptions-item>
            </el-descriptions>
            
            <el-button icon="el-icon-edit" 
                     style="float:right; margin-top:20px; margin-right:10px"
                     size="small"
                     type="warning" 
                     plain
                     @click="onClickEditConfig()"
                  >修改</el-button>
        </div>
    </div>
</template>

<script>
import service from '@/http/http'
import table from '@/views/generator/table'
import config from '@/views/generator/config'
import generator from '@/views/generator/index'
export default {
    //export default:指定模块的默认输出，在其他模块中可以import
    name: 'Settings',
    props:["project"],
    data() {
        return {
            tableTitle:'',
            configTitle: '修改项目信息',
            tableDialogVisible: false,
            configDialogVisible: false,
            loading:true,
            ifShowTablesInfo: true,
            ifShowConfigInfo:false,

            projectData:[],
            tablesData:[],
            configData:{
                packageName: 'com.sakura',
                authorName: 'sakura',
                prefix: 'tb_',
                needCovered: 0,
                projectName: 'projectData1',
                description: '项目1'
            },
            tableData: {
                tableName:'table1',
                properties: [
                    {
                        name: 'id',
                        type: 'int',
                        comment: 'ID号',
                        length: '20',
                        precision: '',
                        isNotNull: 0,
                        isPrimary: 0,
                        isUnique: 0
                    }
                ],
                generateTime: '',
            }
        }
    },
    mounted() {
        console.log('projectName ' + this.project.name)
        this.tablesData.push({
                tableName: 'test_TableName',
                comment: 'test_info',
                generateTime: '2021/8/3',
            })
        this.loading = false

    },
    methods: {
        onClickShareTable() {
            console.log('clickShareTable') 
            this.getProjectsInfo()
        },
        onClickAddTable() {
            console.log('clickAddTable') 
            this.tableTitle = '新建表'
            this.tableDialogVisible =  true
            this.$nextTick(() => {
                this.refreshTableForm()
            })
        },
        onClickEdit(table){
            this.tableTitle = '修改表信息'
            this.tableDialogVisible =  true,
            this.$nextTick(() => {
                this.getTableInfo(table)
            })
        },
        onClickDeteleTable(currTable) {
            this.$confirm('是否删除该表?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(currTable.tableName)
                console.log(this.project.name)
                service.post('/user/deleteTable', {
                        tableId:currTable.tableId,
                        projectId:this.project.id}
                    ).then(res => {
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
        onClickSaveTable(){
            this.$refs.tableRef.save(this.project)
        },
        onClickEditConfig(){
            this.configDialogVisible = true
            this.$nextTick(() => {
                this.$refs.generateRef.initConfigData(this.configData)
            })
        },
        onClickSaveConfig(){
            this.$nextTick(() => {
                this.$refs.generateRef.onClickSave()
            })
        },
        handleClick(activeName){
            console.log(activeName)
            if(activeName == 'configSettings'){
        	    // 触发配置管理事件,给配置组件内的信息做初始化
                this.getConfigInfo()
            
                this.ifShowSave = false
                this.ifShowEdit = true

                this.ifShowTablesInfo = false
                this.ifShowConfigInfo = true
            }
            if(activeName == 'tableSettings'){
                this.ifShowTablesInfo = true
                this.ifShowConfigInfo = false
            }
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        beforeHandleCommand(shareProject, table) { 
            // 给handleCommand返回一个对象，而不是一个值
            return {
                'shareProject': shareProject,
                'table': table
            }
        },
        handleCommand(command) {
            var currProjectName = command.shareProject.name
            this.$confirm('是否将表 ' + command.table.tableName +  ' 共享给项目 '+ currProjectName, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(command.shareProject.id)
                console.log(command.table.tableId)
                service.post('/user/shareTable', {projectId:command.shareProject.id,tableId:command.table.tableId}).then(res => {
                    console.log(res.data.data)
                    if (res.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '共享成功!'
                        });
                        location.reload()
                    }
                    else{
                        this.$message({
                            type: 'warning',
                            message: '共享失败!'
                        });
                    }
                })    
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消共享'
                });          
            });
        },
        closeFatherTableDialog(){
            //在关闭时重新请求tables数据
            this.tableDialogVisible = false
            this.getTablesInfo()
        },
        closeFatherConfigDialog(){
            //在关闭时重新请求config数据
            this.configDialogVisible = false
            this.getConfigInfo()
            this.getCurrProject()
        },
        getTablesInfo(){
            console.log("getTablesInfo")
            service.post('/user/sendTable', {projectId:this.project.id}).then(res => {
                if (res.data.code === 200) {
                    this.tablesData = res.data.data
                }
            })
        },
        getConfigInfo(){
            //测试数据
            //this.$refs.configRef.initConfigData(this.configData)
            console.log("getConfigInfo")
            service.post('/user/sendConfig',{projectId:this.project.id}).then(res => {
              if (res.data.code === 200) {
                this.configData = res.data.data
              }
            })
        },
        getTableInfo(table){
            console.log('Edit')
            //测试数据
            //this.$refs.tableRef.initTableData(this.tableData)
            service.post('/user/sendOneTable', 
            {tableId:table.tableId}).then(res => {
              if (res.data.code === 200) {
                this.tableData = res.data.data
                this.$nextTick(() => {
                    this.$refs.tableRef.initTableData(this.tableData)
                })
              }
            })
        },
        getProjectsInfo(){
            service.get('/user/sendProjectData').then(res => {
              if (res.data.code === 200) {
                console.log(res.data.data)
                this.projectData = res.data.data
                for(let i = 0;i < this.projectData.length;i++){
                    if(this.projectData[i].name === this.project.name){
                        this.projectData.splice(i,1)
                        return
                    } 
                }
            }
            })           
        },
        getCurrProject(){
            console.log("getCurrProject")
            service.post('/user/sendProject',{projectId:this.project.id}).then(res => {
              if (res.data.code === 200) {
                console.log(res.data.data)
                this.project.name = res.data.data.config.projectName
                this.project.tableCount = res.data.data.count
                this.project.info = res.data.data.config.description
                this.project.generateTime = res.data.data.config.generateTime
                this.$emit('update:changeTitle', res.data.data.config.projectName)
                }
            })    
        },
        refreshTableForm(){
            this.$refs.tableRef.refresh()
        }
    },
    components:{
        'table-component':table,
        'config-component':config,
        'generator-component':generator
    }
}
</script>

<style scoped>
.title{
    text-align: center;
    margin-bottom: 40px;
    font-size: 28px;
    font-weight: bold;
    line-height: 30px;
}
.config-info{
    text-align: center;
    margin-bottom: 20px;
    font-size: 15px;
    font-weight: bold;
    line-height: 30px;
}
.top-button-container{
    text-align: right;
}
.config-title{
    height:40px;
    background:#69829C;
    color:#dae7ec;
    font-weight: bold;
    line-height: 40px;
    text-align: left;
    padding-left: 12px;
}
.my-label {
    background:#69829C;
    color:#dae7ec
  }
.el-dropdown-link {
    cursor: pointer;
  }
</style>