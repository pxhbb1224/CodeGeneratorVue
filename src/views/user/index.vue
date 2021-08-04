<template>
    <div class="page">
      <el-card style="width: 90%; margin: 0 auto;">
        <div class="title">
            项目管理
            <el-button 
              icon="el-icon-plus" 
              style="float:right; margin-right:20px;"
              size="small" 
              type="primary"
              @click="onClickGenerator">新建项目</el-button>
        </div>
        <el-table v-loading="loading" :data="projectData" style="width: 100%;" align="center">
            <el-table-column prop="name" label="项目名" align="center"/>
            <el-table-column prop="info" label="描述" align="center"/>
            <el-table-column prop="tableCount" label="表数量" align="center"/>
            <el-table-column prop="updateTime" label="更新时间" align="left" />
            <el-table-column label="操作" width="200" align="center">
                <template>
                    <el-button icon="el-icon-edit" size="mini" type="warning" @click="onClickEdit" plain>配置</el-button>
                    <el-button icon="el-icon-delete" size="mini" type="danger" plain>删除</el-button>
                </template>
            </el-table-column>
            <el-table-column label="管理表" width="200" align="center">
                <template>
                    <el-button icon="el-icon-view" size="mini" type="success" @click="onClickViewTables" plain>查看</el-button>
                    <el-button icon="el-icon-plus" size="mini" type="primary" @click="onClickAddTable" plain>新增</el-button>
                </template>
            </el-table-column>
            <el-table-column label="生成" width="200" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" icon="el-icon-download" type="primary" @click="onClickDownload(scope.row.name)" plain>下载</el-button>
                    <el-button size="mini" icon="el-icon-view" type="success" @click="onClickAddTable" plain>预览</el-button>
                </template>
            </el-table-column>
        </el-table>
      </el-card>
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
        onClickViewTables() {
            console.log('click')
            this.$router.push('/view')
        },
        onClickGenerator() {
            console.log('clickGenerator')
            this.$router.push('/generator')
        },
        onClickAddTable() {
            console.log('clickTable')
            this.$router.push('/table')
        },
        onClickDownload(projectName) {
            console.log(projectName)
            service.post('/user/generate',{projectName:projectName}).then(res => {
            //     if (res.data.code === 200) {
            //         console.log('success')
            // }
                let link = document.createElement("a");
                link.href = window.URL.createObjectURL(new Blob([res.data]));
                link.target = "_blank";
                //文件名和格式
                link.download = projectName + ".zip";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);   
          })
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