<template>
<div>
       <el-row :gutter="40" style="margin-top: 20px;" >
           <el-col :span="10"><p style="font-family: '微软雅黑';
                              font-weight: 400;font-style: normal;font-size: 32px;text-align: left;"><span>欢迎使用科研计划管理平台</span></p></el-col> 
             <el-col :span="4" :offset="10"  style="padding: 10px 0px 0px 10px;border: solid;width: 206px;
    height: 60px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(223, 223, 223, 1);
    border-radius: 0px;"> 
    <div style="float: left;box-sizing: border-box;margin-left:10px;    margin-top: 5px;"><img :src="imgU" style="width:40px:height:40px"/></div>
    <div style="float: right;margin-right: 30px;"><div style="font-size: 16px;">May 8, 2019</div><div style="font-size: 13px;">星期二  22:56:13</div></div></el-col>
  </el-row>
  <template v-for="item in [[0,1,2,3],[4,5]]">

   <el-row :gutter="40" style="margin-top: 20px;">
   <template v-for="(item1,t) in DynamicCols">
    <el-col :span="6"  v-if="item.includes(t)">

       <Kanban :key="item1.col"    :list="Data[t]"    :header-text="item1.name"/>
   </el-col>  
     </template>
    </el-row>

  </template>
</div>
</template>
<script>
import u44 from '@/assets/u44.png'
import Kanban from '@/components/Kanban'

export default {
  name: 'dragKanban-demo',
  components: {
    Kanban
  }, options: {
        group: 'mission'
      },
  data() {
    return {
            Data:[
           [{id:1,cs:"办公室",jhlb:"计划1",nd1:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false}],
           [{id:2,cs:"办公室",jhlb:"计划2",nd1:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false}],
           [{id:3,cs:"办公室",jhlb:"计划3",nd1:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false}],
            [{id:4,cs:"办公室",jhlb:"计划4",nd1:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false}],
               [{id:5,cs:"办公室",jhlb:"计划5",nd1:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false}],
                   [{id:6,cs:"办公室",jhlb:"计划6",nd1:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false}],
          ],
         imgU:u44,
        DynamicCols:[ 
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
        }
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


</style>

