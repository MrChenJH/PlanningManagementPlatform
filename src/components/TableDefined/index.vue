<template> 
  <div >
   <table class="table table-bordered">
                        <thead> 
                        <tr>  
                             <th>#</th>
                             <th style="width:70px;align:center">序号</th>
                            <template v-for="(item,index) in colNames">
                                  <th :style="'width:'+item.width">{{item.title}}</th>
                             </template> 
                              <th>操作管理</th>
                        </tr>
                        </thead>
                        <tbody> 
                           <template v-for="(obj,index) in  coldatas">
                            <tr>  
                                <td> <input type="checkbox" :tkey="index"/></td> 
                                 <td  style="width:70px;text-align:center">{{index}}</td>
                                  <template v-for="item in colNames">
                                        <td :ref="'r'+index"  :style="'text-align:center;width:'+item.width">{{ decodeURIComponent(obj[item.name])}}</td>
                                        <td :ref="'rt'+index" :style="'display:none;text-align:center;width:'+item.width">
                                           <el-input size="mini"  :value="decodeURIComponent(obj[item.name])"   :ref="'td'+index" :tdkey="'tb'+item.name"/> 
                                         
                                  </td> 
                                 </template>
                                 <td >
                                     <el-button :ref="'editBtn'+index" size="mini"     @click="edit(index)">编辑</el-button>
                                     <el-button :ref="'del'+index"   size="mini"       @click="edit(index)">删除</el-button>
                                     <el-button :ref="'saveBtn'+index"    size="mini"    style="display:none"    @click="save(index)">保存</el-button> 
                                     <el-button :ref="'cancelBtn'+index"   size="mini"    style="display:none"    @click="cancel(index)">取消</el-button>
                                 </td> 
                            </tr> 
                            </template>
                         </tbody>
                    </table>
                 </div>
  </template>
  <script>
  import {htmlremoveAttribute,htmlSetAttribute} from '@/utils/tool'
  export default {
      data(){
          return{ 
              isShow:false
          }
      },
      props:{
         coldatas:{
             type:Array,
             default:[]
         },
         colNames:{
             type:Array,
             default:[]  
         }
        },methods:{
          cancel(r){ 
              htmlremoveAttribute.call(this,`editBtn${r}`,'style')
              htmlremoveAttribute.call(this,`del${r}`,'style')
              htmlSetAttribute.call(this,`saveBtn${r}`,'style','"display:none"')
              htmlSetAttribute.call(this,`cancelBtn${r}`,'style','"display:none"')
              htmlremoveAttribute.call(this,`r${r}`,'style')
              htmlSetAttribute.call(this,`rt${r}`,'style','"display:none"')
            },
          save(r){ 
            var obj=this.coldatas[r];
            console.log(obj)
            var tds=[];
            eval(`tds=this.$refs.td${r}`) 
            console.log(tds)
            for (let elem  of  tds.values()) 
             {   
               let input=elem.$el.children[0];
               obj[input.tdkey]=decodeURIComponent(input.value)
              }
              this.$emit("rowSave",obj) 
           },
         selected(){
                
         },
         edit(r){  
               htmlSetAttribute.call(this,`editBtn${r}`,'style','"display:none"') 
               htmlSetAttribute.call(this,`del${r}`,'style','"display:none"') 
               htmlremoveAttribute.call(this,`saveBtn${r}`,'style')
               htmlremoveAttribute.call(this,`cancelBtn${r}`,'style')
               htmlSetAttribute.call(this,`r${r}`,'style','"display:none"') 
               htmlremoveAttribute.call(this,`rt${r}`,'style')
           }
      }
  }
  </script>
  
  <style scoped>
   .table-bordered {
    border: 1px solid #EBEBEB;
    }
   
   .table-bordered {
    border: 1px solid #ddd;
    }
    
    .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    }
   
    .table-bordered {
    border: 1px solid #ddd;
    }
    
    .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    }
    
    table {
    background-color: transparent;
    }

    table {
    border-spacing: 0;
    border-collapse: collapse;
    }
    
    table {
    background-color: transparent;
   }
   
   
   table {
    border-spacing: 0;
    border-collapse: collapse;
}

.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
    border-top: 1px solid #e7eaec;
    line-height: 1.42857;
    padding: 4px;
    vertical-align: middle;
}

.table>thead>tr>th {
    border-bottom: 1px solid #DDD;
}

.table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
    border: 1px solid #e7e7e7;
}

.table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
    background-color: #F5F5F6;
}
  </style>
  
