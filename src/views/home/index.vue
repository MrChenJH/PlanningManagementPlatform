<template>
<div>
  <el-row :gutter="40" style="   margin-bottom: 0px;" >
              <el-col :span="10"><p style="font-family: '微软雅黑';    color: #333333;
   
                              font-weight: 400;font-style: normal;font-size: 32px;text-align: left;"><span>欢迎使用科研计划管理平台</span></p></el-col> 
  <el-col :span="4" :offset="9"  style="padding: 10px 0px 0px 10px;border: solid;width: 206px;
    height: 60px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(223, 223, 223, 1);
    border-radius: 0px;"> 
    <div style="float: left;box-sizing: border-box;margin-left:10px;    margin-top: 5px;"><img :src="imgU" style="width:40px:height:40px"/></div>
    <div style="float: right;margin-right: 30px;"><div style="font-size: 16px;">{{dateT.m+" "+dateT.d+", "+dateT.y}}</div><div style="font-size: 13px;">{{dateT.w+" "+dateT.time}}</div></div></el-col>
  </el-row>
   <el-row :gutter="1"  style="   margin-bottom: 0px;"   >
      <el-col :span="2"  style="padding-left: 2px;padding-right: 2px;">
       <el-row :gutter="1"  style="   margin-bottom: 0px;" >
         <el-col :span="6" style="padding-left: 2px;">
             <div class="div1"></div>  
        </el-col>
        <el-col :span="16" class="zt" style="padding-left: 5px;">
             <span class="zt">  进行中</span>
        </el-col>
      </el-row>
     </el-col>
     <el-col :span="2" style="padding-left: 2px;padding-right: 2px;">
       <el-row :gutter="1"  style="   margin-bottom: 0px;" >
         <el-col :span="6" style="padding-left: 2px;">
             <div class="div2"></div>  
        </el-col>
        <el-col :span="16" class="zt" style="padding-left: 5px;">
             <span class="zt">  已完成</span>
        </el-col>
      </el-row>
     </el-col>

       <el-col :span="2"  style="padding-left: 2px;padding-right: 2px;">
       <el-row  style="   margin-bottom: 0px;" >
         <el-col :span="6" style="padding-left: 2px;">
             <div class="div3"></div>  
        </el-col>
        <el-col :span="16" class="zt" style="padding-left: 5px;">
             <span class="zt">  已超时</span>
        </el-col>
      </el-row>
     </el-col>
      
  </el-row>
   <el-row :gutter="40" style="   margin-bottom: 0px;" >
  <template v-for="item in colArray" >
    <el-col :span="6" >
         <template v-for="(item1,t) in DynamicCols">
           <template v-if="item.includes(t)">
            <Kanban 
            :days="item1.workDay"
            :key="item1.col"  
            :list="scheduleData[t]"  
            :options="options"  
            :header-text="item1.nodeName" 
            :col="item1.col" 
            :index="t"
             @add="add" 
             @showw="showSet"
             @checkChange="checkChange"
             @dragchage="dragchage"
             @end="ended"
             />
          </template>
        </template>
   </el-col>  
  </template>
    </el-row>



<el-dialog title="计划进度" 

  :visible.sync="dialogFormVisible1" >
     
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
      <el-select v-model="set.cs" style="width: 200px;">
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
            <el-input  v-model="set.jhlb" style="width:  200px;"/>
          </el-form-item>    
      </el-col> 

     <el-col :span="12"  style="margin-top: 15px;">  
        <el-form-item :label="setItem.nodeName" >
        
      <el-date-picker
      v-model="setItem.v"
      type="date"
      format="MM-dd"
      style="width:200px;">
      </el-date-picker>
    </el-form-item>    

       </el-col> 
     

   </el-row> 
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="SaveEdit">确 定</el-button>
  </div>

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
 import u44 from '@/assets/u44.png'
 import Kanban from '@/components/Kanban'

 import {SetSchedulerData,ruleRender,FullTime,GetFlowData,GetSchedulerData,addWorkDay} from '@/utils/tool'
