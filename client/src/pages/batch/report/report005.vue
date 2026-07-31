
<template>
    <div class="p-batch-report-report005" v-if="series">
        <el-descriptions title="报告005">
            <el-descriptions-item label="猜想">
                如果中枢中阴，那么中枢抵抗率，和这个中枢的离开线段的亏损是什么关联？
            </el-descriptions-item>
        </el-descriptions>
        <div id="chart" />
        <el-descriptions title="结论" :column="1">
            <el-descriptions-item label="上升趋势中">
                横有多长，向下竖的也多高。。。 <br />
                悲剧 <br />
            </el-descriptions-item>
        </el-descriptions>
    </div>
    <div v-else>
        loading...
    </div>
</template>

<script>

import lin from '../../../common/lin'
import * as echarts from 'echarts'


export default {
    name: 'p-batch-report-report005',
    data() {
        return {
            series: null,
        }
    },
    async mounted() {
        await this.load()
        this.drawChart()
    },
    methods: {
        async load() {
            this.series = await lin.load(`/query/report/report005`)
            this.series = this.series.filter(o => o.number > 50) // 样本量大于50
        },
        drawChart() {
            const option = {
                grid: {
                    left: '0%',
                    right: '0%'
                },
                xAxis: {
                    type: 'category',
                    name: '抵抗率',
                    data: this.series.map(o => o.x),
                },
                yAxis: {
                    type: 'value',
                    name: '收益率',
                    // min: 0,
                    // max: 100
                },
                series: [
                    {
                        type: 'bar',
                        data: this.series.map(o => o.y),
                    }
                ]
            }
            this.chart = echarts.init(document.getElementById('chart'))
            this.chart.setOption(option)
            this.chart.resize()
        },
    }

}
</script>


<style>
    .p-batch-report-report005 {
        padding: 20px;
    }
    #chart {
        width: 100%;
        height: 400px;
    }
    #chart2 {
        width: 100%;
        height: 400px;
    }
</style>