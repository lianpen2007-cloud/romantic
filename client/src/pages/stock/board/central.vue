
<template>
    <div class="c-central">
        <div class="charts">
            <div class="chart_wrapper">
                <div id="central_price" class="chart" />
            </div>
        </div>
    </div>
</template>

<script>

import * as echarts from 'echarts'

export default {
    name: 'c-central',
    props: {
        response_fractal: Array,
        response_mergedKline: Array,
        response_pen: Array,
        response_segment: Array,
        response_central: Array
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
        },
        segmentList() {
            return this.response_segment || []
        },
        centralList() {
            return this.response_central || []
        }
    },
    async mounted() {
        this.chart = echarts.init(document.getElementById('central_price'))
        this.chart.on('click', this.onChartClick)
        
    },
    methods: {
        paint() {
            const min = this.getMin(this.mergedKLineList)
            const max = this.getMax(this.mergedKLineList)
            const height = Math.max(440, 440 * max / min)
            document.getElementById('central_price').style.height = height + 'px'
            // const width = Math.max(this.mergedKLineList.length * 10, 800)
            // document.getElementById('central_price').style.width = document.body.clientWidth * 3 + 'px'
            this.drawchart()
        },
        drawchart() {
            const mergedKLineList = this.mergedKLineList
            const min = this.getMin(mergedKLineList)
            const max = this.getMax(mergedKLineList)
            const option = {
                grid: {
                    left: '0%',
                    right: '0%'
                },
                xAxis: {
                    type: 'time',
                    data: this.getXAxisData(),
                },
                yAxis: {
                    type: 'value',
                    name: '价格',
                    min,
                    max
                },
                series: [
                    // 线段
                    {
                        name: '线段',
                        type: 'line',
                        symbolSize: 4,
                        itemStyle: {
                            color: 'red'
                        },
                        data: this.getSegmentSeriesData(),
                        markArea: {
                            itemStyle: {
                                color: 'rgba(230, 162, 60, .2)',
                                borderColor: '#e6a23c',
                                borderWidth: 1
                            },
                            data: this.getMaskAreaData()
                        }
                    },
                ]
            }
            this.chart.setOption(option)
            this.chart.resize()
        },
        getMaskAreaData() {
            return this.centralList.map(central => {
                return [{
                    coord: [this.formatTimestampToDateTime(central.timestamp), central.upperPrice]
                }, {
                    coord: [this.formatTimestampToDateTime(central.timestamp2), central.lowerPrice]
                }]
            })
        },
        getXAxisData() {
            const list = this.segmentList.map(segment => {
                return this.formatTimestampToDateTime(segment.timestamp)
            })
            const lastSegment = this.segmentList[this.segmentList.length - 1]
            list.push(this.formatTimestampToDateTime(lastSegment.timestamp2))
            return list
        },
        getSegmentSeriesData() {
            const pointList = this.segmentList.map(segment => {
                return [
                    this.formatTimestampToDateTime(segment.timestamp), 
                    segment.startPrice
                ]
            })
            const lastSegment = this.segmentList[this.segmentList.length - 1]
            const lastPoint = [
                this.formatTimestampToDateTime(lastSegment.timestamp2), 
                lastSegment.endPrice
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
.c-central .charts .chart_wrapper {
    width: 100%;
    overflow-x: scroll;
}
.c-central .charts .chart {
    width: 100%;
    height: 440px;
    margin-top: -40px;
}
.c-central .charts .volumn_chart {
    width: 100%;
    height: 220px;
    margin-top: -100px;
    position: relative;
    z-index: -1;
}
</style>