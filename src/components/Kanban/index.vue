<template>
  <div class="board-column">
    <div class="board-column-header">
      <p><span>
      {{headerText}}
      </span></p>
    </div>
    <draggable
      class="board-column-content"
      :list="list"
      :options="options" 
      @change="dragchage"
      @end="toend"
    >

       <div class="board-item"  v-for="element in list" :key="element.id" 
       style="font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
              font-weight: 650;
              font-style: normal;
              font-size: 18px;">
       <div class="item-left" :style="{ 'background-color': isCs(element[col])?'rgba(243, 109, 110, 1)':!element.sta?'rgba(106, 192, 68, 1)':'rgba(70, 160, 252, 1)'}"></div> <div class="item-left1" >
         <div style="line-height: 40px;
                     padding-left: 5px;">
                     <input type="checkbox" v-model="element.sta" @change="checkChange(element.sta,element.id,col,headerText)">
                
             </div>
             </div>
             
              <div class="item-left2"><div style="line-height: 40px;padding-left: 10px;">
                <span :style="{'text-decoration': element.sta?'line-through':'none','font-weight': 'bold'}"> {{element.cs}} </span></div> 
                <div style="line-height: 40px;padding-left: 10px; font-size: 14px;">
                  <span :style="{'text-decoration': element.sta?'line-through':'none'}">{{element.jhlb}}</span></div>
 <div style="line-height: 40px;
    padding-left: 10px;  font-size: 14px;"><span :style="{'text-decoration': element.sta?'line-through':'none'}"> {{element[col]}}</span></div></div> 
<div class="item-left3" style="">
  <img :src="u141" style="width: 20px;height: 20px;" @click="sett(element.id,col,headerText,element[col])">
 </div>
 </div>
  <div slot="footer" style="text-align: left;
    width: 100%;margin-top: 20px;">
   <span @click="show" >&nbsp;+&nbsp; 添加任务</span>
  </div>
</draggable>
  </div>
</template>
<script>
import u141 from '@/assets/u141.png'
import draggable from 'vuedraggable'
export default {
  name: 'dragKanban-demo',
  data(){
   return {
      u141
    }
  },
  
  components: {
    draggable
  },methods: {
    isCs(v){
      debugger
        if(v!="-"){
        let t=  new Date(v)
         t.setDate(t.getDate() +parseInt(this.days)-1)
        return t<new Date()
        }else{
          return false
        }
    },
    checkChange(sta,id){
       this.$emit("checkChange",{sta,id})
    },
    sett(id,col,cs,v){
     this.$emit("showw",{id,col,cs,v})
    },
    dragchage(v){
     if(v.added){
       debugger
       this.$emit("dragchage",Object.assign( v.added.element,{index:this.index,nodeName:this.headerText}))
       }
    },
    show(){
    this.$emit("add","你好")
    },
    toend(v){
    console.log(v)
     this.$emit("end")
    }
  },
  props: {
    days:{
       type:   String
       },
    index:{
      type: Number
    },
    col:{
      type: String
    },
    headerText: {
      type: String,
      default: 'Header'
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="scss">

.item-left{
    float: left;
    width: 25px;
    height: 119px;
    background: inherit;
    background-color: rgba(106, 192, 68, 1);
    box-sizing: border-box;
    border-right-width: 1px;
    border-right-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.item-left1{
    float: left;
    width: 20px;
    height: 119px;
    background: inherit;
    box-sizing: border-box;

   
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.item-left2{
    float: left;
    width:70%;
    height: 119px;
    background: inherit;
    box-sizing: border-box;
  
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.item-left3{
    float: right;
    width: 10%;
    height: 119px;
    background: inherit;
    box-sizing: border-box;

    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    line-height: 30px
}
.board-column {
  margin-top: 15px;
   margin-bottom: 35px;
  min-width: 290px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;


  .board-column-header {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background:rgba(245, 245, 245, 1);
    color: #333333;
    border-radius: 3px 3px 0 0;
    font-family: '微软雅黑';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    text-align: left;
    border-bottom: #f3f0f0;
    border-bottom-width: 4px;
    border-bottom-style: solid;
        background: inherit;
    background-color: rgba(245, 245, 245, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(223, 223, 223, 1);
    border-radius: 0px;
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    background: #fff;
    padding-left:10px ;
    padding-right:10px ;
       
    padding-bottom: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(223, 223, 223, 1);
    border-radius: 0px;
    .board-item {
      cursor: pointer;
      width: 100%;
      border-color: rgb(121, 121, 121);
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      border-width: 1px;
      border-style: solid;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);
     }
  }
}
</style>

