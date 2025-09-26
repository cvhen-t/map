<!--
 * @Date: 2023-01-04 14:39:23
 * @LastEditTime: 2023-02-06 10:33:17
-->
<template>
    <div>
        <el-collapse ref="collapsebox"
                     v-model="activeNames"
                     @change="handleChange">

            <el-collapse-item v-for="item, i in datalist"
                              :key="item"
                              :ref="'collapseItem' + i"
                              name="1">
                <template slot="title">
                    一致性 <i @click.stop="icon('collapseItem' + i)"
                       class="header-icon el-icon-info"></i>
                </template>
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
        </el-collapse>

        <div>
            <el-result title="404">
                <template slot="icon">
                    <!-- <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-image> -->
                </template>

                <template slot="title">
                    <el-button type="text"
                               size="medium">你是不是傻逼</el-button>
                </template>
                <template slot="extra">
                    <el-button type="primary"
                               size="medium">返回</el-button>
                </template>
            </el-result>
        </div>

        <NumberInput v-model="number"></NumberInput>
    </div>
</template>


<script>
import NumberInput from '../../childCompoen/passdataChild/selel-tag.vue';
export default {
    components: { NumberInput },
    data() {
        return {
            number: 1,
            activeNames: [],
            active: null,
            datalist: [1, 2],
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            value: ''
        };
    },
    mounted() {
        this.datalist.forEach((item, i) => {
            this.$refs[`collapseItem${i}`][0].handleHeaderClick = () => {
                console.log('重写的方法');
            };
        });
    },
    methods: {
        seleChange(value) {
            console.log(value);
        },
        handleChange(val) {
            console.log(val);
        },
        changevalue() {
            this.$nextTick(() => {
                console.log(this.$refs.reference);
            });
        },
        icon(item) {
            this.$refs[item][0].dispatch('ElCollapse', 'item-click', this.$refs[item][0]);
            this.$refs[item][0].focusing = false;
            this.$refs[item][0].isClick = true;
            console.log(this.activeNames);
        },
        checkNum(val) {
            const zhi = val.charAt(0);
            // 转化为数字形式--包含小数，负数，e
            // 先把非数字的都替换掉，除了数字和.,e,
            val = val.replace(/[^\d.e]/g, '');
            // 必须保证第一个为数字而不是.
            val = val.replace(/^\./g, '');
            // 保证只有出现一个.而没有多个.
            val = val.replace(/\.{2,}/g, '.');
            // 保证.只出现一次，而不能出现两次以上
            val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
            // 如果第一位是负号，则允许添加
            if (zhi === '-') {
                val = '-' + val;
            }
            //数字千分位逗号分隔
            //var str = val.toString();
            //var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
            //return str.replace(reg,"$1,");
            return val;
        }
    }
};
</script>