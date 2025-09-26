<template>
    <div>
        <span>这是子组件</span>
        <el-button @click="increase()">关闭组件</el-button>
    </div>
</template>
  
  <script>
export default {
    name: 'HelloWorld',
    props: {
        showFlag: {
            type: Boolean,
            default: false,
            require: true
        }
    },
    data() {
        return {
            isShow: false
        };
    },
    model: {
        prop: 'showFlag',
        event: 'changeValue'
    },

    methods: {
        increase() {
            this.isShow = false;
            this.$emit('changeValue', this.isShow);
            // 父组件的方法
            this.$emit('active-value', this.isShow);
            this.$emit('update:title', 3);
        }
    }
};
</script>
  
  <style lang="stylus" scoped></style>