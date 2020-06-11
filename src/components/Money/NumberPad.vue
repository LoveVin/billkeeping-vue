<template>
    <div class="numberPad">
        <div class="output">{{output}}</div>
        <div class="buttons">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="remove" class="delete"><Icon name="delete"/></button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="clear">清空</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button class="ok" @click="ok">OK</button>
            <button class="zero" @click="inputContent">0</button>
            <button @click="inputContent">.</button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class NumberPad extends Vue {
        output = '0';

        inputContent(event: MouseEvent) {
            const button = (event.target as HTMLButtonElement);
            const input = button.textContent as string;
            //const input = button.textContent!;
            if (this.output.length === 16) {
                return;
            }
            if (this.output === '0') {
                if ('0123456789'.indexOf(input) >= 0) {
                    this.output = input;
                } else {
                    this.output += input;
                }
                return;
            }
            if (this.output.indexOf('.') >= 0 && input === '.') {
                return;
            }
            this.output += input;
        }

        remove() {
            if (this.output.length === 1) {
                this.output = '0';
            } else {
                this.output = this.output.slice(0, -1);
            }
        }

        clear() {
            this.output = '0';
        }

        ok() {
            const number = parseFloat(this.output);
            this.$emit('update:value', number);
            this.$emit('submit', number);
            this.output = '0';
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .numberPad {
        .output {
            font-size: 36px;
            font-family: Consolas, monospace;
            padding: 9px 16px;
            text-align: right;
            min-height: 72px;
            background: white;
        }

        .buttons {
            @extend %clearFix;

            > button {
                width: 25%;
                height: 64px;
                float: left;
                background: transparent;
                font-size: 20px;

                &.ok {
                    height: 64*2px;
                    float: right;
                }

                &.zero {
                    width: 25%*2;
                }

                &.delete{
                    font-size: 26px;
                }

                border: none;
                border-top: 1px solid rgba(0, 0, 0, 0.25);
                border-right: 1px solid rgba(0, 0, 0, 0.25);

                &:nth-child(4),&:nth-child(8),&:nth-child(12){
                    border-right: none;
                }
            }

        }
    }
</style>