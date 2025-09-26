<template>
    <div id="app">
        <HelloWorld @active-value="active"
                    :title.sync="title"
                    v-model="showFlag"
                    v-if="showFlag"></HelloWorld>
        <button @click="showFlagEven">打开组件{{ title }}</button>
        <div>-----------------------------------------------------------</div>

        <el-input class="isedit"
                  :class="{'isEdit':isEdit}"
                  v-model="inputVlaue"
                  placeholder="请输入内容"></el-input>
        <div>-----------------------数据过滤------------------------------------</div>
        <el-input @blur="queryFiller"
                  v-model="fillteValue"
                  placeholder="请输入内容"></el-input>
        <div v-for="item in todataLiat"
             :key="item.id">
            {{ item.name }}
        </div>

        <el-empty v-if="!todataLiat.length"
                  description="暂无数据"></el-empty>

    </div>
</template>
  <script>
import HelloWorld from '../../childCompoen/passdataChild/vModel.vue';

export default {
    name: 'App',
    created() {},
    data() {
        return {
            showFlag: false,
            inputVlaue: '编辑后变色',
            isEdit: false,
            title: 1,
            fillteValue: '',
            dataLiat: [
                { id: 1, name: 1, age: 2 },
                { id: 2, name: 2, age: 2 },
                { id: 3, name: 2, age: 2 },
                { id: 4, name: 3, age: 2 },
                { id: 5, name: 4, age: 2 },
                { id: 6, name: 4, age: 2 }
            ],
            todataLiat: []
        };
    },
    components: {
        HelloWorld
    },
    watch: {
        inputVlaue(new2, old2) {
            if (new2 != old2) {
                this.isEdit = true;
            }
        }
    },
    mounted() {
        this.todataLiat = this.dataLiat;
        this.open1();

        const arr = [2, 2, 3, 4];
        arr.reduce((p, c) => {
            console.log(p, c);
            return p + c;
        }, 1);
    },
    methods: {
        showFlagEven() {
            console.log(this.showFlag);
            this.showFlag = true;
        },
        active(val) {
            console.log(val);
        },
        queryFiller() {
            if (!this.fillteValue) {
                this.todataLiat = this.dataLiat;
                return;
            }
            this.todataLiat = this.dataLiat.filter((item) => item.name == this.fillteValue);
        },
        open1() {
            const h = this.$createElement;
            this.$notify({
                title: '标题名称',
                message: h(
                    'i',
                    { style: 'color: teal' },
                    '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'
                )
            });
        }
    }
};
</script>

<style scoped>
.isEdit {
    border: 1px solid red;
}
</style>
  
 
  