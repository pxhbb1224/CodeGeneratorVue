<template>
    <div class="page">
        <div class="title">用户管理列表</div>
        <div class="top-button-container">
            <el-button type="success">新增</el-button>
            <el-button type="warning">导出</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%; margin: 15px auto" align="center">
            <el-table-column prop="name" label="姓名" align="center"/>
            <el-table-column prop="age" label="年龄" align="center"/>
            <el-table-column prop="updateTime" label="更新时间" align="center" />
            <el-table-column label="操作" width="300" align="right">
                <template slot-scope="scope">
                    <el-button type="primary">编辑</el-button>
                    <el-button type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import service from '@/http/http'
export default {
    name: 'UserManager',
    data() {
        return {
            tableData: null
        }
    },
    mounted() {
        service.get('/user/findAll').then(res => {
            if (res.data.code === 200) {
                this.tableData = res.data.data
            }
        })
    }
}
</script>

<style scoped>
.page{
    padding: 20px;
}
.title{
    font-size: 35px;
    line-height: 45px;
}
.top-button-container{
    text-align: right;
}
</style>