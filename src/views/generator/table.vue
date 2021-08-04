<template>
  <div style="padding:20px">
    <el-form ref="tableData" :model="tableData" size="small" label-width="90px">
        <el-card style="width: 90%; margin: 0 auto;  margin-bottom:50px;">
          <div class="table-header">
            新建表
            <el-button icon="el-icon-check" 
                      size="small"
                      style="float: right; margin-right:20px"
                      type="success" 
                      @click="generator"
            >保存</el-button>
            </div>
            <el-row style="font-weight:bold; text-align:left; margin-left:3px; margin-top:15px">
              <el-form-item label="表名" prop="tableName" style="height:35px; width:68%;">
                  <el-input v-model="tableData.tableName"></el-input>
              </el-form-item>
            </el-row>
            <div class="table-field-header">
              <el-row :gutter="40">
                <el-col :span="3" style="text-align: left">字段名称</el-col>
                <el-col :span="3" style="text-align: left">字段类型</el-col>
                <el-col :span="3" style="text-align: left">字段描述</el-col>
                <el-col :span="2" style="text-align: left">长度</el-col>
                <el-col :span="2" style="text-align: left">精度</el-col>
                <el-col :span="2">不是Null</el-col>
                <el-col :span="2">是否主键</el-col>
                <el-col :span="2">是否唯一</el-col>
                <el-col :span="4">操作</el-col>
              </el-row>
            </div>
            <div v-for="(item, index) in tableData.properties" :key="'property' + index" style="border-bottom:1px solid #e9e9e9; margin-left:48px; margin-bottom:10px;">
                <el-row :gutter="30" style="margin-bottom:10px;">
                  <el-col :span="3">
                    <template prop="item.name">
                      <el-input v-model="item.name" size="small"></el-input>
                    </template>
                  </el-col>
                  <el-col :span="3">
                    <template prop="item.type">
                      <el-select v-model="item.type" size="small">
                          <el-option label="int" value="int"/>
                          <el-option label="varchar"  value="varchar"/>
                          <el-option label="double"  value="double"/>
                          <el-option label="float"  value="float"/>
                          <el-option label="datetime" value="datetime"/>
                      </el-select>
                    </template>
                  </el-col>
                  <el-col :span="3">
                    <template prop="item.comment">
                      <el-input v-model="item.comment" size="small"></el-input>
                    </template>
                  </el-col>
                  <el-col :span="2">
                    <template prop="item.length">
                      <el-input v-model="item.length" size="small"></el-input>
                    </template>
                  </el-col>
                  <el-col :span="2">
                    <template prop="item.precision">
                      <el-input v-model="item.precision" size="small"></el-input>
                    </template>
                  </el-col>
                  <el-col :span="2"  style="margin: auto">
                    <template prop="item.isNotNull">
                      <el-checkbox true-label=1 false-label=0 v-model="item.isNotNull"></el-checkbox>
                    </template>
                  </el-col>
                  <el-col :span="2">
                    <template prop="item.isPrimary">
                      <el-checkbox true-label=1 false-label=0 v-model="item.isPrimary"></el-checkbox>
                    </template>
                  </el-col>
                  <el-col :span="2">
                    <template prop="item.isUnique">
                      <el-checkbox true-label=1 false-label=0 v-model="item.isUnique"></el-checkbox>
                    </template>
                  </el-col>
                  <el-col :span="4">
                    <template prop="item.name">
                      <el-button @click="resetField(item)" type="success" size="mini" icon="el-icon-refresh-right" plain>清空</el-button>
                      <el-button @click="deleteField(item)" type="danger" size="mini" icon="el-icon-delete" plain>删除</el-button>
                    </template>
                  </el-col>
                </el-row>
            </div>
            <div style="margin-left:35px; margin-top:20px">
                <el-button icon="el-icon-plus"
                           size="small"
                           style="float: right; margin-bottom: 20px; margin-right:50px"
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
            tableData: {
                tableName:'',
                properties: [
                    // {
                    //     name: '',
                    //     type: '',
                    //     comment: '',
                    //     length: '',
                    //     precision: '',
                    //     isNotNull: 0,
                    //     isPrimary: 0,
                    //     isUnique: 0
                    // }
                ],
                generateTime: '',
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
        save(){
            this.addDate()
            service.post('/user/table', {
                // id:1,
                // name:"sakura"
                tableName:this.tableData.tableName,
                properties:this.tableData.properties,
                generateTime:this.tableData.generateTime
                //configData:this.configData
            })
            service.post('')
            .then(res => {
                if (res.data.code === 200) {
                    console.log(res.data)
                    this.generateSuccess(res.data.data)
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
            this.tableData.generateTime = date.year + '-' + newmonth + '-' + day
        },
        addField() {
            this.tableData.properties.push({
                name: '',
                type: '',
                comment: '',
                length: '',
                precision: '',
                isNotNull: 0,
                isPrimary: 0,
                isUnique: 0
            })
        },
        deleteField(item) {
            var index = this.tableData.properties.indexOf(item)
            if (index !== -1) {
                this.tableData.properties.splice(index, 1)
            }
        },
        resetField(item) {
            this.deleteField(item)
            this.addField()
        },
        generateSuccess(data) {
            var info = ''
            if (data){
                info = '生成成功'
            }
            else{
                info = '生成失败'
            }
            this.$alert(info, '结果', {
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
    padding-bottom: 30px;
    margin-top: 20px;
    margin-bottom: 40px;
    font-size: 25px;
    font-weight: bold;
    line-height: 30px;
    border-bottom:1px solid #e9e9e9;
}
.table-field-header{
    height: 30px;
    margin: 20px 0px 15px 48px;
    padding-top: 10px;
    padding-left: 5px;
    font-weight: bold;
    font-size: 14px;
    color: rgb(94, 94, 94);
    background-color: #ececec;
    border-bottom:1px solid #e9e9e9;
    border-top:1px solid #e9e9e9;
}
.config-input{
    height:35px; 
    width:50%;
    margin-left:45px;
}
.edit-input {
    border: 1px solid #e5e6e7;
}
</style>