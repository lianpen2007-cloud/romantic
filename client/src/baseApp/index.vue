<template>
  <div id="romantic-app">
    <el-row>
      <el-col :span="4">
        <c-menu />
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CMenu from './menu.vue'
export default {
  name: 'App',
  components: {
    CMenu
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>

<style lang="less" scoped>

</style>
