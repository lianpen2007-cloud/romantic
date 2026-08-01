<template>
    <div class="c-menu">
        <el-menu
            default-active="market-welcome"
            @select="onSelect">
            <el-submenu index="market">
                <template slot="title">
                    <i class="el-icon-s-data"></i>
                    <span>弧盘工坊</span>
                </template>
                <el-menu-item index="market-welcome">欢迎欢迎</el-menu-item>
                <el-menu-item index="market-day">日线图/月线图</el-menu-item>
                <el-menu-item index="market-minute">分时图</el-menu-item>
            </el-submenu>
            <el-submenu index="chan">
                <template slot="title">
                    <i class="el-icon-key"></i>
                    <span>缠论</span>
                </template>
                <el-menu-item index="chan-kline">缠论k线</el-menu-item>
                <el-menu-item index="chan-fractal">分型</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>

export default {
  name: 'c-menu',
  methods: {
    onSelect(page) {
        console.log(page)
    }
  }
}
</script>

<style>
</style>
