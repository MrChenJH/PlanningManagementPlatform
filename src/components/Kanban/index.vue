<template>
  <div class="board-column">
    <div class="board-column-header">
      {{headerText}}
    </div>
    <draggable
      class="board-column-content"
      :list="list"
      :options="options">
      <div class="board-item" v-for="element in list" :key="element.id">
        <div style="float:left;    background-color: rgba(106, 192, 68, 1);
         box-sizing: border-box;
         border-width: 1px;
         border-style: solid;
         border-color: rgba(121, 121, 121, 1);
         width: 21px;">ss</div>
        <DIV  style=" border-width: 1px;
         border-style: solid;
         border-color: rgba(121, 121, 121, 1);">
        {{element.jhlb}} {{element.id+headerText}}
        </DIV>
      </div>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  name: 'dragKanban-demo',
  components: {
    draggable
  },
  props: {
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
.board-column {
  min-width: 300px;
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
    padding-bottom: 20px;
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
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);
     }
  }
}
</style>

