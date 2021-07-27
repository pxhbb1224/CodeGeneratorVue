<template>
  <div class="app-container">
    <el-form ref="userTableData" :model="userTableData" size="small" label-width="90px">
        <el-card style="width: 80%; margin: 0 auto;" shadow="never">
            <div class="table-header">
              <el-row style="font-size: 20px; text-align:left; margin-left:30px">
                  <p>配置表</p>
              </el-row>
            </div>
            <el-row style="font-weight:bold; text-align:left; margin-left:3px">
              <el-form-item label="表名" prop="tableName" style="height:35px; width:68%;">
                  <el-input v-model="userTableData.tableName"></el-input>
              </el-form-item>
            </el-row>
            <div class="table-field-header">
              <el-row :gutter="40">
                <el-col :span="4" style="text-align: left">字段名称</el-col>
                <el-col :span="3" style="text-align: left">字段类型</el-col>
                <el-col :span="2" style="text-align: left">长度</el-col>
                <el-col :span="2">不是Null</el-col>
                <el-col :span="2">是否主键</el-col>
                <el-col :span="2">是否唯一</el-col>
                <el-col :span="4">操作</el-col>
              </el-row>
            </div>
            <div v-for="(item, index) in userTableData.properties" :key="'property' + index" style="border-bottom:1px solid #e9e9e9; margin-left:48px; margin-bottom:10px;">
                <el-row :gutter="30" style="margin-bottom:10px;">
                  <el-col :span="4">
                    <template prop="item.name">
                      <el-input v-model="item.name" size="small"></el-input>
                    </template>
                  </el-col>
                  <el-col :span="3">
                    <template prop="item.type">
                      <el-select v-model="item.type" size="small">
                          <el-option label="int" value="int"/>
                          <el-option label="varchar"  value="varchar"/>
                          <el-option label="datetime" value="datetime"/>
                      </el-select>
                    </template>
                  </el-col>
                  <el-col :span="2">
                    <template prop="item.length">
                      <el-input v-model="item.length" size="small"></el-input>
                    </template>
                  </el-col>
                  <el-col :span="2"  style="margin: auto">
                    <template prop="item.isNotNull">
                      <el-checkbox v-model="item.isNotNull"></el-checkbox>
                    </template>
                  </el-col>
                  <el-col :span="2">
                    <template prop="item.isPrimary">
                      <el-checkbox v-model="item.isPrimary"></el-checkbox>
                    </template>
                  </el-col>
                  <el-col :span="2">
                    <template prop="item.isUnique">
                      <el-checkbox v-model="item.isUnique"></el-checkbox>
                    </template>
                  </el-col>
                  <el-col :span="4">
                    <template prop="item.name">
                      <el-button @click="resetField(item)" type="success" size="mini" icon="el-icon-refresh-right" plain></el-button>
                      <el-button @click="deleteField(item)" type="danger" size="mini" icon="el-icon-delete" plain></el-button>
                    </template>
                  </el-col>
                </el-row>
            </div>
            <div style="margin-left:35px;">
                <el-button icon="el-icon-check" 
                           size="mini"
                           style="float: right; padding: 6px 9px; margin-bottom: 10px"
                           type="primary" 
                           @click="generator"
                >生成</el-button>
                <el-button
                           icon="el-icon-plus"
                           size="mini"
                           style="float: right; padding: 6px 9px; margin-bottom: 10px; margin-right:10px"
                           type="primary"
                           @click="addField"
                >新增字段</el-button>
            </div>
        </el-card>
    </el-form>
  </div>
</template>

<script>
import service from '@/http/http'
export default {
    name: 'Generator',
    data() {
        return {
            userTableData: {
                tableName:'',
                properties: [
                    {
                        name: '',
                        type: '',
                        length: '',
                        isNotNull: false,
                        isPrimary: false,
                        isUnique: false
                    }
                ],
                generateTime: ''
            }
        }
    },
    created() {
        console.log('created')
    },
    mounted() {
      console.log('mounted')  
    },
    methods: {
        generator(){
            this.addDate()
            service.post('/user/generator', {
                // id:'1',
                // name:'sakura',
                // age:'23'
                tableName:this.userTableData.tableName,
                properties:this.userTableData.properties,
                generateTime:this.userTableData.generateTime
            })
            .then(res => {
                if (res.data.code === 200) {
                    this.generateSuccess()
                }
            })
            .catch(function (error) {
            console.log(error);
            });
        },
        addDate(){
            const nowDate = new Date();
            const date = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1,
                date: nowDate.getDate(),
            }
            const newmonth = date.month>10?date.month:'0'+date.month
            const day = date.date>10?date.date:'0'+date.date
            // this.updateTime = date.year + '-' + newmonth + '-' + day
            this.userTableData.generateTime = date.year + '-' + newmonth + '-' + day
        },
        addField() {
            this.userTableData.properties.push({
                name: '',
                type: '',
                length: '',
                isNotNull: false,
                isPrimary: false,
                isUnique: false
            })
        },
        deleteField(item) {
            var index = this.userTableData.properties.indexOf(item)
            if (index !== -1) {
                this.userTableData.properties.splice(index, 1)
            }
        },
        resetField(item) {
            this.deleteField(item)
            this.addField()
        },
        generateSuccess() {
            this.$alert('生成成功', '结果', {
            confirmButtonText: '确定',
            // callback: action => {
            //     this.$message({
            //         type: 'info',
            //         message: `action: ${ action }`
            //     });
            // }
            });
        },
        generateFail() {
            this.$alert('生成失败', '结果', {
            confirmButtonText: '确定',
            // callback: action => {
            //     this.$message({
            //         type: 'info',
            //         message: `action: ${ action }`
            //     });
            // }
            });
        }
    },
}
</script>

<style scoped>
.table-header{ 
    margin-bottom: 25px;
    border-bottom:1px solid #e9e9e9;
    font-weight: bold;
}
.table-field-header{
    height: 30px;
    margin-bottom: 15px;
    margin-left:48px;
    padding-top: 10px;
    padding-left: 5px;
    font-weight: bold;
    font-size: 14px;
    color: rgb(94, 94, 94);
    background-color: #ececec;
    border-bottom:1px solid #e9e9e9;
    border-top:1px solid #e9e9e9;
}
.edit-input {
    border: 1px solid #e5e6e7;
}
</style>