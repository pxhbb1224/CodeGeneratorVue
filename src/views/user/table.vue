<template>
    <div class="page">
      <el-card style="width: 90%; margin: 0 auto;">
        <div class="title">
            表管理
            <el-button 
              icon="el-icon-plus" 
              style="float:right; margin-right:20px;"
              size="small" 
              type="primary"
              @click="onClickGenerator">保存</el-button>
        </div>
        <el-table v-loading="loading" :data="projectData" style="width: 100%;" align="center">
            <el-table-column prop="name" label="表名" align="center"/>
            <el-table-column prop="info" label="描述" align="center"/>
            <el-table-column prop="updateTime" label="更新时间" align="left" />
            <el-table-column label="操作" width="300" align="center">
                <template>
                    <el-button icon="el-icon-edit" size="mini" type="warning" @click="onClickEdit" plain>配置</el-button>
                    <el-button icon="el-icon-delete" size="mini" type="danger" plain>删除</el-button>
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
                name: 'test_TableName',
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