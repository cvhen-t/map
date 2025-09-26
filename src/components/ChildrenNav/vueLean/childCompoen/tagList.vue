<template>
    <div>

        <el-tag v-for="item in TagdataList"
                :key="item.id"
                :color=styleConfig.activeColor
                :hit=styleConfig.haveBorder>标签一</el-tag>
    </div>
</template>

<script>
export default {
    props: {
        styleConfig: {
            type: Object,
            default: () => {
                return {
                    activeColor: 'white',
                    haveBorder: false
                };
            }
        }
    },
    model: {},
    watch: {},
    data() {
        return {
            TagdataList: [
                {
                    lable: '午饭',
                    id: 1
                },
                {
                    lable: '晚饭',
                    id: 2
                },
                {
                    lable: '夜宵',
                    id: 3
                }
            ]
        };
    },
    created() {},
    methods: {
        /**
         * 监听移除标签
         * @param {string} val 选中值
         */
        handleRemoveTag(val) {}
    }
};
</script>

<style>
</style>