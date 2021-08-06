<template>
    <div class="page">
      <el-dialog
        :visible.sync="dialogVisible"
        width="90%"
        :before-close="handleClose">
        <table-component :msg="titledata" ref="tableRef"></table-component>
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
      <div style="width: 90%; margin: 0 auto;">
        <div class="title">
            <el-row>
              <el-col :span="3">
                <el-button 
              icon="el-icon-back" 
              style="float:left;margin-left:20px"
              size="small" 
              type="primary"
              @click="onClickReturn">返回管理列表</el-button>
              </el-col>
                <el-col :span="18">
                    项目信息
                </el-col>
                <el-col :span="3">
            <el-button icon="el-icon-plus" 
                           size="small"
                           style="float: right;margin-right:20px"
                           type="primary" 
                           @click="onClickAddTable"
                >添加表</el-button>
                </el-col>
            </el-row>
        </div>
        <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick()" style="width:95%;margin:0 auto">
        <el-tab-pane name="tableSettings">
          <span slot="label" style="font-size: 16px; font-weight: bold;">表信息</span>
          <el-table v-loading="loading" :data="tablesData" style="width: 100%;" align="center">
            <el-table-column prop="name" label="表名" align="center"/>
            <el-table-column prop="info" label="描述" align="center"/>
            <el-table-column prop="updateTime" label="更新时间" align="left" />
            <el-table-column label="操作" width="300" align="center">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" size="mini" type="warning" @click="onClickEdit(scope.row.name)" plain>修改</el-button>
                    <el-button icon="el-icon-delete" size="mini" type="danger" @click="onClickDeteleTable(scope.row.name)" plain>删除</el-button>
                </template>
            </el-table-column>
          </el-table>
          
          </el-tab-pane>
        <el-tab-pane name="configSettings">
          <span slot="label" style="font-size: 16px; font-weight: bold;">配置信息</span>
            <config-component ref="configRef"></config-component>
            <el-button icon="el-icon-check" 
                     style="float:right; margin-top:20px"
                     size="small"
                     type="success" 
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
        console.log(this.projectName)
        service.get('/user/getTables').then(res => {
            if (res.data.code === 200) {
                this.tablesData = res.data.data
            }
        })
        this.tablesData.push({
                name: 'test_TableName',
                info: 'test_info',
                updateTime: '2021/8/3',
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
            this.refreshTableForm()
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
        onClickDeteleTable(tableName) {
            this.$confirm('是否删除该表?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                type: 'success',
                message: '删除成功!'
                });
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
        onClickSaveConfig(){
            this.$refs.configRef.onClickSave()
        },
        handleClick(){
            if(this.activeName == 'configSettings'){
        	    // 触发配置管理事件,给配置组件内的信息做初始化
        	this.getConfigInfo()
            }
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
            },
        getConfigInfo(){
            //测试数据
            this.$refs.configRef.initConfigData(this.configData)
            service.get('/user/getConfig').then(res => {
              if (res.data.code === 200) {
                this.configData = res.data.data
                this.$refs.configRef.initConfigData(this.configData)
              }
            })
        },
        getTableInfo(tableName){
            //测试数据
            this.$refs.tableRef.initTableData(this.tableData)
            service.get({
                url:'/user/getTable',
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
    margin-top: 20px;
    margin-bottom: 40px;
    font-size: 25px;
    font-weight: bold;
    line-height: 30px;
}
.top-button-container{
    text-align: right;
}
</style>