<template>
    <div class="nav-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
        <div class="content" :class="classPrefix && `${classPrefix}-content`">
            <slot/>
        </div>
        <Nav/>
    </div>
</template>

<script lang="ts">
    export default {
        props: ['classPrefix'],
        name: 'Layout'
    };
</script>

<style lang="scss" scoped>
    .nav-wrapper{
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .content{
        flex-grow: 1;
        overflow: auto;
    }
</style>