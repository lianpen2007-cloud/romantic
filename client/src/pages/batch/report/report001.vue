
<template>
    <div class="p-batch-report-report001">
        <el-descriptions title="报告001">
            <el-descriptions-item label="猜想">
                猜想一个趋势的中枢数量有一定的规律，如果能找到这个规律，就能指导下一个中枢是不是中阴中枢，也就是趋势会不会结束。
            </el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="统计" :column="2">
            <el-descriptions-item label="上升趋势">
                {{ this.statistics.upTrend.map(o => `${o.centralNumber}中枢${o.trendNumber}`).join(';;') }}
            </el-descriptions-item>
            <el-descriptions-item label="下降趋势">
                {{ this.statistics.downTrend.map(o => `${o.centralNumber}中枢${o.trendNumber}`).join(';;') }}
            </el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="计算" :column="2">
            <el-descriptions-item label="上升趋势中" v-for="o in calculator.upTrend">
                    如果当前有{{ o.centralNumber }}个中枢，那么下一个中枢有{{ o.continueRate }}%的概率是趋势中枢
            </el-descriptions-item>
            <el-descriptions-item label="下降趋势中" v-for="o in calculator.downTrend">
                    如果当前有{{ o.centralNumber }}个中枢，那么下一个中枢有{{ o.continueRate }}%的概率趋势中枢
            </el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="结论" :column="1">
            <el-descriptions-item label="统计效果">
                    完全无效。几乎就是一半一半，惊人的无效！
            </el-descriptions-item>
            <el-descriptions-item label="价值">
                    硬说价值的话，上升趋势中，延续趋势的概率较大；下降趋势中，延续趋势的概率较小。和今年的大盘表现是一致的。
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>

import lin from '../../../common/lin'

export default {
    name: 'p-batch-trend',
    data() {
        return {
            trendList: null,
            upTrendList: null,
            downTrendList: null,
            statistics: {
                upTrend: [],
                downTrend: []
            },
            calculator: {
                upTrend: [],
                downTrend: []
            }
        }
    },
    async mounted() {
        await this.load()
        this.start()
    },
    methods: {
        async load() {
            this.trendList = await lin.load(`/query/report/report001`)
            this.upTrendList = this.trendList.filter(t => t.direction == 'up')
            console.log(this.upTrendList.length)
            this.downTrendList = this.trendList.filter(t => t.direction == 'down')
        },
        start() {
            for (let i = 0; i < 20; i += 1) {
                const trendList = this.upTrendList.filter(trend => trend.centralIds.length == i)
                this.statistics.upTrend.push({
                    centralNumber: i,
                    trendNumber: trendList.length
                })
            }
            for (let i = 0; i < 20; i += 1) {
                const trendList = this.downTrendList.filter(trend => trend.centralIds.length == i)
                this.statistics.downTrend.push({
                    centralNumber: i,
                    trendNumber: trendList.length
                })
            }
            let trendLeftNumber = this.upTrendList.length
            for (let i = 0; i < 10; i += 1) {
                const trendList = this.upTrendList.filter(trend => trend.centralIds.length == i)
                const finishNumber = trendList.length
                const continueNumber = trendLeftNumber - finishNumber
                const continueRate = (continueNumber / trendLeftNumber * 100).toFixed(2)
                trendLeftNumber = continueNumber
                this.calculator.upTrend.push({
                    centralNumber: i,
                    continueRate
                })
            }
            trendLeftNumber = this.downTrendList.length
            for (let i = 0; i < 10; i += 1) {
                const trendList = this.downTrendList.filter(trend => trend.centralIds.length == i)
                const finishNumber = trendList.length
                const continueNumber = trendLeftNumber - finishNumber
                const continueRate = (continueNumber / trendLeftNumber * 100).toFixed(2)
                trendLeftNumber = continueNumber
                this.calculator.downTrend.push({
                    centralNumber: i,
                    continueRate
                })
            }
        }
    }

}
</script>


<style>
    .p-batch-report-report001 {
        padding: 20px;
    }
</style>