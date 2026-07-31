
<template>
    <div class="c-mergedKLine" v-if="response">
        <div class="charts">
            <div class="chart_wrapper">
                <div id="mergedKLine_price" class="chart" />
            </div>
        </div>
    </div>
</template>

<script>

import * as echarts from 'echarts'

export default {
    name: 'c-mergedKLine',
    props: {
        response: Array,
    },  
    data() {
        return {
            chart: null,
        }
    },
    computed: {
        mergedKLineList() {
            const ret = this.response || []
            return ret.slice(0, 1000)
        }
    },
    async mounted() {
        this.chart = echarts.init(document.getElementById('mergedKLine_price'))
        this.chart.on('click', this.onChartClick)
    },
    methods: {
        paint() {
            const min = this.getMin(this.mergedKLineList)
            const max = this.getMax(this.mergedKLineList)
            const height = Math.max(440, 220 * max / min)
            document.getElementById('mergedKLine_price').style.height = height + 'px'
            const width = Math.max(this.mergedKLineList.length * 10, 800)
            document.getElementById('mergedKLine_price').style.width = Math.max(document.body.clientWidth, width) + 'px'
            this.drawchart()
        },
        drawchart() {
            const mergedKLineList = this.mergedKLineList
            const min = this.getMin(mergedKLineList)
            const max = this.getMax(mergedKLineList)
            const timeList = mergedKLineList.map(o => this.formatTimestampToDateTime(o.timestamp))

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
                        data: mergedKLineList.map(item => item.low)
                    },
                    {
                        name: 'Life Cost',
                        type: 'bar',
                        stack: 'Total',
                        barWidth: 4,
                        data: mergedKLineList.map(item => item.high - item.low)
                    }
                ]
            }
            this.chart.setOption(option)
            this.chart.resize()
        },
        getMin(mergedKLineList) {
            const list = mergedKLineList.map(o => {
                const a4 = this.getSeriesData(o)
                return Math.min(...a4)
            })
            return Math.min(...list)
        },
        getMax(mergedKLineList) {
            const list = mergedKLineList.map(o => {
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
            this.$emit('onmergedKLineClick', dataIndex)
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
.c-mergedKLine .charts .chart_wrapper {
    width: 100%;
    overflow-x: scroll;
}
.c-mergedKLine .charts .chart {
    width: 100%;
    height: 440px;
    margin-top: -40px;
}
.c-mergedKLine .charts .volumn_chart {
    width: 100%;
    height: 220px;
    margin-top: -100px;
    position: relative;
    z-index: -1;
}
</style>