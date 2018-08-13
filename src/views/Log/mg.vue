<template>
  <div> 

<el-row :gutter="10">
  <el-col :span="8" style="padding:0px">  
     <el-date-picker
    style="width:100%"
      v-model="dateS"
      type="daterange"
      
      start-placeholder="开始日期"
      end-placeholder="结束日期"
       :default-time="['00:00:00', '23:59:59']"
>
    </el-date-picker>
</el-col>
   <el-col :span="10"  style="padding-left: 10px;"><el-button type="primary" @click="search">查询</el-button><el-button type="primary" @click="exprot"> 导出</el-button></el-col>

</el-row>
<el-row  :gutter="20">
    <el-col :span="24" > 
     <el-table :data="showData"  border fit highlight-current-row style="width: 100%" @select="select" @select-all="select">
         <el-table-column align="center"
             type="selection"
             width="55" 
            >
             </el-table-column> 

    <el-table-column align="center" label="序号" 
          width="50">
          <template slot-scope="scope"> 
            <span>{{scope.row.id}}</span>
        </template>
   </el-table-column> 
        <el-table-column align="center" label="日志来源" width="150">
         <template slot-scope="scope"> 
         
         <span >{{scope.row.source}}</span>
        </template>
      </el-table-column>
      
      <el-table-column  label="操作内容" align="center" min-width="500px"  >
       <template slot-scope="scope"> 
         <span >{{scope.row.content}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="操作人" align="center"  min-width="100px" >
       <template slot-scope="scope"> 
         <span >{{scope.row.ationtor}}</span>
        </template>
      </el-table-column>
       
          <el-table-column  label="操作时间" align="center"  min-width="150px" >
       <template slot-scope="scope"> 
         <span >{{scope.row.ationTime}}</span>
        </template>
      </el-table-column>
      
    </el-table>
    </el-col>
</el-row> 
<el-row :gutter="20">
   <el-col :span="14" :offset="10" style="text-align:right"> 
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
        :page-sizes="[10,15, 20, 25, 30]"
      :page-size="pageSize1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-col>
</el-row>



</div>
</template>
<script>

 import  TableDefined from '@/components/TableDefined'
 import  {office,addRole,RoleS}  from '@/api/role'
 import  {Users} from '@/api/user'
 import  {exportToCsv} from '@/utils/tool'

  Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}
 export default {
    methods: {
      exprot(){ 
        let data=this.tableData;
        data.unshift( {id:"序号",node:"流程节点",nodeName:'节点名称' ,creatorName:'创建人',creatorTime:"创建时间",edit:false},);
        exportToCsv("流程管理.csv",data)
      },
      search(){ 
        if(this.dateS){

         let data= this.tableData.filter(r=>
         {   
             let d=new Date(r.ationTime)
       
             return   d>=this.dateS[0] && d<=this.dateS[1]
         })
         this.showData=[];
         data.forEach((x,i) => 
           {  
                if(i>=(this.currentPage-1)*this.pageSize1&&i<this.currentPage*this.pageSize1)
                {
                                this.showData.push(x); 
                }
           });
           this.total=data.length;
        }
      },
      select(r,i){
      this.selectRows=r;

      },
      removeAll(){
         for(let item of this.selectRows.values()){

              console.log(item)
              let i=this.tableData.findIndex(r=>r.id==item.id) 
              this.tableData.splice(i,1);
        }
        this.search() 
        this.$message({
           message: '删除成功',
           type: 'success'
          })
      },
      remove(row)
      {
        let i= this.tableData.findIndex(r=>r.id==row.id)
        this.tableData.splice(i,1); 
        this.search() 
          this.$message({
           message: '删除成功',
           type: 'success'
          })
      },
      update(row){
          this.$message({
           message: '修改成功',
           type: 'success'
          })
           this.dialogFormVisible=false;
           row.edit = false
      },
      cancelEdit(row) { 
      console.log( row.edit);
      row.title = row.originalTitle
      row.edit = false
        this.$message({
        message: '修改成功',
        type: 'success'
      })
    },
    confirmEdit(row) {
      console.log(row);
      row.edit = false
      row.originalTitle = row.title
    
    },
     Save(){
            
            let  id= this.tableData.length+1; 
            this.tableData.unshift({id,node:this.obj.node,nodeName:this.obj.nodeName,creator:"admin",creatorTime: new Date().format("yyyy-MM-dd hh:mm:ss"),edit:false})
                  this.dialogFormVisible=false;
            this.$message({
              message: '保存成功',
              type: 'success'
               })
               this.search()
      
      },
      handleSizeChange(val) {  
           this.pageSize1=val;
          
         
      },
      handleCurrentChange(val) {
           this.currentPage=val;
           this.showData=[];
           this.tableData.forEach((x,i) => 
           {
                if(i>=(this.currentPage-1)*this.pageSize1&&i<this.currentPage*this.pageSize1)
                {
                                this.showData.push(x); 
                }
           });
      }
    },
    components: {
    TableDefined
  },
  props:{

  },
  mounted(){  
           this.total=this.tableData.length
           this.showData=[];
           this.tableData.forEach((x,i) => 
           {     
             console.log(x)
             console.log(i)
             if(i>=((this.currentPage-1)*this.pageSize1)&&i<(this.currentPage*this.pageSize1))
                {
                                this.showData.push(x); 
                }
           });

           console.log( this.showData)
     },
    data() {
      return {
     pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
   
        dateS: '',
        total:400,
        pageSize1:10,
        selectRows:[],
        listLoading: true,
         listQuery: {
           page: 1,
         limit: 10
         },
        users:[],
        office:[],
        obj:{
           node:'',
           nodeName:'',
           workDay:''
          },
        currentPage: 1,
        dialogFormVisible:false,
        showData:[],

        tableData:[
          {id:1,ationTime:"2018-06-01 16:10",ationtor:'admin' ,content:"登录",source:"登录模块"},
          {id:2,ationTime:"2018-06-01 16:11",ationtor:'admin' ,content:"删除流程图节点1",source:"流程管理模块"},
          {id:3,ationTime:"2018-06-01 16:12",ationtor:'admin' ,content:"修改流程图节点2",source:"计划管理模块"},
          {id:4,ationTime:"2018-06-01 16:13",ationtor:'admin' ,content:"新增流程图节点3",source:"权限管理模块"}, 
          {id:5,ationTime:"2018-06-01 16:13",ationtor:'admin' ,content:"增加用户cjh1",source:"权限管理模块"},
          {id:6,ationTime:"2018-06-01 16:14",ationtor:'admin' ,content:"增加用户cjh1",source:"权限管理模块"},
          {id:7,ationTime:"2018-06-01 16:14",ationtor:'admin' ,content:"增加用户cjh2",source:"权限管理模块"},
          {id:8,ationTime:"2018-06-01 16:19",ationtor:'admin' ,content:"增加用户cjh3",source:"权限管理模块"},
          {id:9,ationTime:"2018-06-01 16:20",ationtor:'admin' ,content:"增加用户cjh4",source:"日志管理模块"},
          {id:10,ationTime:"2018-06-01 16:21",ationtor:'admin' ,content:"增加用户cjh7",source:"日志管理模块"}, 
          {id:11,ationTime:"2018-06-01 16:13",ationtor:'admin' ,content:"新增计划",source:"计划管理模块"},
          ]
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

  .edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
} 

.el-dialog__header{
    height: 100%;
    width: 100%;
    background: inherit;
    background-color: rgba(245, 245, 245, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(223, 223, 223, 1)

}
.textSpan{
font-size: 14px;
height: 40px;
line-height: 40px;
width: 60px;

}


th.is-leaf {
  
    background: inherit;
    background-color: rgba(245, 245, 245, 1);
    box-sizing: border-box;
    border-width: 0px;
    border-style: solid;
    border-color: rgba(223, 223, 223, 1);
}
</style>


