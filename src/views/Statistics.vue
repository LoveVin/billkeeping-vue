<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeLIst" :value.sync="type"/>
        <!--<Echarts @update:value="tagType = $event" :echarts-option="echartsOption"/>-->
        <ol v-if="groupedList.length>0">
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
        <div v-else class="noResult">
            目前没有记录
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import recordTypeList from '@/constants/recordTypeList';
    import dayjs from 'dayjs';
    import clone from '@/lib/clone';
    import Echarts from '@/components/Echarts.vue';

    const oneDay = 86400 * 1000;//一天的总共毫秒数，因为js的时间是以毫秒为单位的
    @Component({
        components: {Echarts, Tabs}
    })
    export default class Statistics extends Vue {
        type = '-';
        recordTypeLIst = recordTypeList;
        tagType = '';
        /*echartsOption = {
            series: [
                {
                    name: '支出',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                        fontSize: '20',
                        fontWeight: 'bold',
                        formatter: '{b}\n\n{d}%'
                    },
                    emphasis: {
                        label: {
                            show: true,
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 335, name: '餐饮'},
                        {value: 310, name: '邮件营销'},
                        {value: 234, name: '联盟广告'},
                        {value: 135, name: '视频广告'},
                        {value: 1548, name: '搜索引擎'}
                    ]
                }
            ]
        };*/

        get recordList() {
            return (this.$store.state as RootState).recordList;
        }

        get groupedList() {
            const {recordList} = this;
            const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
            type Result = { title: string; total?: number; items: RecordItem[] }[];
            if (newList.length === 0) {
                return [];
            }
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
            return tags.length === 0 ? '无' : tags.map(t => t.name).join(' / ');
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
    .noResult {
        padding: 16px;
        text-align: center;
    }

    ::v-deep {
        .type-tabs-item {
            background: #ff9f7f;
            color: white;
            &.selected {

                background: white;
                color: #333;

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