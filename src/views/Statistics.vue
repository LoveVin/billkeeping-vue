<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeLIst" :value.sync="type"/>
        <ol>
            <li v-for="(group, index) in groupedList" :key="index">
                <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
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
    import recordTypeList from '@/constants/recordTypeList';
    import dayjs from 'dayjs';
    import clone from '@/lib/clone';

    const oneDay = 86400 * 1000;//一天的总共毫秒数，因为js的时间是以毫秒为单位的
    @Component({
        components: {Tabs}
    })
    export default class Statistics extends Vue {
        type = '-';
        recordTypeLIst = recordTypeList;

        get recordList() {
            return (this.$store.state as RootState).recordList;
        }

        get groupedList() {
            const {recordList} = this;
            if (recordList.length === 0) {
                return [];
            }
            const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
            type Result = { title: string; total?: number; items: RecordItem[] }[];
            const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
            for (let i = 1; i < newList.length; i++) {
                const current = newList[i];
                const last = result[result.length - 1];
                if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
                    last.items.push(current);
                } else {
                    result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
                }
            }
            result.map(group => {
                group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
            });
            return result;
        }

        tagString(tags: Tag[]) {
            return tags.join(',');
        }

        beautify(string: string) {
            const now = dayjs();//dayjs()等同于new Date()？
            const day = dayjs(string);
            if (day.isSame(now, 'day')) {
                return '今天';
            } else if (day.isSame(now.valueOf() - oneDay, 'day')) {
                return '昨天';
            } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
                return '前天';
            } else if (day.isSame(now, 'year')) {
                return day.format('M月D日');
            } else {
                return day.format('YYYY年M月D日');
            }
        }

        created() {
            this.$store.commit('fetchRecords');
        }
    }
</script>

<style lang="scss" scoped>
    ::v-deep {
        .type-tabs-item {
            background: #c4c4c4;

            &.selected {

                background: white;

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

    .notes {
        margin-right: auto;
        margin-left: 16px;
        color: #999;
    }
</style>