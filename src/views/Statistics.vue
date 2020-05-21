<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeLIst" :value.sync="type"/>
        <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
        type:{{type}}
        <br/>
        interval: {{interval}}
    </Layout>
</template>

<script lang="ts">
    import Types from '@/components/Money/Types.vue';
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import intervalList from '@/constants/intervalList';
    import recordTypeList from '@/constants/recordTypeList';

    @Component({
        components: {Tabs, Types}
    })
    export default class Statistics extends Vue{
        type = '-';
        interval = 'day';
        intervalList = intervalList;
        recordTypeLIst = recordTypeList;
    }
</script>

<style lang="scss" scoped>
    ::v-deep .type-tabs-item{
        background: white;
        &.selected{
            background: #c4c4c4;
            &::after{
                display: none;
            }
        }
    }
</style>