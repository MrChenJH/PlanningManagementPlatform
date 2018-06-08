<template>
  <div> 
 <el-row :gutter="20">
   <el-col :span="2" :offset="1">  <el-button>添加</el-button></el-col>
   <el-col :span="2" ><el-button>删除</el-button></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="5" :offset="1"><el-input   placeholder="请输入内容"></el-input></el-col>
  <el-col :span="2" ><el-button>查询</el-button></el-col>

</el-row>
<el-row  :gutter="20">
    <el-col :span="23" :offset="1"> 
     <TableDefined :coldatas="tableData1"  v-on:rowSave="handleClick"  :colNames="colNames"></TableDefined>
    </el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="5" :push="13"> 
         <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>


  </el-col>
  

</el-row>
    </div>
</template>
<script>
 import TableDefined from '@/components/TableDefined'

export default {
    methods: {
      handleClick(v) {
        v.then(t=>{
        console.log(1)
        console.log(t)
        })
      },
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    components: {
    TableDefined
  },
  props:{

  },

    data() {
      return { currentPage1: 5,
        tableData1:[
          {'index':1,
          "b":2,
          "c":4,
          "6":6},
          {'index':2,
          "b":2,
          "c":4,
          "6":6}
            ],
        colNames:[],
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    }
  }
</script>
<style>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>


