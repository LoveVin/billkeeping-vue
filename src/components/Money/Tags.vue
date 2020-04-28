<template>
    <div class="tags">
        <div class="new">
            <button>新增标签</button>
        </div>
        <ul class="current">
            <li>衣</li>
            <li>食</li>
            <li>住</li>
            <li>行</li>
        </ul>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Tags'
    };
</script>

<style lang="scss" scoped>
    .tags{
        flex-grow: 1;
        display: flex;
        flex-direction: column-reverse;
        font-size: 14px;
        padding: 16px;
        > .current{
            display: flex;
            > li{
                $h: 24px;
                height: $h;
                line-height: $h;
                background: #d9d9d9;
                border-radius: $h/2;
                padding: 0 12px;
                margin-right: 12px;
                margin-top: 4px;
            }
        }
        > .new{
            padding-top:16px;
            button{
                background: transparent;
                border: none;
                border-bottom: 1px solid;
                color: #999;
                padding: 0 4px;
            }
        }
    }
</style>