
<template>
    <div class="p-batch-trend">
        跑批 趋势
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
            downTrendList: null
        }
    },
    async mounted() {
        await this.load()
        this.printUpTrendList()
        this.printDownTrendList()
    },
    methods: {
        async load() {
            this.trendList = await lin.load(`/query/batch/trend`)
            this.upTrendList = this.trendList.filter(t => t.direction == 'up')
            this.downTrendList = this.trendList.filter(t => t.direction == 'down')
        },
        printUpTrendList() {
            for (let i = 0; i < 10; i += 1) {
                const trendList = this.upTrendList.filter(trend => trend.centralIds.length == i)
                console.log(`上升趋势${i}中枢： ${trendList.length}`)
            }
        },
        printDownTrendList() {
            for (let i = 0; i < 10; i += 1) {
                const trendList = this.downTrendList.filter(trend => trend.centralIds.length == i)
                console.log(`下降趋势${i}中枢： ${trendList.length}`)
            }
        }
    }

}
</script>