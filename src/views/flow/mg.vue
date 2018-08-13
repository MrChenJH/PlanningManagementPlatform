<template>
  <div> 
 <el-row :gutter="20">
   <el-col :span="1" > <el-button  size="small"  type="primary" @click="add">添加</el-button></el-col>
   <el-col :span="1" style="padding-left: 20px;"><el-button  size="small" @click="removeAll"  type="danger">删除</el-button></el-col>
</el-row>
<el-row :gutter="20">
<el-col :span="5" style="padding-left: 10px;padding-right:0px">  
   <el-input   v-model="sUserName" placeholder="请输入节点名称"></el-input></el-col>
   <el-col :span="1" ><el-button type="primary" @click="search">查询</el-button></el-col>
   <el-col :span="2" style="padding-left: 40px;" ><el-button type="primary" @click="exprot"> 导出</el-button></el-col>
</el-row>
<el-row  :gutter="20">
    <el-col :span="24" > 
     <el-table :data="showData"  border fit highlight-current-row style="width: 100%" @select="select" @select-all="select">
         <el-table-column align="center"
             type="selection"
              width="55">
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


  <el-dialog
      width="30%"
      title="提示"
      :visible.sync="innerVisible1"
      > 
         <el-row> 
           <el-col :span="24" style="color: red;padding-right: 5px;">
            {{alertcontent}}
           </el-col>
           </el-row> 
    </el-dialog>

<el-dialog title="流程管理" :visible.sync="dialogFormVisible" >
    <el-dialog
      width="30%"
      title="提示"
      :visible.sync="innerVisible"
      custom-class=""
      append-to-body> 
         <el-row> 
           <el-col :span="24" style="color: red;padding-right: 5px;">
            {{alertcontent}}
           </el-col>
           </el-row> 
    </el-dialog>
    <el-form :model="obj" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
 
  <el-row>  
    <el-col :span="11">
      <el-form-item label="流程节点" prop="node">
    <el-input v-model="obj.node"></el-input>
  </el-form-item>
  </el-col> 
    <el-col :span="11">
      <el-form-item label="节点名称" prop="nodeName">
    <el-input v-model="obj.nodeName"></el-input>
  </el-form-item>
  </el-col> 
    <!-- <el-col :span="3"  style="text-align: right;    padding-right: 5px;"><span class="textSpan" > 流程节点:</span></el-col> 
    <el-col :span="8"><el-input type="text" v-model="obj.node"/></el-col> 
    <el-col :span="3"  style="text-align: right;    padding-right: 5px;"><span class="textSpan"> 节点名称:</span></el-col> 
    <el-col :span="8"><el-input  v-model="obj.nodeName"/></el-col> -->
  </el-row> 
  <el-row> 
  <el-col :span="11">
      <el-form-item label="工作日" prop="workDay">
           <el-input v-model="obj.workDay"></el-input>
     </el-form-item>
  </el-col> 
  </el-row>
   </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="Save">确 定</el-button>
  </div>

</el-dialog>

</div>
</template>
<script>

 import {SetFlowData,GetFlowData } from '@/utils/tool'
 import  TableDefined from '@/components/TableDefined'
 import  {office,addRole,RoleS}  from '@/api/role'
 import  {Users} from '@/api/user'
 import {exportToCsv} from '@/utils/tool'


 export default {
    methods: {
      add(){
          debugger; 
          if( this.$refs["ruleForm"]){
          this.$refs["ruleForm"].resetFields() }
          this.dialogFormVisible=true
      },
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
    if(this.selectRows.length==0){

              this.innerVisible1=true,
              this.alertcontent="请选择要删除数据"
        }
        if(!this.innerVisible1){

          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.selectRows.forEach((item,i)=>{
               let index=this.tableData.findIndex(r=>r.id==item.id) 
               this.tableData.splice(index,1);
        })
        SetFlowData(this.tableData)
        this.search() 
        this.$message({
           message: '删除成功',
           type: 'success'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        }
      },
      remove(row)
      {

                  this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         let i= this.tableData.findIndex(r=>r.id==row.id)
        this.tableData.splice(i,1); 
        SetFlowData(this.tableData)
        this.search() 
          this.$message({
           message: '删除成功',
           type: 'success'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

       
      },
      update(row){
        console.log(row)
        let index=this.tableData.findIndex(t=>t.node==row.node&&t.nodeName==row.nodeName)
        this.$set(this.tableData,index,row)
              SetFlowData(this.tableData)
         row.edit = false
      },
      cancelEdit(row) { 
 
      row.edit = false
     
    },
    confirmEdit(row) {
      console.log(row);
      row.edit = false
      row.originalTitle = row.title
    
    },
     Save(){ 
         this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
              let  id= this.tableData.length+1; 
              this.tableData.push({id,node:this.obj.node,nodeName:this.obj.nodeName,workDay:this.obj.workDay,creator:"admin",v:"",creatorTime: new Date().format("yyyy-MM-dd hh:mm:ss"),edit:false,col:`nd${id}`})
              SetFlowData(this.tableData)
              this.dialogFormVisible=false;
              this.$refs["ruleForm"].resetFields();
              this.$message({
                 message: '保存成功',
                 type: 'success'
               })
               this.search()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
    debugger;
           if(GetFlowData()){
           this.tableData=GetFlowData()
           }else{
              SetFlowData(this.tableData)
           }
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
         rules: {
          node: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
            ],
          nodeName: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          workDay:[
             { required: true, message: '请输入工作日', trigger: 'blur' },
             { min: 1, max: 2, message: '长度在 1 到 2 个字符', trigger: 'blur' }
           ]},
        sUserName:'',
        innerVisible1:false,
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
        alertcontent:"",
        innerVisible:false,
        dialogFormVisible:false,
        showData:[],
        tableData:[
          {id:1,node:"节点1",nodeName:'专题会' ,workDay:"5",col:"nd1",v:"",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:2,node:"节点2",nodeName:'主任专题会',workDay:"5",col:"nd2",v:"",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:3,node:"节点3",nodeName:'指南会商',workDay:"5",col:"nd3",v:"",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:4,node:"节点4",nodeName:'主任办公会',workDay:"5",col:"nd4",v:"",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:5,node:"节点5",nodeName:'指南发布',workDay:"5",col:"nd5",v:"",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:6,node:"节点6",nodeName:'分组提交日',workDay:"5",col:"nd6",v:"",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:7,node:"节点7",nodeName:'专家评审',workDay:"5",col:"nd7",v:"",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:8,node:"节点8",nodeName:'立项会商',workDay:"5",col:"nd8",v:"",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:9,node:"节点9",nodeName:'主任办公会',workDay:"5",col:"nd9",v:"",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:10,node:"节点10",nodeName:'内发文签发日',workDay:"5",col:"nd10",v:"",creator:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
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


