<template>
    <!-- 数据看板 -->
    <div class="container">
        <div class="container-header">
            <div class="header-wrap">
                <div class="header-wrap__title"
                     v-show="!isId">
                    <img src="@/assets/imgs/graphDataCheck.png">
                    <span class="title">一张图数据校核</span>
                </div>
                <div class="header-wrap__title"
                     v-show="isId">
                    <span class="back"
                          @click="handleBack"><i class="el-icon-back"></i>返回</span>
                    <span class="title">{{isorgName}}-{{dataOverviewType}}校核看板</span>
                </div>
                <div class="header-wrap__tabs"
                     v-show="!isId">

                    <span v-for="item in topTabList "
                          :key="item.GroupId">
                        <el-popover v-if=item.isGroup
                                    v-model=item.isGroupmodel
                                    popper-class="header-wrap__tabs__popover"
                                    placement="bottom"
                                    width="100"
                                    trigger="click">
                            <div>
                                <span v-for="itemChild in item.childComponentList "
                                      :key="itemChild.tabIndex"
                                      class="item"
                                      :class="{activeTab:activeTabIndex===itemChild.tabIndex}"
                                      @click="changeTabs(itemChild.tabIndex)">{{itemChild.name}}</span><br>

                                <!-- <span class="item"
                                      :class="{activeTab:activeTabIndex===2}"
                                      @click="changeTabs(2)">数据校验项看板</span> -->
                            </div>

                            <span style="cursor: pointer;"
                                  :class="{zbactive:item.activeTab.includes(activeTabIndex)}"
                                  slot="reference">{{item.isGroupName}}
                                <i :class="{'el-icon-arrow-down':isShowTab,'el-icon-arrow-up':!isShowTab}"></i> </span>
                        </el-popover>

                        <span v-else
                              class="item"
                              :class="{active:activeTabIndex===item.tabIndex}"
                              @click="changeTabs(item.tabIndex)">{{item.name}}</span>
                    </span>

                    <!-- <span class="item"
                          :class="{active:activeTabIndex===3}"
                          @click="changeTabs(3)">两级贯通数据一致性看板</span> -->
                </div>

            </div>
            <el-popover placement="bottom-start"
                        popper-class="check-tree__popperData"
                        trigger="click">
                <span>版本号：{{version}}</span>
                <p class="btn-about"
                   slot="reference">
                    <i class="el-icon-info"></i>
                    <span>关于</span>
                </p>
            </el-popover>
        </div>

        <div class="container-body">
            <component :is="childComponentList.find((item) => item.tabIndex ===activeTabIndex).ref"
                       :ref="childComponentList.find((item) => item.tabIndex ===activeTabIndex).ref"></component>
        </div>

        <!-- <div class="container-body"
             v-if="activeTabIndex===1">
            <ContainerOverview ref="ContainerOverview"></ContainerOverview>
        </div>

        <div class="container-body"
             v-if="activeTabIndex===2">
            <ProblemOverview ref="ProblemOverview"></ProblemOverview>
        </div>

        <div class="container-body"
             v-if="activeTabIndex===3">
            <TwoConsistencyOverview ref="TwoConsistencyOverview"></TwoConsistencyOverview>
        </div>

        <div class="container-body"
             v-if="activeTabIndex===4">
            <ProvinceDataIndexOverview ref="ProvinceDataIndexOverview"></ProvinceDataIndexOverview>
        </div> -->

    </div>
</template>

<script>
import versionInfo from '../../version.json';
import ContainerOverview from './ContainerOverview.vue';
import ProblemOverview from './ProblemOverview.vue';
import TwoConsistencyOverview from './TwoConsistencyOverview.vue';
import ProvinceDataIndexOverview from './ProvinceDataIndexOverview.vue';
import ProblemCheckentryKanban from './ProblemCheckentryKanban/ProblemCheckentryKanban.vue';
import ZbProblemCheckentryKanban from './ZbProblemCheckentryKanban/ZbProblemCheckentryKanban.vue';

import { ssGet, ssSet } from '@/common/utils';

