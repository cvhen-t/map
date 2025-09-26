<template>
    <div id="app">
        <div>
            <input type="range"
                   v-model="value"
                   min="1"
                   max="100"
                   step="1"
                   @input="updateValue"
                   style="width: 80%;" />
            <p>当前值: {{ value }}</p>
        </div>
    </div>
</template>
  
  <script>
export default {
    data() {
        return {
            value: 1 // 初始值设为1
        };
    },
    methods: {
        // 更新值
        updateValue() {
            console.log('当前滑块的值: ', this.value); // 打印滑块的值
        }
    }
};
</script>
  
  <style scoped>
#app {
    text-align: center;
    margin-top: 50px;
}

input[type='range'] {
    margin-top: 20px;
}
</style>
  