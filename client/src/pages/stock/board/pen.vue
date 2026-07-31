
<template>
    <div class="c-pen">
        <div class="charts">
            <div class="chart_wrapper">
                <div id="pen_price" class="chart" />
            </div>
        </div>
    </div>
</template>

<script>

import * as echarts from 'echarts'

export default {
    name: 'c-pen',
    props: {
        response_fractal: Array,
        response_mergedKline: Array,
        response_pen: Array
    },  
    data() {
        return {
            chart: null,
        }
    },
    computed: {
        mergedKLineList() {
            return this.response_mergedKline || []
        },
        fractalList() {
            return this.response_fractal || []
        },
        penList() {
            return this.response_pen || []
        }
    },
    async mounted() {
        this.chart = echarts.init(document.getElementById('pen_price'))
        this.chart.on('click', this.onChartClick)
        
    },
    methods: {
        paint() {
            const min = this.getMin(this.mergedKLineList)
            const max = this.getMax(this.mergedKLineList)
            const height = Math.max(440, 440 * max / min)
            document.getElementById('pen_price').style.height = height + 'px'
            const width = Math.max(this.mergedKLineList.length * 10, 800)
            document.getElementById('pen_price').style.width = Math.max(document.body.clientWidth, width) + 'px'
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
                    }, {
                        name: '顶分标记',
                        type: 'scatter',
                        coordinateSystem: 'cartesian2d',
                        symbolSize: 10,
                        data: this.fractalList.map(f => {
                            const triangleDownPath = 'path://M0,0 L10,10 L-10,10 Z';
                            const symbol = f.type === 'top' ? 'triangle' : triangleDownPath;
                            const color = f.type === 'top' ? 'red' : 'green';
                            return  {
                                value: [this.formatTimestampToDateTime(f.timestamp), f.price],
                                symbol,
                                itemStyle: { color },
                                tooltip: {
                                    formatter: () => `${f.type === 'top' ? '顶' : '底'}分型<br/>价格：${f.price}<br/>时间：${new Date(f.timestamp).toLocaleString()}`,
                                }
                            }
                        }),
                    },
                    // 4. 笔
                    {
                        name: '笔',
                        type: 'line',
                        symbolSize: 4,
                        data: this.getPenSeriesData()
                    },
                ]
            }
            this.chart.setOption(option)
            this.chart.resize()
        },
        getPenSeriesData() {
            const pointList = this.penList.map(pen => {
                return [
                    this.formatTimestampToDateTime(pen.timestamp), 
                    pen.startPrice
                ]
            })
            const lastPen = this.penList[this.penList.length - 1]
            const lastPoint = [
                this.formatTimestampToDateTime(lastPen.timestamp2), 
                lastPen.endPrice
            ]
            pointList.push(lastPoint)
            return pointList
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
.c-pen .charts .chart_wrapper {
    width: 100%;
    overflow-x: scroll;
}
.c-pen .charts .chart {
    width: 100%;
    height: 440px;
    margin-top: -40px;
}
.c-pen .charts .volumn_chart {
    width: 100%;
    height: 220px;
    margin-top: -100px;
    position: relative;
    z-index: -1;
}
</style>