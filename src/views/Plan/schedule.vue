<template>
  <div> 
 <el-row :gutter="20">
   <el-col :span="1" > <el-button  size="small"  type="primary" @click="dialogFormVisible=true">添加</el-button></el-col>
   <el-col :span="1" style="padding-left: 20px;"><el-button  size="small" @click="removeAll"  type="danger">删除</el-button></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="4" > 
          <el-select v-model="searchObj.cs" style="width: 200px;"  placeholder="请选择处室">
                  <el-option
                     v-for="item in cs2"
                     :key="item.name"
                     :label="item.name"
                     :value="item.name">
                </el-option>
          </el-select>  
 </el-col>
     <el-col :span="4" > 
<el-input  placeholder="请输入计划类别" style="width: 200px;" v-model="searchObj.jhlb"></el-input>
          </el-col>
   <el-col :span="1" ><el-button type="primary" @click="search">查询</el-button></el-col>
   <el-col :span="2" style="padding-left: 40px;" ><el-button type="primary" @click="exprot"> 导出</el-button></el-col>
</el-row>
<el-row  :gutter="20">
    <el-col :span="23" > 
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
      <el-table-column align="center"   :label="item.name"  width="200px" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
                <el-date-picker
                 v-model="scope.row[item.col]" 
                 type="date"
                 format="MM-dd"
                 style="width:100px;">
                </el-date-picker>
        
          </template> 
        <span v-else>{{scope.row[item.col].format("MM-dd")}}</span>
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

      <el-table-column class-name="status-col" width="190"    label="发布人" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.creatorName}}</span>
        </template>
      </el-table-column>


     <el-table-column align="center" label="操作"  fixed="right" width="200px">
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
         <el-row> 
    <el-col :span="4"  style="text-align: right; padding-right: 5px;margin-top: 15px;"><span class="textSpan" > 处室:</span></el-col> 
    <el-col :span="8"  style="margin-top: 15px;">  
      <el-select v-model="obj.cs" style="width: 200px;">
                  <el-option
                     v-for="item in cs2"
                     :key="item.name"
                     :label="item.name"
                     :value="item.name">
                </el-option>
                     </el-select>
      </el-col> 
    <el-col :span="4"  style="text-align: right;padding-right: 5px;margin-top: 15px;"><span class="textSpan"> 计划类别:</span></el-col> 
    <el-col :span="8"  style="margin-top:15px;"><el-input  v-model="obj.jhlb" style="width:  200px;"/></el-col>

  <template v-for="(item,i) in DynamicCols">

   <el-col :span="4"    style="text-align: right;padding-right: 5px;margin-top: 15px;">
     <span  class="textSpan">{{item.name}}:</span>
     </el-col> 
   <el-col :span="8"    style="margin-top: 15px;"> 
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
      
       </el-col> 
     
  </template>
   </el-row> 
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
 import {exportToCsv,addWorkDay} from '@/utils/tool'


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
        exportToCsv("计划进度.csv",objdata)
      },
      search(){
   
          let data=[...this.$store.state.app.Data]
   
         data= data.filter(r=>r.cs.includes(this.searchObj.cs)&&r.jhlb.includes(this.searchObj.jhlb))
          let lc= data.length
            this.tableData=[]
          for(let count=0;count<lc/13;count++){
            let newdata=data.splice(0,13);
             let targertobj={}
             newdata.forEach((x,j)=>{
              Object.assign(targertobj,x)

             })
             this.tableData.push(Object.assign(targertobj,{id:count+1}))
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
          
           this.selectRows.forEach((row,i)=>{
               let arrs=this.$store.state.app.Data.filter(r=>r.cs==row.cs&&r.jhlb== row.jhlb) 
              arrs.forEach((x,r)=>{
                let index= this.$store.state.app.Data.findIndex(r=>r==x) 
                 this.$store.state.app.Data.splice(index,1);
              })

           }) 
              this.search()
        
        }
 
       
      },
      remove(row)
      { 
              let arrs=this.$store.state.app.Data.filter(r=>r.cs==row.cs&&r.jhlb== row.jhlb) 
              arrs.forEach((x,r)=>{
                let index= this.$store.state.app.Data.findIndex(r=>r==x) 
                 this.$store.state.app.Data.splice(index,1);
              })
           
        this.search()
      },
      cancelEdit(row){
      row.edit=false
      this.search()

      },
      update(row){
    
           row.edit = false
      },

     Save(){  
       debugger;
       console.log(this.DynamicCols)
           if(!this.obj.cs&&!this.innerVisible){
                this.alertcontent="处室不能为空"; 
                this.innerVisible=true
            } 
            
           if(!this.obj.jhlb &&!this.innerVisible){
                this.alertcontent="计划类别不能为空";
                this.innerVisible=true
            }
            
          
            if(!this.innerVisible){ 
                let arr=[];
             for(let [index, elem] of this.DynamicCols.entries()){
                 arr.push({cs:this.obj.cs,jhlb:this.obj.jhlb,[elem.col]:elem.v,state:"",createTime:"",creatorName:"admin",edit:false})
                
             }
             this.$store.commit('AData',arr)
             this.search()
            }
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
              console.log(this.$store.state.app.Data)
         let data=[...this.$store.state.app.Data]
         let lc= data.length
          for(let count=0;count<lc/13;count++){
             let newdata=data.splice(0,13);
             let targertobj={}
             newdata.forEach((x,j)=>{
              Object.assign(targertobj,x)

             })
             this.tableData.push(Object.assign(targertobj,{id:count+1}))
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
       this.DynamicCols=[ 
          {name:"专题会",col:"nd1",v:""},
          {name:"主任专题会",col:"nd2",v:""}, 
          {name:"指南会商",col:"nd3",v:""}, 
          {name:"主任办公会",col:"nd4",v:""}, 
          {name:"指南发布会日",col:"nd5",v:""}, 
          {name:"指南填报结束日",col:"nd6",v:""}, 
          {name:"分组提交日",col:"nd7",v:""},
          {name:"专家评审开始日",col:"nd8",v:""}, 
          {name:"专家评审结束日",col:"nd9",v:""},
          {name:"立项会商",col:"nd10",v:""},
          {name:"主任办公会",col:"nd11",v:""},
          {name:"内签发文日",col:"nd12",v:""},
          {name:"转正",col:"nd13",v:""},
        ]
     },
    data() {
      return {
        zt:"",
        innerVisible1:false,
        alertcontent:'',
        sUserName:'',
        total:400,
        pageSize1:5,
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


