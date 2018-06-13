<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu style=""
      mode="vertical"
    
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style>
.el-menu-item{
       font-size: 18px;
     }
.el-scrollbar__wrap {
    overflow: hidden; 
    height: 100%;
}
</style>
