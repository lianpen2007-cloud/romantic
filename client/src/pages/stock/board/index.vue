
<template>
    <div class="p-board">
        <div class="wrapper">
            <c-central v-if="response.mergedKline && response.fractal && response.pen && response.segment && response.central" ref="central"
                :response_pen="response.pen" 
                :response_mergedKline="response.mergedKline" 
                :response_fractal="response.fractal"
                :response_segment="response.segment"
                :response_central="response.central"/>
            <c-segment v-if="response.mergedKline && response.fractal && response.pen && response.segment" ref="segment"
                :response_pen="response.pen" 
                :response_mergedKline="response.mergedKline" 
                :response_fractal="response.fractal"
                :response_segment="response.segment"/>
            <c-pen v-if="response.mergedKline && response.fractal && response.pen" ref="pen"
                :response_pen="response.pen" 
                :response_mergedKline="response.mergedKline" 
                :response_fractal="response.fractal"/>
            <c-fractal v-if="response.mergedKline && response.fractal" ref="fractal"
                :response_mergedKline="response.mergedKline" 
                :response_fractal="response.fractal"/>
            <c-mergedKLine v-if="response.mergedKline" 
                :response="response.mergedKline" ref="mergedKline" />
            <c-chanKLine v-if="response.chanKline" 
                :response="response.chanKline" ref="chanKline" />
            <c-rawKLine v-if="response.rawKline" 
                :response="response.rawKline" ref="rawKline" />
        </div>
    </div>

</template>

<script>

import lin from '../../../common/lin'
import CRawKLine from './rawKLine.vue'
import CChanKLine from './chanKLine.vue'
import CMergedKLine from './mergedKLine.vue'
import CFractal from './fractal.vue'
import CPen from './pen.vue'
import CSegment from './segment.vue'
import CCentral from './central.vue'
export default {
    name: 'p-stock-board',
    components: {
        'c-rawKLine': CRawKLine,
        'c-chanKLine': CChanKLine,
        'c-mergedKLine': CMergedKLine,
        'c-fractal': CFractal,
        'c-pen': CPen,
        'c-segment': CSegment,
        'c-central': CCentral,
    },
    data() {
        return {
            stockCode: '',
            response: {
                rawKline: null,
                chanKline: null,
                mergedKline: null,
                fractal: null,
                pen: null,
                segment: null,
                central: null
            }
        }
    },
    async mounted() {
        this.stockCode = this.$route.query.stockCode
        await this.load()
        await this.$nextTick()
        this.paint()
    },
    methods: {
        async load() { // 加载日k
            this.response.rawKline = await lin.load(`/query/stock/rawKline?stockCode=${this.stockCode}`)
            this.response.chanKline = await lin.load(`/query/stock/chanKline?stockCode=${this.stockCode}`)
            this.response.mergedKline = await lin.load(`/query/stock/mergedKline?stockCode=${this.stockCode}`)
            this.response.fractal = await lin.load(`/query/stock/fractal?stockCode=${this.stockCode}`)
            this.response.pen = await lin.load(`/query/stock/pen?stockCode=${this.stockCode}`)
            this.response.segment = await lin.load(`/query/stock/segment?stockCode=${this.stockCode}`)
            this.response.central = await lin.load(`/query/stock/central?stockCode=${this.stockCode}`)
        },
        paint() {
            // this.$refs.rawKline.paint()
            // this.$refs.chanKline.paint()
            // this.$refs.mergedKline.paint()
            // this.$refs.pen.paint()
            // this.$refs.fractal.paint()
            this.$refs.segment.paint()
            this.$refs.central.paint()
        }
    }
}

</script>

<style>
.p-board .wrapper {
    margin: 10px;
}
.p-board .wrapper .row2 {
    position: relative;
    z-index: -1;
}
</style>