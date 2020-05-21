<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeLIst" :value.sync="type"/>
        <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
        <ol>
            <li v-for="(group, index) in result" :key="index">
                <h3 class="title">{{group.title}}</h3>
                <ol>
                    <li v-for="item in group.items" :key="item.id" class="record">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <span>￥{{item.amount}}</span>
                    </li>
                </ol>
            </li>
        </ol>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import intervalList from '@/constants/intervalList';
    import recordTypeList from '@/constants/recordTypeList';

    @Component({
        components: {Tabs}
    })
    export default class Statistics extends Vue {
        type = '-';
        interval = 'day';
        intervalList = intervalList;
        recordTypeLIst = recordTypeList;

        get recordList() {
            return (this.$store.state as RootState).recordList;
        }

        get result() {
            const {recordList} = this;
            type hashTableValue = { title: string; items: RecordItem[] };
            const hashTable: { [key: string]: hashTableValue } = {};
            for (let i = 0; i < recordList.length; i++) {
                const [date, time] = recordList[i].createdAt!.split('T');
                hashTable[date] = hashTable[date] || {title: date, items: []};
                hashTable[date].items.push(recordList[i]);
            }
            return hashTable;
        }

        tagString(tags: Tag[]){
            return tags.join(',');
        }
        created() {
            this.$store.commit('fetchRecords');
        }
    }
</script>

<style lang="scss" scoped>
    ::v-deep {
        .type-tabs-item {
            background: white;

            &.selected {
                background: #c4c4c4;

                &::after {
                    display: none;
                }
            }
        }

        .interval-tabs-item {
            height: 48px;
        }
    }

    %item {
        padding: 0 16px;
        min-height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        @extend %item;
    }

    .record {
        @extend %item;
        background: white;
    }
    .notes{
        margin-right: auto;
        margin-left: 16px;
        padding: 0;
        color: #999;
    }
</style>