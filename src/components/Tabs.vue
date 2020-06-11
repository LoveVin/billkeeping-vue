<template>
    <ul class="tabs" :class="{[classPrefix + '-tabs']: classPrefix}">
        <li v-for="item in dataSource" :key="item.value" @click="select(item)"
            class="tabs-item" :class="liClass(item)">{{item.text}}
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    type dataSourceItem = { text: string; value: string };

    @Component
    export default class Tabs extends Vue {
        @Prop({required: true, type: Array}) dataSource!: { text: string; value: string } [];
        @Prop(String) readonly value!: string;//!：是绝对不会为空的意思
        @Prop(String) classPrefix?: string; //？：是可以为空的意思

        liClass(item: dataSourceItem){
            return {
                selected: item.value === this.value,
                [this.classPrefix + '-tabs-item']: this.classPrefix
            }
        }

        select(item: dataSourceItem) {
            this.$emit('update:value', item.value);
        }
    }
</script>

<style lang="scss" scoped>
    .tabs {
        background: #ff9f7f;
        color: white;
        display: flex;
        text-align: center;
        font-size: 24px;

        &-item {
            width: 50%;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            &.selected{
                color: #333;
            }
            &.selected::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: #333;
            }
        }
    }
</style>