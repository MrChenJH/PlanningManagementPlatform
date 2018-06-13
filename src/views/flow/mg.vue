<template>
  <div> 
 <el-row :gutter="20">
   <el-col :span="1" > <el-button  size="small"  type="primary" @click="dialogFormVisible=true">添加</el-button></el-col>
   <el-col :span="1" style="padding-left: 20px;"><el-button  size="small" @click="removeAll"  type="danger">删除</el-button></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="5" >  
   <el-input   v-model="sUserName" placeholder="请输入节点名称"></el-input></el-col>
   <el-col :span="1" ><el-button type="primary" @click="search">查询</el-button></el-col>
   <el-col :span="2" style="padding-left: 40px;" ><el-button type="primary" @click="exprot"> 导出</el-button></el-col>
</el-row>
<el-row  :gutter="20">
    <el-col :span="23" > 
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
        <el-table-column align="center" label="流程节点" width="80">
         <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
            <el-input v-model="scope.row.node" placeholder="请输入流程节点"></el-input>
          </template> 
         <span v-else>{{scope.row.node}}</span>
        </template>
      </el-table-column>
      
      <el-table-column min-width="100px"  label="节点名称" align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
            <el-input v-model="scope.row.nodeName" placeholder="请输入节点名称"></el-input>
          </template> 
         <span v-else>{{scope.row.nodeName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px"  label="工作日" align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
            <el-input v-model="scope.row.workDay" placeholder="请输入工作日"></el-input>
          </template> 
        <span v-else>{{scope.row.workDay}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="创建人" align="center">
        <template slot-scope="scope"> 
             <span  >{{scope.row.creator}}</span>
        </template>
      </el-table-column>


      <el-table-column class-name="status-col" width="190"  label="创建时间" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.creatorTime}}</span>
        </template>
      </el-table-column>


     <el-table-column align="center" label="操作" width="200px">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
          <el-button  type="success" @click="update(scope.row)"          size="small" >保存</el-button>
          <el-button  type="warning" @click="cancelEdit(scope.row)"      size="small">取消</el-button>
          </template>
          <template v-else>
          <el-button type="primary" @click='scope.row.edit=!scope.row.edit' size="small">编辑</el-button> 
          <el-button type="danger"  @click='remove(scope.row)' size="small">删除</el-button> 
          </template>
        </template>
      </el-table-column>

    </el-table>
    </el-col>
</el-row> 
<el-row :gutter="20">
  <el-col :span="5" :push="13"> 
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10, 20, 30, 40]"
      :page-size="pageSize1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-col>
</el-row>

<el-dialog title="流程管理" :visible.sync="dialogFormVisible" >
    

  <el-row> 
    <el-col :span="3"  style="text-align: right;    padding-right: 5px;"><span class="textSpan" > 流程节点:</span></el-col> 
    <el-col :span="8"><el-input type="text" v-model="obj.node"/></el-col> 
    <el-col :span="3"  style="text-align: right;    padding-right: 5px;"><span class="textSpan"> 节点名称:</span></el-col> 
    <el-col :span="8"><el-input  v-model="obj.nodeName"/></el-col>
  </el-row> 
  <el-row > 
   <el-col :span="3"   style="text-align: right;    padding-right: 5px;"><span     class="textSpan">工作日:</span></el-col> 
   <el-col :span="8">   <el-input  type="text" v-model="obj.workDay"/></el-col> 
   <el-col :span="3"    style="text-align: right;    padding-right: 5px;"><span    class="textSpan"></span></el-col> 
   <el-col :span="8">  </el-col>
 </el-row>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="Save">确 定</el-button>
  </div>

</el-dialog>

</div>
</template>
<script>

 import  TableDefined from '@/components/TableDefined'
 import  {office,addRole,RoleS}  from '@/api/role'
 import  {Users} from '@/api/user'
 import {exportToCsv} from '@/utils/tool'
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
        let data= this.tableData.filter(r=>r.nodeName.includes(this.sUserName))
         this.showData=[];
         data.forEach((x,i) => 
           {  
                if(i>=(this.currentPage-1)*this.pageSize1&&i<this.currentPage*this.pageSize1)
                {
                                this.showData.push(x); 
                }
           });
           this.total=data.length;
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
        sUserName:'',
        total:400,
        pageSize1:5,
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
          {id:1,node:"节点1",nodeName:'专题会' ,workDay:"5",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:2,node:"节点2",nodeName:'主任专题会',workDay:"5",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:3,node:"节点3",nodeName:'指南会商',workDay:"5",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:4,node:"节点4",nodeName:'主任办公会',workDay:"5",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:5,node:"节点5",nodeName:'指南发布',workDay:"5",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:6,node:"节点6",nodeName:'分组提交日',workDay:"5",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:7,node:"节点7",nodeName:'专家评审',workDay:"5",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:8,node:"节点8",nodeName:'立项会商',workDay:"5",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:9,node:"节点9",nodeName:'主任办公会',workDay:"5",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:10,node:"节点10",nodeName:'内发文签发日',workDay:"5",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
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


