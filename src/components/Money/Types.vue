<template>
    <div>
        <ul class="types">
            <li :class="type === '-' && 'selected'"
                @click="selectType('-')">支出
            </li>
            <li :class="type === '+' && 'selected'"
                @click="selectType('+')">收入
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component //用于告诉ts下面的是一个Vue的组件,是一个装饰器，用于装饰下面的class
    export default class Types extends Vue {
        type = '-';

        @Prop(Number) xxx: number | undefined;
        //prop告诉 Vue : xxx 不是data 是 Prop
        //Number 告诉 Vue xxx 是个 Number，运行时
        //xxx 属性名
        // number | undefined 告诉 TS xxx 的类型 编译时

        selectType(type: string) {
            if (type !== '-' && type !== '+') {
                throw new Error('type is unknown');
            }
            this.type = type;
        }
        mounted(){
            console.log(this.xxx);
        }
    }

    /*export default {
        name: 'Types',
        data(){
            return {
                type: "-"//“-”表示之处，"+"表示收入
            }
        },
        methods: {
            selectType(type){
                if(type !== "-" && type !== "+"){
                   throw new Error("type is unknown")
                }
                this.type = type
            }
        }
    };*/
</script>

<style lang="scss" scoped>
    .types {
        background: #c4c4c4;
        display: flex;
        text-align: center;
        font-size: 24px;

        > li {
            width: 50%;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

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