<template>
<DIV>
   
</DIV>
</template>

<script>
export default {
  
}
</script>


// import img from '@/assets/u44.png'
// import {d} from '@/utils/tool'

// export default {
//   data() {
//     return {
//       rows:[0,1,2,3],
//      img:img,
//      months:["January","February","March","April","May","June","July","August","September","October","November","December"],
//      month:d().m,
//      week:d().w,
//      x:0,
//      y:0,
//      l:0,
//      t:0,
//      isDown: false
//     }
//   },
//   render(h) {

// return (
     
//       }
//       }
//     )
//   },
//   methods: {
//     onSubmit() {
//       this.$message('submit!')
//     },
//     onCancel() {
//       this.$message({
//         message: 'cancel!',
//         type: 'warning'
//       })
//     },over(e){
      
//       console.log(e);
//     },
//     down(e){
//      this.$refs.div1.style.position='absolute'
//     //获取x坐标和y坐标
//     this.x = e.clientX;
//     this.y = e.clientY;
//     let div= this.$refs.div1;
//     //获取左部和顶部的偏移量
//     this.l = div.offsetLeft;
//     this.t = div.offsetTop;
//     //开关打开
//     this.isDown = true;
//     //设置样式 
   
//      div.style.cursor = 'move';

//     },move(e){
    
//     if (this.isDown == false) {
//         return;
//     }
//     //获取x和y
//     var nx = e.clientX;
//     var ny = e.clientY;
//     //计算移动后的左偏移量和顶部的偏移量
//     var nl = nx - (this.x - this.l);
//     var nt = ny - (this.y - this.t);

//       this.$refs.div1.style.left = nl + 'px';
//       this.$refs.div1.style.top = nt + 'px';

//     },mouseup () {
//     //开关关闭
//      this.isDown = false;
//      this.$refs.div1.style.cursor = 'default';
// }
//   }
// }



