<template>
    <div class="page">
      <el-card style="width: 90%; margin: 0 auto;">
        <div class="title">生成表管理</div>
        <div class="top-button-container">
            <el-button icon="el-icon-plus" size="small" type="success" @click="onClickGenerator">新增</el-button>
            <el-button icon="el-icon-download" size="small" type="warning">导出</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%; margin: 15px auto" align="center">
            <el-table-column prop="name" label="表名" align="center"/>
            <el-table-column prop="age" label="描述" align="center"/>
            <el-table-column prop="updateTime" label="更新时间" align="center" />
            <el-table-column label="操作" width="300" align="right">
                <template>
                    <el-button icon="el-icon-edit" size="small" type="primary" @click="onClickEdit">编辑</el-button>
                    <el-button icon="el-icon-close" size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
import service from '@/http/http'
import codeUser from '../code/index'
export default {
    //export default:指定模块的默认输出，在其他模块中可以import
    name: 'UserManager',
    data() {
        return {
            tableData: null,
            updateTime: null,
        }
    },
    mounted() {
        service.get('/user/findAll').then(res => {
            if (res.data.code === 200) {
                this.tableData = res.data.data
            }
        })

    },
    methods: {
        onClickEdit() {
            console.log('click')
            this.$router.push('/code')
        },
        onClickGenerator() {
            console.log('click')
            this.$router.push('/generator')
        }
    },
    components:{
        codeUser
    }
}
</script>

<style scoped>
.page{
    padding: 20px;
}
.title{
    margin-top: 20px;
    font-size: 25px;
    font-weight: bold;
    line-height: 30px;
}
.top-button-container{
    text-align: right;
}
</style>