export default {
  
  methods:{
    ended(){
     
      this.scheduleData=[]
      let cosobj=this.DynamicCols.find(t=>t.nodeName==this.dragObj.nodeName)
      let indexOfItem=this.initData.findIndex(t=>t.id==this.dragObj.id)
      this.$set(this.initData, indexOfItem,{cs:this.dragObj.cs,jhlb:this.dragObj.jhlb,[cosobj.col]:"-",state:"",createTime:"",creatorName:"admin",edit:false,sta:false})
      SetSchedulerData(this.initData)
    },
    dragchage(obj){
      this.dragObj=obj
    },
    checkChange(obj){
    this.scheduleData=[]
    let obg=this.initData.find(t=>t.id==obj.id)
    let indexOfItem=this.initData.findIndex(t=>t.id==obj.id)
    obg.sta=obj.sta
    this.$set(this.initData, indexOfItem,obg)
    SetSchedulerData(this.initData)
    },
    showSet(obj){
      console.log(obj.col)
      let obj11=this.DynamicCols.find(t=>t.col==obj.col)
      let Index=this.DynamicCols.findIndex(t=>t.col==obj.col)
      Object.assign(this.set,this.initData.find(t=>t.id==obj.id)) 
      Object.assign(this.setItem,obj11)
      this.set.cs=obj.cs
      this.setItem.v=obj.v
     
      this.dialogFormVisible1=true
    },
    SaveEdit(){
    this.scheduleData=[]
    let indexOfItem=this.initData.findIndex(x=>x.id==this.set.id)
              
    this.$set(this.initData, indexOfItem,{cs:this.set.cs,jhlb:this.set.jhlb,[this.setItem.col]:this.setItem.v.format("yyyy-MM-dd"),state:"",createTime:"",creatorName:"admin",edit:false,sta:false})
   
    SetSchedulerData(this.initData)

    this.dialogFormVisible1=false
    },
 
    add(v){
       this.dialogFormVisible=true
    }, 
    Save(){  
   
           this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
             debugger
             for(let [index, elem] of this.DynamicCols.entries()){
               if(elem.v){
                 this.initData.push({id:this.initData.length+index+1,cs:this.obj.cs,jhlb:this.obj.jhlb,[elem.col]:elem.v.format("yyyy-MM-dd"),state:"",createTime:"",creatorName:"admin",edit:false,sta:false})
                 }else{
                     this.initData.push({id:this.initData.length+index+1,cs:this.obj.cs,jhlb:this.obj.jhlb,[elem.col]:"",state:"",createTime:"",creatorName:"admin",edit:false,sta:false})
                 }
              }
           
           debugger
             let newdata=[]
             this.initData.forEach((x,y)=>{
                delete x.id
                newdata.push(x)
             })
             SetSchedulerData(newdata)
             this.dialogFormVisible=false
           
             this.scheduleData=[]
               
        
          }else{

            return false;
          }
          })
      },
  },
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
       },
    initData:function(val,oldval){
      debugger;
      console.log(val)
       this.DynamicCols=[];
       this.DynamicCols=GetFlowData()
       if(val.length>0){
       this.DynamicCols.forEach((x,i)=>{
         let newArr=val.filter(t=>Object.keys(t).includes(x.col)&&t[x.col])
         let nA=  newArr.sort((a, b) =>{
          if(a[x.col]=="-") return 1
          else
          {
          return  new Date(a[x.col])< new Date(b[x.col])? 1: -1 
          }

         });
         debugger
         if(nA.length>0){
       if(nA[nA.length-1][x.col]=="-"){
         let a=nA.pop()
         nA.unshift(a)
       }}
       this.scheduleData.push(nA)
     
   })
     }
  
  }
  },
  components: {
    Kanban
  },
  data() { 
    return { 
      dragObj:{},
      setItem:{
         nodeName:"",
         v:""
      },
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
      initData:[],
      rules: {
          cs: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
          jhlb: [
            { required: true, message: '请输入计划类别', trigger: 'blue' }
          ]},
        zt:"",
        dialogFormVisible1:false,
        dialogFormVisible:false,
        set:{
           cs:'',
           jhlb:''
        },
          obj:{
           cs:'',
           jhlb:''
           },
       options: {
        group: 'mission'
       },    
         innerVisible:false,
          alertcontent:'',
         scheduleData:[],
         imgU:u44,
        DynamicCols:[],
        colArray:[]
     
        }
  },		 computed: {
  		 dateT:function(){
               return FullTime()
				 }  },
 mounted(){

         this.DynamicCols=GetFlowData()
          let data=GetSchedulerData()
         let newdata=[]
         for(let [id,item] of data.entries()){
           id=id+1
           Object.assign(item,{id})
                 newdata.push(item)
          } 
          this.initData=newdata
  
       this.colArray=ruleRender.call(this)
  //      this.DynamicCols.forEach((x,i)=>{
  //      this.scheduleData.push(this.initData.filter(t=>Object.keys(t).includes(x.col)&&t[x.col]))
  //  })
  //   console.log(this.scheduleData)
   }
}
</script>
<style lang="scss">

.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.zt{

      font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
    font-weight: 650;
    font-style: normal;
    font-size: 14px;
  float: left;
        font-weight: bold;
 box-sizing: border-box;
    text-align: left;
}
.div1 {
    width: 20px;
    height: 20px;
    background: inherit;
    background-color: rgba(106, 192, 68, 1);
    border: none;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    float: left;
    box-sizing: border-box
}

.div2 {
    width: 20px;
    height: 20px;
    background: inherit;
    background-color: rgba(70, 160, 252, 1);
    border: none;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
        float: left;
    box-sizing: border-box
}

.div3 {
    width: 20px;
    height: 20px;
    background: inherit;
    background-color: rgba(243, 109, 110, 1);;
    border: none;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
        float: left;
    box-sizing: border-box
}
</style>

