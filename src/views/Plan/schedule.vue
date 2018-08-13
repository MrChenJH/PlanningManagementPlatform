<template>
  <div> 
 <el-row :gutter="20">
   <el-col :span="1" > <el-button  size="small"  type="primary" @click="dialogFormVisible=true">添加</el-button></el-col>
   <el-col :span="1" style="padding-left: 20px;"><el-button  size="small" @click="removeAll"  type="danger">删除</el-button></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="4" > 
          <el-select v-model="searchObj.cs"   placeholder="请选择处室">
                  <el-option
                     v-for="item in cs2"
                     :key="item.name"
                     :label="item.name"
                     :value="item.name">
                </el-option>
          </el-select>  
 </el-col>
     <el-col :span="4" style="padding: 0px;"> 
<el-input  placeholder="请输入计划类别" v-model="searchObj.jhlb"></el-input>
          </el-col>
   <el-col :span="1" ><el-button type="primary" @click="search">查询</el-button></el-col>
   <el-col :span="2" style="padding-left: 40px;" ><el-button type="primary" @click="exprot"> 导出</el-button></el-col>
</el-row>
<el-row  :gutter="20">
    <el-col :span="24" > 
     <el-table :data="showData"  border fit highlight-current-row style="width: 100%" @select="select" @select-all="select">
         <el-table-column align="center"
              fixed
             type="selection"
             width="55">
        </el-table-column> 

    <el-table-column align="center" label="序号"  fixed width="50">
          <template slot-scope="scope"> 
            <span>{{scope.row.id}}</span>
        </template>
   </el-table-column> 
        <el-table-column align="center" label="处室"     fixed width="120">
        <template slot-scope="scope"> 
            <span>{{scope.row.cs}}</span>
        </template>
      </el-table-column>
      
      <el-table-column  align="center"  label="计划类别"     fixed  min-width="200px" >
       <template slot-scope="scope"> 
            <span >{{scope.row.jhlb}}</span>
        </template>
      </el-table-column>
       
       <template v-for="item in DynamicCols">
      <el-table-column align="center"   :label="item.nodeName"  width="200px" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
                <el-date-picker
                 v-model="scope.row[item.col]" 
                 type="date"
                 format="MM-dd"
                 style="width:100px;">
                </el-date-picker>
        
          </template> 
        <span v-else>{{scope.row[item.col]?new Date(scope.row[item.col]).format("MM-dd"):""}}</span>
        </template>
      </el-table-column>
        </template>   
      <el-table-column min-width="200px" label="日期" align="center">
        <template slot-scope="scope"> 
            <span  >{{scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="状态"   align="center" >
        <template slot-scope="scope">
             <span>{{scope.row.state}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" width="200"    label="发布人" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.creatorName}}</span>
        </template>
      </el-table-column>


     <el-table-column align="center" label="操作"  fixed="right" width="170px">
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
      :visible.sync="innerVisible1" > 
     
         <el-row> 
           <el-col :span="24" style="color: red;padding-right: 5px;">
            {{alertcontent}}
           </el-col>
           </el-row> 
    </el-dialog>



<el-dialog title="计划进度" 

  :visible.sync="dialogFormVisible" >
     
     <el-dialog
      width="30%"
      title="提示"
      :visible.sync="innerVisible"
   
      append-to-body> 
         <el-row> 
           <el-col :span="24" style="color: red;padding-right: 5px;">
            {{alertcontent}}
           </el-col>
           </el-row> 
    </el-dialog>
        <el-form :model="obj" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
         <el-row> 

    <el-col :span="12"  style="margin-top: 15px;">  
        <el-form-item label="处室" prop="cs">
      <el-select v-model="obj.cs" style="width: 200px;">
                  <el-option
                     v-for="item in cs2"
                     :key="item.name"
                     :label="item.name"
                     :value="item.name">
                </el-option>
                     </el-select>
                       </el-form-item>
      </el-col>  
     <el-col :span="12"  style="margin-top: 15px;">  
        <el-form-item label="计划类别" prop="jhlb">
            <el-input  v-model="obj.jhlb" style="width:  200px;"/>
          </el-form-item>    
      </el-col> 


  <template v-for="(item,i) in DynamicCols">
     <el-col :span="12"  style="margin-top: 15px;">  
        <el-form-item :label="item.nodeName" >
            <template v-if="i==0">
      <el-date-picker
      v-model="zt"
      type="date"
      format="MM-dd"
      style="width:200px;">
          </el-date-picker>
         </template> 

    <el-date-picker
      v-model="item.v"
      type="date"
      format="MM-dd"
      style="width:200px;"
      v-else></el-date-picker>
          </el-form-item>    

       </el-col> 
     
  </template>
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
 import '@/utils/dateFmt'

 import  TableDefined from '@/components/TableDefined'
 import  {office,addRole,RoleS}  from '@/api/role'
 import  {Users} from '@/api/user'
 import {exportToCsv,addWorkDay,GetFlowData,SetSchedulerData,GetSchedulerData,OrderBy} from '@/utils/tool'


 export default {
     watch:{
      zt:function(val){
        let csDate=val.format("MM-dd") 
        let rd=addWorkDay(csDate,0);
        if(!rd.sucess){
          this.innerVisible1=true
          this.alertcontent=rd.err
        }
        for(let [index,item] of  this.DynamicCols.entries()){
            if(index==0){
              item.v=val;
              }else{  
                let rddd=addWorkDay(csDate,5)
                console.log(rddd)
                let td=rddd.d
                csDate=td
                item.v=new Date(rddd.d)
              }
            }
       }
     },
    methods: {
      exprot(){ 
      
        let data=this.showData;
        let colnames={}
        this.DynamicCols.forEach((x,i)=>{
             Object.assign(colnames,{[x.col]:x.name})
        })
      
      
        let tagertOBJ={}
        Object.assign( tagertOBJ,{id:"序号",cs:"处室",jhlb:'计划类别'},colnames,{state:"",createTime:"",creatorName:"admin",edit:false})
        let objdata=[]
        let newObj={}
        Object.assign(newObj,tagertOBJ)
         this.showData.forEach((X,i)=>{
          Object.assign(newObj,X)
           objdata.push(newObj)
         })
       
       objdata.unshift( tagertOBJ);
        exportToCsv("计划进度",objdata)
      },
      search(){
         let data=[...this.initData]
         data= data.filter(r=>r.cs.includes(this.searchObj.cs)&&r.jhlb.includes(this.searchObj.jhlb))
      
         this.tableData=[]
        data=OrderBy(data,['cs','jhlb'],"asc").results
         let lc= data.length
         let c=data[0]
         let count=0
         let fg=data.filter(t=>t.cs==c.cs&&t.jhlb==c.jhlb).length
        
     
        while(data.length>0){
             let newdata=data.splice(0,fg);
             let targertobj={}
                   let dya=GetFlowData()
         dya.forEach((x,i)=>{
           Object.assign(targertobj,{[x.col]:""})
         })
         
             newdata.forEach((x,j)=>{
              Object.assign(targertobj,x)
             })
             this.tableData.push(Object.assign(targertobj,{id:count+1}))
              c=data[0]
               fg=data.filter(t=>t.cs==c.cs&&t.jhlb==c.jhlb).length
               count=count+1
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
        this.selectRows.forEach((row,i)=>{
               let arrs=this.initData.filter(r=>r.cs==row.cs&&r.jhlb== row.jhlb) 
               arrs.forEach((x,r)=>{
                let index= this.initData.findIndex(r=>r==x) 
                this.initData.splice(index,1);
              })

           }) 
           SetSchedulerData(this.initData)
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
         let arrs=this.initData.filter(r=>r.cs==row.cs&&r.jhlb== row.jhlb) 
              arrs.forEach((x,r)=>{
                let index= this.initData.findIndex(r=>r==x) 
                 this.initData.splice(index,1);
              })
                     SetSchedulerData(this.initData)
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
      cancelEdit(row){
      row.edit=false
      this.search()

      },
      update(row){
           console.log(row)
           debugger
             let arr=[];
             for(let [index, elem] of this.DynamicCols.entries()){
                 if(row[elem.col]&&typeof(row[elem.col])=="object"){
                 arr.push({cs:row.cs,jhlb:row.jhlb,[elem.col]:row[elem.col].format("yyyy-MM-dd"),state:"",createTime:"",creatorName:"admin",edit:false,sta:false})
                }else{
                    arr.push({cs:row.cs,jhlb:row.jhlb,[elem.col]:row[elem.col],state:"",createTime:"",creatorName:"admin",edit:false,sta:false})
                }
              }
              
               let arrs=this.initData.filter(r=>r.cs==row.cs&&r.jhlb== row.jhlb) 
                arrs.forEach((x,r)=>{
                let index= this.initData.findIndex(r=>r==x) 
                this.initData.splice(index,1);
              })

      
             this.initData=[...this.initData,...arr]
             SetSchedulerData(this.initData)
             this.search()
             row.edit = false
      },

     Save(){  
   
         this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
             let arr=[];
             for(let [index, elem] of this.DynamicCols.entries()){
               if(elem.v){
                 arr.push({cs:this.obj.cs,jhlb:this.obj.jhlb,[elem.col]:elem.v.format("yyyy-MM-dd"),state:"",createTime:"",creatorName:"admin",edit:false,sta:false})
                 }else{
                     arr.push({cs:this.obj.cs,jhlb:this.obj.jhlb,[elem.col]:"",state:"",createTime:"",creatorName:"admin",edit:false,sta:false})
                 }
              }
             this.initData=[...this.initData,...arr]
             SetSchedulerData(this.initData)
             this.search()
             this.dialogFormVisible=false
          }else{

            return false;
          }
          })
      },
      handleSizeChange(val) {  
           this.pageSize1=val;
           this.search();
       },
      handleCurrentChange(val) {
           this.currentPage=val;
           this.search();
      }
    },
    components: {
    TableDefined
  },
  props:{

  },
  mounted(){  
  
        debugger
              if(GetSchedulerData())
              {
                this.initData=GetSchedulerData()
              }else{
                SetSchedulerData(this.initData)
              }
              if(GetFlowData()){

                this.DynamicCols=GetFlowData()
              }
         let data=[...this.initData]
         data=OrderBy(data,['cs','jhlb'],"asc").results
         let lc= data.length
         let c=data[0]
         let count=0
         let fg=data.filter(t=>t.cs==c.cs&&t.jhlb==c.jhlb).length
        while(data.length>0){
             let newdata=data.splice(0,fg);
             let targertobj={}
             let dya=GetFlowData()
         dya.forEach((x,i)=>{
           Object.assign(targertobj,{[x.col]:""})
         })
             newdata.forEach((x,j)=>{
              Object.assign(targertobj,x)
             })
             this.tableData.push(Object.assign(targertobj,{id:count+1}))
              c=data[0]
               fg=data.filter(t=>t.cs==c.cs&&t.jhlb==c.jhlb).length
               count=count+1
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

           console.log(this.showData)
     },
     created(){
       this.DynamicCols=GetFlowData()
     },
    data() {
      return {
          rules: {
          cs: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
          jhlb: [
            { required: true, message: '请输入计划类别', trigger: 'blue' }
          ]},
        zt:"",
        innerVisible1:false,
        alertcontent:'',
        sUserName:'',
        total:400,
        pageSize1:10,
        selectRows:[],   
        DynamicCols:[],
        cs2:[
           {name:"办公室"},
           {name:"人事教育处"},
           {name:"体制改革与法规处"},
           {name:"发展研究处"},
           {name:"发展计划处"},
           {name:"条件财务处"},
           {name:"研发基地建设与管理处"},
           {name:"国际合作处"},
           {name:"科普工作处"},
           {name:"基础研究处"},
           {name:"高新技术产业化处"},
           {name:"生物医药处"},
           {name:"社会发展处"},
           {name:"创新服务处"}
         ],
        listLoading: true,
        innerVisible:false,
        searchObj:{
           cs:'',
           jhlb:''
        },
        obj:{
           cs:'',
           jhlb:''
           },
        currentPage: 1,
        dialogFormVisible:false,
        initData:[
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd1:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd2:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd3:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false}, 
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd4:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd5:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd6:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false}, 
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd7:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false}, 
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd8:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd9:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd10:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false},
   
      {cs:"人事教育处",jhlb:"软科学第一批",nd1:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd2:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd3:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false}, 
      {cs:"人事教育处",jhlb:"软科学第一批",nd4:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd5:"2018-9-1",state:"",createTime:"",creatorName:"admin",edit:false,sta:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd6:"2018-9-10",state:"",createTime:"",creatorName:"admin",edit:false,sta:false}, 
      {cs:"人事教育处",jhlb:"软科学第一批",nd7:"2018-9-19",state:"",createTime:"",creatorName:"admin",edit:false,sta:false}, 
      {cs:"人事教育处",jhlb:"软科学第一批",nd8:"2018-9-20",state:"",createTime:"",creatorName:"admin",edit:false,sta:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd9:"2018-9-25",state:"",createTime:"",creatorName:"admin",edit:false,sta:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd10:"2018-9-30",state:"",createTime:"",creatorName:"admin",edit:false,sta:false}

    ],
        showData:[],
        tableData:[ ]
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
.el-table__empty-text {
    position: absolute;
    left: 20%;}

.divtitle{
text-align: right;
padding-right: 5px;   
margin-top: 15px;
}
.divinput{

  margin-top: 15px;
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


