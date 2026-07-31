
<template>
    <div class="c-rawKLine" v-if="response">
        <div class="charts">
            <div class="chart_wrapper">
                <div id="rawKLine_price" class="chart" />
            </div>
        </div>
    </div>
</template>

<script>

import * as echarts from 'echarts'

export default {
    name: 'c-rawKLine',
    props: {
        response: Array,
    },  
    data() {
        return {
            chart: null,
        }
    },
    computed: {
        rawKLineList() {
            const ret = this.response || []
            return ret.slice(0, 1000)
        }
    },
    async mounted() {
        this.chart = echarts.init(document.getElementById('rawKLine_price'))
        this.chart.on('click', this.onChartClick)
    },
    methods: {
        paint() {
            const min = this.getMin(this.rawKLineList)
            const max = this.getMax(this.rawKLineList)
            const height = Math.max(440, 220 * max / min)
            document.getElementById('rawKLine_price').style.height = height + 'px'
            const width = this.rawKLineList.length * 10
            document.getElementById('rawKLine_price').style.width = width + 'px'
            this.drawchart()
        },
        drawchart() {
            const rawKLineList = this.rawKLineList
            const min = this.getMin(rawKLineList)
            const max = this.getMax(rawKLineList)
            const timeList = rawKLineList.map(o => this.formatTimestampToDateTime(o.timestamp))
            const option = {
                colorBy: 'data',
                grid: {
                    left: '0%',
                    right: '0%'
                },
                xAxis: {
                    data: timeList
                },
                yAxis: {
                    type: 'value',
                    min,
                    max
                },
                series: [
                    {
                        type: 'candlestick',
                        data: rawKLineList.map((o, index2) => {
                            return {
                                value: this.getSeriesData(o),
                                itemStyle: {
                                    borderColor: undefined
                                }
                            }
                        })
                    }
                ]
            }
            this.chart.setOption(option)
            this.chart.resize()
        },
        getMin(rawKLineList) {
            const list = rawKLineList.map(o => {
                const a4 = this.getSeriesData(o)
                return Math.min(...a4)
            })
            return Math.min(...list)
        },
        getMax(rawKLineList) {
            const list = rawKLineList.map(o => {
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
            return [o.open, o.close, o.low, o.high]
        },
        onChartClick(event) {
            const dataIndex = event.dataIndex
            this.$emit('onrawKLineClick', dataIndex)
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
.c-rawKLine .charts .chart_wrapper {
    width: 100%;
    overflow-x: scroll;
}
.c-rawKLine .charts .chart {
    width: 100%;
    height: 440px;
    margin-top: -40px;
}
.c-rawKLine .charts .volumn_chart {
    width: 100%;
    height: 220px;
    margin-top: -100px;
    position: relative;
    z-index: -1;
}
</style>