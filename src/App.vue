<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import "~@/assets/style/reset.scss";
    @import "~@/assets/style/helper.scss";
    body{
        line-height: 1.5;
        font-family: $font-hei;
        //Vue cli 自带的，在苹果系统上的设置
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #333;
        font-size: 16px;
    }
    .clearfix::after{
        content: '';
        display: block;
        clear: both;
    }
</style>
