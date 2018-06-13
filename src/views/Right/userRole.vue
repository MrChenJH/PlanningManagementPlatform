<template>
  <div> 
 <el-row :gutter="20">
   <el-col :span="1" > <el-button  size="small"  type="primary" @click="dialogFormVisible=true">添加</el-button></el-col>
   <el-col :span="1" style="padding-left: 20px;"><el-button  size="small" @click="removeAll"  type="danger">删除</el-button></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="5" >  
   <el-input   v-model="sUserName" placeholder="请输入登录名"></el-input></el-col>
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
        <el-table-column align="center" label="姓名" width="80">
        <template slot-scope="scope"> 
            <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      
      <el-table-column min-width="100px"  label="登录名" align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
            <el-input v-model="scope.row.userName" placeholder="请输入内容"></el-input>
          </template> 
         <span v-else>{{scope.row.userName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px"  label="密码" align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
            <el-input v-model="scope.row.pwd" placeholder="请输入密码"></el-input>
          </template> 
        <span v-else>{{scope.row.pwd}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="归口处室" align="center">
        <template slot-scope="scope"> 
         <template v-if="scope.row.edit">
           <Select v-model="scope.row.officeName" filterable   multiple :transfer='true' >
              <Option v-for="item in cs2" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
        </template>
          <span  v-else>{{scope.row.officeName.join(',')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="创建人" align="center" >
        <template slot-scope="scope">
             <span>{{scope.row.creatorName}}</span>
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

<el-dialog title="权限管理" :visible.sync="dialogFormVisible" >
    

  <el-row> 
    <el-col :span="2" :offset="1" style="text-align: right;    padding-right: 5px;"><span class="textSpan" > 姓名:</span></el-col> 
    <el-col :span="8"><el-input type="text" v-model="obj.name"/></el-col> 
    <el-col :span="3"  style="text-align: right;    padding-right: 5px;"><span class="textSpan"> 登录名:</span></el-col> 
    <el-col :span="8"><el-input  v-model="obj.userName"/></el-col>
  </el-row> 
  <el-row > 
   <el-col :span="2" :offset="1"   style="text-align: right;    padding-right: 5px;"><span     class="textSpan">密码:</span></el-col> 
   <el-col :span="8">   <el-input  type="password" v-model="obj.password"/></el-col> 
   <el-col :span="3"    style="text-align: right;    padding-right: 5px;"><span    class="textSpan">确认密码:</span></el-col> 
   <el-col :span="8">  <el-input type="password"  v-model="obj.repassword"/></el-col>
 </el-row>
<el-row :gutter="5">  
    <el-col :span="3" >负责处室:</el-col>  
       

       <el-col :span="5" >
        <el-checkbox v-model="cs.bgs"  >办公室</el-checkbox>
            </el-col>
               <el-col :span="5" >
        <el-checkbox v-model="cs.rsjy" >人事教育处</el-checkbox> 
        </el-col>
            <el-col :span="5" >
             <el-checkbox v-model="cs.fzyjc" >发展研究处</el-checkbox>
             </el-col>
             <el-col :span="5" >
             <el-checkbox v-model="cs.tzggyfgc" >体制改革与法规处</el-checkbox>   
             </el-col>

      </el-row > 
      <el-row :gutter="5">   

        <el-col :span="5" :offset="3" >
        <el-checkbox v-model="cs.fzjhc" >发展计划处</el-checkbox>
        </el-col> 
        <el-col :span="5" >
        <el-checkbox v-model="cs.tjcwc" >条件财务处</el-checkbox>  
        </el-col> 
        <el-col :span="5" >
          <el-checkbox v-model="cs.gjhzc" >国际合作处</el-checkbox>
        </el-col> 
        <el-col :span="5" >
                <el-checkbox v-model="cs.yfjdjsyglc" >研发基地建设与管理处</el-checkbox> 
         </el-col> 
       </el-row>
        <el-row :gutter="5">   
             <el-col :span="5"   :offset="3" >
        <el-checkbox v-model="cs.kpgzc" >科普工作处</el-checkbox> 
            </el-col> 
                  <el-col :span="5" >
        <el-checkbox v-model="cs.jcyjc" >基础研究处</el-checkbox> 
             </el-col> 
                  <el-col :span="5" >
         <el-checkbox v-model="cs.swyyc" >生物医药处</el-checkbox>
            </el-col> 
          <el-col :span="5" >
                <el-checkbox v-model="cs.gxjscyc" >高新技术产业化处</el-checkbox>
 
            </el-col> 

      </el-row> 
             <el-row :gutter="5">   
             <el-col :span="5"   :offset="3" >
        <el-checkbox v-model="cs.shfzc" >社会发展处</el-checkbox>
            </el-col>
                     <el-col :span="5" >
        <el-checkbox v-model="cs.cxfwc" >创新服务处</el-checkbox> 
             </el-col>
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
        let data=this.tableData1;
        data.unshift( {id:"序号",name:"姓名",userName:'登录名' ,pwd:"密码",officeName:"归口办公室",creatorName:'创建人',creatorTime:"创建时间",edit:false},);
        exportToCsv("用户权限.csv",data)
      },
      search(){
        let data= this.tableData1.filter(r=>r.userName.includes(this.sUserName))
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
       this.$message({
           message: '删除成功',
           type: 'success'
          })
      },
      removeAll(){
         for(let item of this.selectRows.values()){

              console.log(item)
              let i=this.tableData1.findIndex(r=>r.id==item.id) 
               this.tableData1.splice(i,1);
        }
      },
      remove(row)
      {
        let i= this.tableData1.findIndex(r=>r.id==row.id)
        this.tableData1.splice(i,1);
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
         let css=[];
            for (let [k, v] of Object.entries(this.cs)) {
             if(v){
                 css.push(this.cs1[k])
                 }
             }
            let  id= this.tableData1.length+1; 
            this.tableData1.push({id,name:this.obj.name,userName:this.obj.userName,officeName:css,password:this.obj.password,creatorName:"admin",creatorTime: new Date().format("yyyy-MM-dd hh:mm:ss"),edit:false})
            alert('成功!'); 
            this.dialogFormVisible=false;
      },
      handleSizeChange(val) {  
           this.pageSize1=val;
          
         
      },
      handleCurrentChange(val) {
           this.currentPage=val;
           this.showData=[];
           this.tableData1.forEach((x,i) => 
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
           this.total=this.tableData1.length
           this.showData=[];
           this.tableData1.forEach((x,i) => 
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
        cs:{
          bgs:false,
          rsjy:false,
          tzggyfgc:false,
          fzyjc:false,
          fzjhc:false,
          tjcwc:false,
          yfjdjsyglc:false,
          gjhzc:false,
          kpgzc:false,
          jcyjc:false,
          gxjscyc:false,
          swyyc:false,
          shfzc:false,
          cxfwc:false
        },
        cs1:{
          bgs:"办公室",
          rsjy:"人事教育处",
          tzggyfgc:"体制改革与法规处",
          fzyjc:"发展研究处",
          fzjhc:"发展计划处",
          tjcwc:"条件财务处",
          yfjdjsyglc:"研发基地建设与管理处",
          gjhzc:"国际合作处",
          kpgzc:"科普工作处",
          jcyjc:"基础研究处",
          gxjscyc:"高新技术产业化处",
          swyyc:"生物医药处",
          shfzc:"社会发展处",
          cxfwc:"创新服务处"
        },ccc:["办公室","人事教育处"],
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
        rules:{
        userName: [
            { required: true, message: '请选择用户名', trigger: 'change' },
           
          ],
        officeName: [
            { required: true, message: '请选择处室', trigger: 'change' }
          ]
        },
        options1:[
          {"name":"admin"},
          {"name":"admin1"}, 
          {"name":"admin2"},
        ],
         options2:[
          {"name":"处室1"},
          {"name":"处室2"}, 
          {"name":"处室3"},
         ]
        ,
         listLoading: true,
         listQuery: {
           page: 1,
         limit: 10
         },
        users:[],
        office:[],
        obj:{
           name:'',
           password:'',
           repassword:'',
           officeName:[]
          },
        currentPage: 1,
        dialogFormVisible:false,
        showData:[],
        tableData1:[
          {id:1,name:"name1",userName:'Admin' ,pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:2,name:"name2",userName:'Admin1',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:3,name:"name3",userName:'Admin2',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:4,name:"name4",userName:'Admin3',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:5,name:"name1",userName:'Admin' ,pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:6,name:"name2",userName:'Admin1',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:7,name:"name3",userName:'Admin2',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:8,name:"name4",userName:'Admin3',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:9,name:"name1",userName:'Admin' ,pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:10,name:"name2",userName:'Admin1',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:11,name:"name3",userName:'Admin2',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:12,name:"name4",userName:'Admin3',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:13,name:"name1",userName:'Admin' ,pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:14,name:"name2",userName:'Admin1',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:15,name:"name3",userName:'Admin2',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:16,name:"name4",userName:'Admin3',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:17,name:"name1",userName:'Admin' ,pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:18,name:"name2",userName:'Admin1',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:19,name:"name3",userName:'Admin2',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:20,name:"name4",userName:'Admin3',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
        
          {id:21,name:"name1",userName:'Admin' ,pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:22,name:"name2",userName:'Admin1',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:23,name:"name3",userName:'Admin2',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:24,name:"name4",userName:'Admin3',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
        
          {id:25,name:"name1",userName:'Admin' ,pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:26,name:"name2",userName:'Admin1',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:27,name:"name3",userName:'Admin2',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
          {id:28,name:"name4",userName:'Admin3',pwd:"123456",officeName:['办公室'],creatorName:'Admin',creatorTime:'2018-03-01 19:11:10',edit:false},
        
        
           ],
        colNames:[
           {
            title:"用户名",
            width:"150px",
            name:'userName'
           }, 
           {
            title:"处室",
            width:"300px",
            name:'officeName'
           },
           {
            title:"创建人",
            width:"100px",
            name:'creatorName'
           },
           {
            title:"创建时间",
            width:"100px",
            name:'creatorTime'
           }
          ],
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


