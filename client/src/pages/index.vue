

<template>
  <div class="p-index">
      <el-form>
        <el-form-item label="股票">
          <el-button type="primary" @click="onJumpStockBoard('000629.SZ')">钒钛股份</el-button>
          <el-button type="primary" @click="onJumpStockBoard('301228.SZ')">实朴检测</el-button>
        </el-form-item>
        <el-form-item label="跑批">
          <el-button type="primary" @click="onJump('/batch/report/report001')">趋势统计</el-button>
        </el-form-item>
        <el-form-item label="报告">
          <el-button type="primary" @click="onJump('/batch/report/report001')">报告001</el-button>
          <el-button type="primary" @click="onJump('/batch/report/report002')">报告002</el-button>
          <el-button type="primary" @click="onJump('/batch/report/report003')">报告003</el-button>
          <el-button type="primary" @click="onJump('/batch/report/report004')">报告004</el-button>
          <el-button type="primary" @click="onJump('/batch/report/report005')">报告005</el-button>
          <el-button type="primary" @click="onJump('/batch/report/report006')">报告006</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { Button, Form, FormItem } from 'element-ui'
export default {
  name: 'p-index',
  components: {
    'el-form': Form, 
    'el-form-item': FormItem, 
    'el-button': Button
  },
  methods: {
    /**
     * 股票
     */
    onJumpStockBoard(stockCode) {
      location.href = `/stock/board?stockCode=${encodeURIComponent(stockCode)}`
    },
    /**
     * 跑批
     */
    onJump(url) {
      location.href = url
    }
  }
}

</script>

<style lang="css">
    .p-index {
        margin: 20px;
    }
</style>