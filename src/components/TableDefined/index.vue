<template> 
  <div >
   <table class="table table-bordered">
                        <thead> 
                        <tr>
                            <th>#</th>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>年龄</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody> 
                           <template v-for="obj in  coldatas">
                            <tr> 
                                  <template v-for="(v,k) in obj">
                                        <td :ref="'r'+obj.index" >{{v}}</td>
                                        <td :ref="'rt'+obj.index" style="display:none"><el-input   :value="obj[k]"   :ref="'td'+obj.index" :tdkey="'tb'+k"/></td> 
                                 </template>
                                 <td><el-button :ref="'editBtn'+obj.index"      @click="edit(obj.index)">编辑</el-button>
                                     <el-button :ref="'saveBtn'+obj.index"      @click="save(obj.index)">保存</el-button> 
                                     <el-button :ref="'cancelBtn'+obj.index"    @click="cancel(obj.index)">取消</el-button>
                                 </td> 
                            </tr> 
                            </template>
                         </tbody>
                    </table>
                      </div>
  </template>
  <script>
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
             var btns=[];
               eval("btns=this.$refs.editBtn"+r)  
               for (let elem of btns.values()) 
                {   
                 elem.$el.removeAttribute("style");
                }
               eval("btns=this.$refs.saveBtn"+r) 
                for (let elem of btns.values()) 
                { 
                        elem.$el.style="display:none";
                }
              
               eval("btns=this.$refs.cancelBtn"+r) 
               for (let elem of btns.values()) 
                { 
                    elem.$el.style="display:none";
                }

             var tds=[];
             eval("tds=this.$refs.r"+r)
              
             for (let elem of tds.values()) 
                {  
                   elem.removeAttribute("style");
              
                }

              var tdrs=[];
             eval("tdrs=this.$refs.rt"+r)
                             
             for (let elem  of  tdrs.values()) 
                {   
                    elem.style.display="none";
                     
                }
          },
          save(r){ 
            var obj=this.coldatas.find(item=>item.index==r);
            var tds=[];
            eval("tds=this.$refs.td"+r) 
            for (let elem  of  tds.values()) 
                {   
                     obj[elem.tdkey]=elem.value;
                }

        const prom= new Promise((resolve, reject) => {
            resolve(obj)
            console.log(2);
            this.cancel(r)
        
      })
            this.$emit("rowSave",prom)
          },
          change(){
                 console.log("xxx")
                 this.$emit("alert")
         },
         edit(r){   

               var btns=[];
               eval("btns=this.$refs.editBtn"+r)  
               for (let elem of btns.values()) 
                {   
                 elem.$el.style.display="none";
                }
               eval("btns=this.$refs.saveBtn"+r) 
                for (let elem of btns.values()) 
                { 
                  elem.$el.removeAttribute("style");
                }
              
               eval("btns=this.$refs.cancelBtn"+r) 
               for (let elem of btns.values()) 
                { 
                     elem.$el.removeAttribute("style");
                }

             var tds=[];
             eval("tds=this.$refs.r"+r)
              
             for (let elem of tds.values()) 
                {  
                  
                 elem.style.display="none";
                }

              var tdrs=[];
             eval("tdrs=this.$refs.rt"+r)
                             
             for (let elem  of  tdrs.values()) 
                {   
                    elem.removeAttribute("style");
                     
                }
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
    padding: 8px;
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
  
