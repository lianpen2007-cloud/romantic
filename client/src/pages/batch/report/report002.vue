
<template>
    <div class="p-batch-report-report002" v-if="centralList">
        <el-descriptions title="报告002">
            <el-descriptions-item label="猜想">
                猜想一个中枢的进入线段的抵抗程度，和这个中枢是否是中阴中枢会有一定关联。如果抵抗程度越低越容易是中阴中枢的话，那么就可以指导趋势反转的操作
            </el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="统计" :column="1">
            <el-descriptions-item label="以下降线段进入的中枢">
                成为中阴中枢（下降趋势延续）的数量为： {{ zy_enterDown_list.length }}个。 不成为中阴中枢（反转为上升）的数量为： {{ notzy_enterDown_list.length }}个。
            </el-descriptions-item>
            <el-descriptions-item label="以上升线段进入的中枢">
                成为中阴中枢（上升趋势延续）的数量为： {{ zy_enterUp_list.length }}个。 不成为中阴中枢（反转为下降）的数量为： {{ notzy_enterUp_list.length }}个。
            </el-descriptions-item>
        </el-descriptions>

        <el-descriptions title="计算" :column="1">
            <el-descriptions-item label="以下降线段进入的中枢的平均抵抗力1">
                成为中阴中枢（下降趋势延续）的进入线段是： {{ zy_enterDown_assistPower1 }}。 不成为中阴中枢（反转为上升）是： {{ notzy_enterDown_assistPower1 }}。
            </el-descriptions-item>
            <el-descriptions-item label="以上升线段进入的中枢的平均抵抗力1">
                成为中阴中枢（上升趋势延续）的进入线段是： {{ zy_enterUp_assistPower1 }}。 不成为中阴中枢（反转为下降）是： {{ notzy_enterUp_assistPower1 }}。
            </el-descriptions-item>
            <el-descriptions-item label="以下降线段进入的中枢的平均抵抗力2">
                成为中阴中枢（下降趋势延续）的进入线段是： {{ zy_enterDown_assistPower2 }}。 不成为中阴中枢（反转为上升）是： {{ notzy_enterDown_assistPower2 }}。
            </el-descriptions-item>
            <el-descriptions-item label="以上升线段进入的中枢的平均抵抗力2">
                成为中阴中枢（上升趋势延续）的进入线段是： {{ zy_enterUp_assistPower2 }}。 不成为中阴中枢（反转为下降）是： {{ notzy_enterUp_assistPower2 }}。
            </el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="结论" :column="1">
            <el-descriptions-item label="统计效果">
                不想说话
            </el-descriptions-item>
            <el-descriptions-item label="价值">
                不过仔细看的话，能看出些价值。 <br />
                如果是一个上升线段进来的，如果这个上升线段的抵抗力1（相对振幅）大些（比如大于0.6），那么就容易延续上升趋势。相反，如果抵抗力1小些（比如小于0.5），那么就容易中阴为下降趋势。 <br />
                而抵抗力2则相反。如果这个上升线段的抵抗力2（相对最小股价）小些（比如小于0.04），那么就容易延续上升趋势。相反，如果抵抗力2大些（比如大于0.05），那么就容易中阴为下降趋势。<br />
                抵抗力1和抵抗力2的被除数是一样的，那么就说明，股价高的股票容易延续上升趋势，和通常认知是相反的。 <br />
                我是觉得抵抗力2没什么价值。抵抗力1是有价值的，体现了奔走型走势的性质。
            </el-descriptions-item>
            <el-descriptions-item label="todo">
                我是，不甘心就这么没有成绩。我要画个分布图才能死心。 <br />
                能否以一个趋势中抵抗力是否衰减为统计项呢？
            </el-descriptions-item>
        </el-descriptions>
        <div id="chart" />
        <div id="chart2" />
        <el-descriptions title="结论" :column="1">
            <el-descriptions-item label="上升趋势中">
                进入中枢线段的抵抗率越高越好 <br />
                0.1以下的成功率只有52.9%，0.1~0.2的成功率猛增至57.6 <br />
                之后逐渐提升，1.6~1.7的成功率提升至72% <br />
                之后有所回调，但总体还是成正比的，最终成长至2.5以上的抵抗率时，任然有531个中枢，成功率高达惊人的82.5%！
            </el-descriptions-item>
            <el-descriptions-item label="下降趋势中">
                总体一半一半，只有0.04~0.05的中阴率有2/3这么高，但是样本量很低 <br />
                所以结论就是，不要做下降趋势，中阴反转的概率总体是一半 <br />
            </el-descriptions-item>
            <el-descriptions-item label="todo">
                以上只是统计了成功率，还没有统计收益率。已经很有价值<br />
                证明了，上升趋势中，抵抗率和趋势延续成功率成正比。它给了我极大的亢奋。
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
    name: 'p-batch-report-report002',
    data() {
        return {
            centralList: null,

            zy_enterDown_list: [],
            zy_enterUp_list: [],
            notzy_enterDown_list: [],
            notzy_enterUp_list: [],

            zy_enterDown_assistPower1: 0,
            zy_enterUp_assistPower1: 0,
            notzy_enterDown_assistPower1: 0,
            notzy_enterUp_assistPower1: 0,

            zy_enterDown_assistPower2: 0,
            zy_enterUp_assistPower2: 0,
            notzy_enterDown_assistPower2: 0,
            notzy_enterUp_assistPower2: 0
        }
    },
    async mounted() {
        await this.load()
        this.start()
        this.drawChart()
        this.drawChart2()
    },
    methods: {
        /**
         * 绘制图表
         * 横坐标是抵抗率，从0到2
         * 纵坐标是上升趋势延续成功率
         */
        getSeries(enterUpCentrals, min, max) {
            const centrals = enterUpCentrals.filter(c => {
                if (min) {
                    if (c.assistPowerRate1 <= min) return false
                } 
                if (max) {
                    if (c.assistPowerRate1 > max) return false
                }
                return true
            }) 
            const goodCentrals = centrals.filter(c => c.type != '中阴中枢')
            const goodPercent = Number((goodCentrals.length / centrals.length * 100).toFixed(2))
            const x = max ? `${min}~${max}` : `>= ${min}`
            return {
                x,
                y: goodPercent,
                number: centrals.length
            }
        },
        drawChart() {
            const enterUpCentrals = this.centralList.filter(c => c.enterDirection == 'up')
            const list = []
            let i = 0 
            while (i < 0.1) {
                const min = i 
                const max = Number((i + 0.01).toFixed(2))
                const series = this.getSeries(enterUpCentrals, min, max)
                list.push(series)
                i = Number((i + 0.01).toFixed(2))
            }
            while (i < 2.5) {
                const min = i 
                const max = Number((i + 0.1).toFixed(1))
                const series = this.getSeries(enterUpCentrals, min, max)
                list.push(series)
                i = Number((i + 0.1).toFixed(1))
            }
            const series = this.getSeries(enterUpCentrals, 2.5)
            list.push(series)
            console.log(list)
            const option = {
                grid: {
                    left: '0%',
                    right: '0%'
                },
                xAxis: {
                    type: 'category',
                    name: '抵抗率',
                    data: list.map(o => o.x),
                },
                yAxis: {
                    type: 'value',
                    name: '上升趋势延续率',
                    min: 0,
                    max: 100
                },
                series: [
                    {
                        type: 'bar',
                        data: list.map(o => o.y),
                    }
                ]
            }
            this.chart = echarts.init(document.getElementById('chart'))
            this.chart.setOption(option)
            this.chart.resize()
        },
        drawChart2() {
            const enterUpCentrals = this.centralList.filter(c => c.enterDirection == 'down')
            const list = []
            let i = 0 
            while (i < 0.1) {
                const min = i 
                const max = Number((i + 0.01).toFixed(2))
                const series = this.getSeries(enterUpCentrals, min, max)
                list.push(series)
                i = Number((i + 0.01).toFixed(2))
            }
            while (i < 2.5) {
                const min = i 
                const max = Number((i + 0.1).toFixed(1))
                const series = this.getSeries(enterUpCentrals, min, max)
                list.push(series)
                i = Number((i + 0.1).toFixed(1))
            }
            const series = this.getSeries(enterUpCentrals, 2.5)
            list.push(series)
            console.log(list)
            const option = {
                grid: {
                    left: '0%',
                    right: '0%'
                },
                xAxis: {
                    type: 'category',
                    name: '抵抗率',
                    data: list.map(o => o.x),
                },
                yAxis: {
                    type: 'value',
                    name: '下降趋势延续率',
                    min: 0,
                    max: 100
                },
                series: [
                    {
                        type: 'bar',
                        data: list.map(o => o.y),
                    }
                ]
            }
            this.chart2 = echarts.init(document.getElementById('chart2'))
            this.chart2.setOption(option)
            this.chart2.resize()
        },
        async load() {
            this.centralList = await lin.load(`/query/report/report002`)
        },
        start() {
            this.zy_enterDown_list = this.centralList.filter(c => c.type == '中阴中枢' && c.enterDirection == 'down')
            this.zy_enterUp_list = this.centralList.filter(c => c.type == '中阴中枢' && c.enterDirection == 'up')
            this.notzy_enterDown_list = this.centralList.filter(c => c.type != '中阴中枢' && c.enterDirection == 'down')
            this.notzy_enterUp_list = this.centralList.filter(c => c.type != '中阴中枢' && c.enterDirection == 'up')

            this.zy_enterDown_assistPower1 = this.getAverage(this.zy_enterDown_list.map(o => o.assistPowerRate1))
            this.zy_enterUp_assistPower1 = this.getAverage(this.zy_enterUp_list.map(o => o.assistPowerRate1))
            this.notzy_enterDown_assistPower1 = this.getAverage(this.notzy_enterDown_list.map(o => o.assistPowerRate1))
            this.notzy_enterUp_assistPower1 = this.getAverage(this.notzy_enterUp_list.map(o => o.assistPowerRate1))

            this.zy_enterDown_assistPower2 = this.getAverage(this.zy_enterDown_list.map(o => o.assistPowerRate2))
            this.zy_enterUp_assistPower2 = this.getAverage(this.zy_enterUp_list.map(o => o.assistPowerRate2))
            this.notzy_enterDown_assistPower2 = this.getAverage(this.notzy_enterDown_list.map(o => o.assistPowerRate2))
            this.notzy_enterUp_assistPower2 = this.getAverage(this.notzy_enterUp_list.map(o => o.assistPowerRate2))
        },
        getAverage(list) {
            let ret = 0
            for (let i = 0; i <= list.length - 1; i += 1) {
                ret += list[i]
            }
            ret /= list.length
            return Number(ret.toFixed(4))
        }
    }

}
</script>


<style>
    .p-batch-report-report002 {
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