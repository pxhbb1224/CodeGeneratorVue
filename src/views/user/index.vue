<template>
    <div class="page">
      <div style="width: 90%; margin: 0 auto;">
        <div class="title">
            <el-row>
              <el-col :span="21" style="padding-left:162px">
                    项目管理
              </el-col>
              <el-col :span="3">
                <el-button 
                    icon="el-icon-plus" 
                    style="float:right; margin-right:20px;"
                    size="small" 
                    type="primary"
                    @click="onClickAddProject">新建项目</el-button>
              </el-col>
            </el-row>
        </div>
        <el-table v-loading="loading" :data="projectData" style="width: 100%;" align="center">
            <el-table-column prop="name" label="项目名" align="center"/>
            <el-table-column prop="info" label="描述" align="center"/>
            <el-table-column prop="tableCount" label="表数量" align="center"/>
            <el-table-column prop="updateTime" label="更新时间" align="left" />
            <el-table-column label="操作" width="400" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" icon="el-icon-download" type="primary" @click="onClickDownload(scope.row.name)" plain>生成</el-button>
                    <el-button icon="el-icon-s-tools" size="mini" type="warning" @click="onClickSettings(scope.row.name)" plain>设置</el-button>
                    <el-button icon="el-icon-delete" size="mini" type="danger" @click="onClickDeteleProject(scope.row.name)" plain>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import service from '@/http/http'
export default {
    //export default:指定模块的默认输出，在其他模块中可以import
    name: 'UserManager',
    data() {
        return {
            
            projectData:[],
            loading:true
        }
    },
    mounted() {
        service.get('/user/findAll').then(res => {
            if (res.data.code === 200) {
                this.projectData = res.data.data
            }
        })
        this.projectData.push({
                name: 'test_projectName',
                info: 'test_info',
                tableCount: 3,
                updateTime: '2021/8/3',
            })
        this.loading = false

    },
    methods: {
        onClickAddProject() {
            console.log('clickAddProject')
            this.$router.push('/generator')
        },
        onClickSettings(projectName) {
            console.log('click')
            this.$router.push({  
                      path: '/view',   
                      name: 'View',  
                      query: {
                        projectName: projectName,
                      }
            })
        },
        onClickDownload(projectName) {
            console.log(projectName)
            service.request({
                url: '/user/generate',
                method:'post',
                data: { projectName: projectName},
                responseType: 'blob'
            }).then(res => {
                let link = document.createElement("a");
                link.href = window.URL.createObjectURL(new Blob([res.data]));
                link.target = "_blank";
                //文件名和格式
                link.download = projectName + ".zip";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);   
            })
        },
        onClickDeteleProject(projectName) {
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
        }

    },
    components:{
    }
}
</script>

<style scoped>
.page{
    padding: 20px;
}
.title{
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