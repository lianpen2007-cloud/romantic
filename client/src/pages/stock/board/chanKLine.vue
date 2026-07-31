
<template>
    <div class="c-chanKLine" v-if="response">
        <div class="charts">
            <div class="chart_wrapper">
                <div id="chanKLine_price" class="chart" />
            </div>
        </div>
    </div>
</template>

<script>

import * as echarts from 'echarts'

export default {
    name: 'c-chanKLine',
    props: {
        response: Array,
    },  
    data() {
        return {
            chart: null,
        }
    },
    computed: {
        chanKLineList() {
            const ret = this.response || []
            return ret.slice(0, 1000)
        }
    },
    async mounted() {
        this.chart = echarts.init(document.getElementById('chanKLine_price'))
        this.chart.on('click', this.onChartClick)
    },
    methods: {
        paint() {
            const min = this.getMin(this.chanKLineList)
            const max = this.getMax(this.chanKLineList)
            const height = Math.max(440, 220 * max / min)
            document.getElementById('chanKLine_price').style.height = height + 'px'
            const width = this.chanKLineList.length * 10
            document.getElementById('chanKLine_price').style.width = width + 'px'
            this.drawchart()
        },
        drawchart() {
            const chanKLineList = this.chanKLineList
            const min = this.getMin(chanKLineList)
            const max = this.getMax(chanKLineList)
            const timeList = chanKLineList.map(o => this.formatTimestampToDateTime(o.timestamp))

            const option = {
                grid: {
                    left: '0%',
                    right: '0%'
                },
                xAxis: {
                    type: 'category',
                    data: timeList,
                },
                yAxis: {
                    type: 'value',
                    name: '价格',
                    min,
                    max
                },
                series: [
                    {
                        name: 'Placeholder',
                        type: 'bar',
                        stack: 'Total',
                        itemStyle: {
                            borderColor: 'transparent',
                            color: 'transparent'
                        },
                        emphasis: {
                            itemStyle: {
                                borderColor: 'transparent',
                                color: 'transparent'
                            }
                        },
                        data: chanKLineList.map(item => item.low)
                    },
                    {
                        name: 'Life Cost',
                        type: 'bar',
                        stack: 'Total',
                        barWidth: 4,
                        data: chanKLineList.map(item => item.high - item.low)
                    }
                ]
            }
            this.chart.setOption(option)
            this.chart.resize()
        },
        getMin(chanKLineList) {
            const list = chanKLineList.map(o => {
                const a4 = this.getSeriesData(o)
                return Math.min(...a4)
            })
            return Math.min(...list)
        },
        getMax(chanKLineList) {
            const list = chanKLineList.map(o => {
                const a4 = this.getSeriesData(o)
                return Math.max(...a4)
            })
            return Math.max(...list)
        },
        getSeriesData(o) {
            // this.open = Number(data.open.toFixed(2)); // 开盘价（保留2位小数，避免精度问题）
            // this.high = Number(data.high.toFixed(2)); // 最高价
            // this.low = Number(data.low.toFixed(2)); // 最低价
            // this.close = Number(data.close.toFixed(2)); // 收盘价
            return [o.low, o.high]
        },
        onChartClick(event) {
            const dataIndex = event.dataIndex
            this.$emit('onchanKLineClick', dataIndex)
        },

        formatTimestampToDateTime(timestamp) {
            if (!timestamp || isNaN(timestamp)) {
                return '无效时间';
            }
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        }

    }
}

</script>
<style>
.c-chanKLine .charts .chart_wrapper {
    width: 100%;
    overflow-x: scroll;
}
.c-chanKLine .charts .chart {
    width: 100%;
    height: 440px;
    margin-top: -40px;
}
.c-chanKLine .charts .volumn_chart {
    width: 100%;
    height: 220px;
    margin-top: -100px;
    position: relative;
    z-index: -1;
}
</style>