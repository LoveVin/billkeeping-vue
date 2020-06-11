<template>
    <nav>
        <router-link to="/labels" class="item" active-class="selected">
            <Icon name="bill"/>
            <span>账单</span>
        </router-link>
        <router-link to="/money" class="item" active-class="selected">
            <Icon name="money"/>
            <span>记账</span>
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <Icon name="statistics"/>
            <span>统计</span>
        </router-link>
    </nav>
</template>

<script lang="ts">
    export default {
        name: 'Nav'
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
    nav {
        @extend %outerShadow;
        display: flex;
        flex-direction: row;
        font-size: 10px;
        background: white;
        > .item {
            padding: 5px 0;
            width: 33.33333%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: #b7b8bb;
            .icon {
                width: 32px;
                height: 32px;
            }
        }
        > .item.selected{
            color: $color-highlight;
        }
    }
</style>