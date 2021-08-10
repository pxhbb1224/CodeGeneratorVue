<template>
    <div class="page">
      <el-dialog
        :visible.sync="dialogVisible"
        width="90%"
        :before-close="handleClose">
        <table-component :msg="titledata" ref="tableRef" @closeFatherDialog="closeFatherDialog"></table-component>
        <span slot="footer" class="dialog-footer" style="margin-right:65px;">
          <el-button icon="el-icon-close"
                     size="small" 
                     type="primary" 
                     @click="dialogVisible = false">取 消</el-button>
          <el-button icon="el-icon-check" 
                     size="small"
                     type="success" 
                     @click="onClickSaveTable()"
                  >保存</el-button>
        </span>
      </el-dialog>
      <div style="width: 100%; margin: 0 auto;">
        <div class="title">
            <el-row>
              <el-col :span="3">
                <el-button 
              icon="el-icon-back" 
              style="float:left;margin-left:40px"
              size="small" 
              type="primary"
              @click="onClickReturn">返回管理列表</el-button>
              </el-col>
                <el-col :span="18">
                    {{this.projectName}}
                </el-col>
                <el-col :span="3">
            <el-button icon="el-icon-plus" 
                           size="small"
                           style="float: right;margin-right:40px"
                           type="primary" 
                           @click="onClickAddTable"
                >添加表</el-button>
                </el-col>
            </el-row>
        </div>
        <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick()" style="width:100%;margin:0 auto">
        <el-tab-pane name="tableSettings">
          <span slot="label" style="font-size: 16px; font-weight: bold;">表信息</span>
          <el-table v-loading="loading" :data="tablesData" style="width: 100%; margin-top:20px" align="center" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column prop="tableName" label="表名" align="center"/>
            <el-table-column prop="comment" label="描述" align="center"/>
            <el-table-column prop="generateTime" label="更新时间" align="left" />
            <el-table-column label="操作" width="300" align="center">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" size="mini" type="warning" @click="onClickEdit(scope.row.tableName)" plain>修改</el-button>
                    <el-button icon="el-icon-delete" size="mini" type="danger" @click="onClickDeteleTable(scope.row.tableName)" plain>删除</el-button>
                </template>
            </el-table-column>
          </el-table>
          </el-tab-pane>
        <el-tab-pane name="configSettings">
          <span slot="label" style="font-size: 16px; font-weight: bold;">配置信息</span>
            <el-descriptions :column="2" border v-if="ifShowEdit" style="width:98%;margin:auto;margin-top:20px">
                <el-descriptions-item label="项目名">{{configData.projectName}}</el-descriptions-item>
                <el-descriptions-item label="项目描述" >{{configData.description}}</el-descriptions-item>
                <el-descriptions-item label="包名">{{configData.packageName}}</el-descriptions-item>
                <el-descriptions-item label="作者名">{{configData.authorName}}</el-descriptions-item>
                <el-descriptions-item label="去表前缀">{{configData.prefix}}</el-descriptions-item>
            </el-descriptions>
            
            <config-component ref="configRef" v-if="ifShowSave" style="margin-top:20px"></config-component>
            
            <el-button icon="el-icon-edit" 
                     style="float:right; margin-top:20px"
                     size="small"
                     type="warning" 
                     v-if="ifShowEdit"
                     @click="onClickEditConfig()"
                  >修改</el-button>

            <el-button icon="el-icon-check" 
                     style="float:right; margin-top:20px"
                     size="small"
                     type="success" 
                     v-if="ifShowSave"
                     @click="onClickSaveConfig()"
                  >保存</el-button>
        </el-tab-pane>
      </el-tabs>

        
      </div>
    </div>
</template>

<script>
import service from '@/http/http'
import table from '@/views/generator/table'
import config from '@/views/generator/config'
export default {
    //export default:指定模块的默认输出，在其他模块中可以import
    name: 'Settings',
    data() {
        return {
            titledata:'',
            dialogVisible: false,
            tabPosition: 'top',
            activeName: 'tableSettings',
            loading:true,
            ifShowEdit:true,
            ifShowSave:false,

            projectName: '',
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
        this.projectName = this.$route.query.projectName
        console.log('projectName' + this.projectName)
        this.getTablesInfo()
        this.tablesData.push({
                tableName: 'test_TableName',
                comment: 'test_info',
                generateTime: '2021/8/3',
            })
        this.loading = false

    },
    methods: {
        onClickReturn(){
            this.$router.go(-1)
        },
        onClickAddTable() {
            this.titledata = '添加表'
            this.dialogVisible =  true,
            this.$nextTick(() => {
                this.refreshTableForm()
            })
            console.log('clickAddTable') 
        },
        onClickEdit(tableName){
            this.titledata = '修改表信息'
            this.dialogVisible =  true,
            this.$nextTick(() => {
                this.getTableInfo(tableName)
            })
            console.log('Edit')
        },
        onClickDeteleTable(currTableName) {
            this.$confirm('是否删除该表?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(currTableName)
                console.log(this.projectName)
                service.post('/user/deleteTable', {
                        tableName:currTableName,
                        projectName:this.projectName}
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
            this.$refs.tableRef.save(this.projectName)
        },
        onClickEditConfig(){
            this.ifShowSave = true
            this.ifShowEdit = false
            this.$nextTick(() => {
                this.$refs.configRef.initConfigData(this.configData)
            })
        },
        onClickSaveConfig(){
            this.$refs.configRef.onClickSave()
        },
        handleClick(){
            if(this.activeName == 'configSettings'){
        	    // 触发配置管理事件,给配置组件内的信息做初始化
        	
            this.getConfigInfo()
            
            this.ifShowSave = false
            this.ifShowEdit = true
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
            this.dialogVisible = false
            this.getTablesInfo()
        },
        getTablesInfo(){
            service.post('/user/sendTable', {projectName:this.projectName}).then(res => {
                if (res.data.code === 200) {
                    this.tablesData = res.data.data
                }
            })
        },
        getConfigInfo(){
            //测试数据
            //this.$refs.configRef.initConfigData(this.configData)
            service.post('/user/sendConfig',{projectName:this.projectName}).then(res => {
              if (res.data.code === 200) {
                this.configData = res.data.data
              }
            })
        },
        getTableInfo(tableName){
            //测试数据
            //this.$refs.tableRef.initTableData(this.tableData)
            service.post({
                url:'/user/sendTable',
                data:{
                    tableName:tableName, 
                    projectName:this.projectName
                }
            }).then(res => {
              if (res.data.code === 200) {
                this.tableData = res.data.data
                this.$refs.tableRef.initTableData(this.tableData)
              }
            })
        },
        refreshTableForm(){
            this.$refs.tableRef.refresh()
        }
    },
    components:{
        'table-component':table,
        'config-component':config
    }
}
</script>

<style scoped>
.page{
    padding: 20px;
}
.title{
    text-align: center;
    margin-bottom: 20px;
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
</style>