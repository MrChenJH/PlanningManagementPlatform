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

export  function d(){
    let month=["January","February","March","April","May","June","July","August","September","October","November","December"]; 
    let m= (new Date()).getMonth()
    let week=['日','一','二','三','四','五','六'] 
    let w='星期'+ week[(new Date()).getDay()]
    return {m:month[m],w:w};
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


