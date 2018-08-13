'use strict'
export function htmlremoveAttribute(elemRef,attrName){
    let doms=[] 
    console.log(`doms=this.$refs.${elemRef}`);
    eval(`doms=this.$refs.${elemRef}`)   
    
    for (let elem of doms.values()) 
    {   
        if(elem.$el){
        elem.$el.removeAttribute(attrName);
        }else{
            elem.removeAttribute(attrName);
        }
    }
} 

export function htmlSetAttribute(elemRef,attrName,attrVal){
    let doms=[]
    console.log(`doms=this.$refs.${elemRef}`);
    eval(`doms=this.$refs.${elemRef}`)  
    console.log(doms);
     for (let elem of doms.values()) 
     { 
      
        if(elem.$el){
      eval(`elem.$el.${attrName}=${attrVal}`) ;
    }else{
        eval(`elem.${attrName}=${attrVal}`) ;

    }
     }
}

export  function FullTime(){
    let month=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]; 
    let m= (new Date()).getMonth()
    let week=['日','一','二','三','四','五','六'] 
    let w='星期'+ week[(new Date()).getDay()]
    return {y:(new Date()).getFullYear(),m:month[m],w:w,d:(new Date()).getDate(),time:(new Date()).format("hh:mm:ss")};
}



export function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
          row=Object.values(row);
        for (var j = 0; j < row.length; j++) {
            console.log(row[j]);
            var innerValue = row[j] ? row[j].toString() : '';
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }
    var compatible = "\uFEFF";
    var blob = new Blob([compatible + csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");

        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename + '.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}



export  function addWorkDay(date,days){ 
    let year=new Date().format("yyyy")
    console.log(year)
    let d=`${year}-${date}` 
try
  {   
    var t=  new Date(d.replace(/-/g,"/"))
    t.setDate(t.getDate() + days)
    if(t.getDay()==0){
        t.setDate(t.getDate() + 1)
    }
    if(t.getDay()==6){
       t.setDate(t.getDate() + 2)
    }
    return {d:t.format("MM-dd"),sucess:true,err:""}
  }
catch(err)
  {  
      console.log(err)
       return {d:"",sucess:false,err:"日期格式不对，请参照 9-1 这种格式"}
  }

}

const flowKey="flow"
export function  SetFlowData(data){
 localStorage.setItem(flowKey,JSON.stringify(data))
} 

export function  GetFlowData(){
  return  JSON.parse(localStorage.getItem(flowKey))
} 

export function  removeFlowData(){
    localStorage.removeItem(flowKey)
}


const schedulerKey="scheduler" 

export function  SetSchedulerData(data){
    localStorage.setItem(schedulerKey,JSON.stringify(data))
}  

export function  GetSchedulerData(){
    return JSON.parse(localStorage.getItem(schedulerKey))
}  

export function  removeSchedulerData(){
    localStorage.removeItem(SchedulerData)
}


export function ruleRender(){
    let arr=[],cArr=[] 
    for(let i=0;i<this.DynamicCols.length;i++)
    {   
       cArr.push(i)
      if((i+1)%4==0)
      {
   
       arr.push(cArr) 
       cArr=[]
      } 
    }
    if(cArr.length!=0){
      arr.push(cArr)
    }
    
    cArr=[]
    let newArr=[]
    console.log(arr)
    for(let i=0;i<4;i++){
     arr.forEach((v,j)=>{
       if(v[i]==0||v[i]){
         cArr.push(v[i])
         }
     })
    
     newArr.push(cArr)
     cArr=[]
     }

     return newArr
    }
   export function   OrderBy(source, orders, type) {

        if (source instanceof Array && orders instanceof Array && orders.length > 0) {

          var ordersc = orders.concat([]);
          var sorttype = type || 'asc';
          var results = [];
          var totalSum = {};

          function grouporder(source, orders, totalSum) {

            source.sort(function(a, b) {
              var convertA = a[orders[0]];
              var convertB = b[orders[0]];
              if (typeof convertA == 'string' && typeof convertB == 'string') {
                if (sorttype.toUpperCase() == 'ASC') {
                  return convertA.localeCompare(convertB);
                } else {
                  return convertB.localeCompare(convertA);
                }
              } else {
                if (sorttype.toUpperCase() == 'ASC') {
                  return convertA - convertB;
                } else {
                  return convertB - convertA;
                }
              }

            })

            var groupmap = new Map();
            source.forEach((item) => {
              if (groupmap.has(item[orders[0]])) {
                groupmap.get(item[orders[0]]).push(item);
              } else {
                groupmap.set(item[orders[0]], []);
                groupmap.get(item[orders[0]]).push(item);
              }
            })



            orders.shift();

            for (let [key, val] of groupmap) {

              totalSum[key] = {};
              totalSum[key].name = key;
              totalSum[key].value = val.length;
              if (orders.length == 0) {
                results = results.concat(val);
              } else {
                totalSum[key].children = {};
                var orderscopy = orders.concat([]);
                grouporder(val, orderscopy, totalSum[key].children);
              }
            }
          }

          grouporder(source, ordersc, totalSum);

          return {
            results: results,
            totalSum: totalSum
          };
        } else {
          return source;
        }
      }