export default {
    name: 'DataOverview',
    components: {
        ContainerOverview,
        ProblemOverview,
        TwoConsistencyOverview,
        ProvinceDataIndexOverview,
        ProblemCheckentryKanban,
        ZbProblemCheckentryKanban
    },
    data() {
        return {
            // 版本号
            version: versionInfo.version,
            // tab默认展示
            activeTabIndex: 1,
            // 总部的地市名称
            isorgName: '',
            // 地市看板类型
            dataOverviewType: '容器',
            // 表格头部统计时间
            isheadTime: '',
            // 是否是地市的标识：1是地市，0是全网
            isId: '',
            //总部看板下拉显示
            isShowTab: false,
            //首页菜单子组件列表
            childComponentList: [
                { tabIndex: 1, ref: 'ContainerOverview', title: '容器' },
                { tabIndex: 2, ref: 'ProblemOverview', title: '问题项' },
                { tabIndex: 3, ref: 'TwoConsistencyOverview', title: '两级一致性' },
                { tabIndex: 4, ref: 'ProvinceDataIndexOverview', title: '省侧指标' },
                { tabIndex: 5, ref: 'ProblemCheckentryKanban', title: '问题校验项' },
                { tabIndex: 6, ref: 'ZbProblemCheckentryKanban', title: '问题校验项' }
            ],
            // 头部菜单配置 tabIndex 为唯一标识，不能重复
            topTabList: [
                {
                    isGroup: true,
                    isGroupmodel: false,
                    activeTab: [1, 2, 6],
                    GroupId: 1,
                    isGroupName: '总部数据看板',
                    childComponentList: [
                        { tabIndex: 1, name: '容器通过率看板' },
                        { tabIndex: 2, name: '数据校验项看板' },
                        { tabIndex: 6, name: '问题校验项看板' }
                    ]
                },
                {
                    isGroup: true,
                    isGroupmodel: false,
                    activeTab: [4, 5],
                    tabIndex: 4,
                    GroupId: 2,
                    name: '省侧数据看板',
                    isGroupName: '省侧数据看板',
                    childComponentList: [
                        { tabIndex: 4, name: '省侧数据看板' },
                        { tabIndex: 5, name: '问题校验项看板' }
                    ]
                },
                { isGroup: false, tabIndex: 3, GroupId: 3, name: '两级贯通数据一致性看板' }
            ]
        };
    },
    mounted() {
        this.activeTabIndex = ssGet('ActiveTabIndex') || 1;
        ssSet('ActiveTabIndex', ssGet('ActiveTabIndex') || 1);
        this.setTabtitle();
    },
    methods: {
        /**
         * Tabs切换事件
         * @param {number} index 标签页下标
         * @desc 1：容器数据看板、2：问题数据看板
         */
        changeTabs(index) {
            this.isId = '';
            this.activeTabIndex = index;
            // this.isShowTab = false;
            ssSet('ActiveTabIndex', index);
            this.setTabtitle();
        },
        /**
         * 设置父组件数据
         * @param {string} key 字段名
         * @param {string} val 赋值
         */
        setParValue(key, val) {
            this[key] = val;
        },

        /**
         * 返回页面
         */
        handleBack() {
            let childComponent = this.childComponentList.find((item) => item.tabIndex === this.activeTabIndex).ref;
            this.$nextTick(() => {
                this.$refs[childComponent].handleBack();
            });
        },
        /**
         * 设置当前页面的标题名称
         */
        setTabtitle() {
            this.dataOverviewType = this.childComponentList.find((item) => item.tabIndex === this.activeTabIndex).title;
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    .container-header {
        display: flex;
        flex: 0 0 45px;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        border-bottom: 1px solid #dddddd;
        .header-wrap {
            display: flex;
            align-items: center;
            &__tabs {
                height: 45px;
                margin-left: 60px;

                .item {
                    display: inline-block;
                    height: 45px;
                    line-height: 45px;
                    padding: 0 15px;
                    margin-right: 10px;
                    text-align: center;
                    cursor: pointer;
                    &.active {
                        color: $--color-primary;
                        border-bottom: 2px solid $--color-primary;
                    }
                }
            }
            &__title {
                display: flex;
                align-items: center;
                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
                .title {
                    font-size: 20px;
                    font-weight: bold;
                    color: #333333;
                }
                .back {
                    margin-right: 10px;
                    padding-right: 10px;
                    font-size: 20px;
                    color: $--color-primary;
                    border-right: 1px solid #dddddd;
                    cursor: pointer;
                    i {
                        margin-right: 10px;
                    }
                }
            }
        }
        .btn-about {
            color: $--color-primary;
            cursor: pointer;
        }
        .zbactive {
            color: $--color-primary !important;
            // border-bottom: 2px solid $--color-primary !important;
        }
    }
    .container-body {
        flex: 1;
        width: 100%;
        overflow: hidden;
    }
}
</style>

<style lang="scss">
.header-wrap__tabs__popover {
    .el-popover__popper {
        border-radius: 25px;
    }

    .item {
        cursor: pointer;
        display: inline-block;
        font-size: 15px;
        text-align: center;
        width: 100%;
        margin-top: 6px;
    }
    .activeTab {
        width: 100%;
        display: inline-block;
        font-size: 15px;
        color: $--color-primary;
        border-left: 1px solid $--color-primary !important;
        background: linear-gradient(to right, rgba(13, 134, 127, 0.6), white);
    }
}
</style>