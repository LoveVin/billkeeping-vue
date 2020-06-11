<template>
    <div ref="container" class="wrapper">
        container
    </div>
</template>

<script lang="js">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import echarts from 'echarts';

    @Component
    export default class Echarts extends Vue {
        @Prop() echartsOption;

        mounted() {
            const width = document.documentElement.clientWidth;
            this.$refs.container.style.width = `${width - 20}px`;
            this.$refs.container.style.height = `${(width - 20)}px`;
            this.chart = echarts.init(this.$refs.container, 'light');
            this.chart.setOption(this.echartsOption);
            this.chart.on('click',(params)=> {
                console.log(params.data);
                this.$emit('update:value', params.data.name);
            });
        }
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        margin-left: auto;
        margin-right: auto;
    }
</style>