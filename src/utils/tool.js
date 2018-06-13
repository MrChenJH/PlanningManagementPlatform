
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

