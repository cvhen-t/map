<!--
 * @Author: cc ‘2327506380@qq.com’
 * @Date: 2023-01-10 15:50:05
 * @LastEditors: cc ‘2327506380@qq.com’
 * @LastEditTime: 2023-01-12 17:33:32
 * @FilePath: \map\src\components\ChildrenNav\QingKun\qinKunVue3.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="qinkunMainBox"
         id="container"></div>
</template>

<script>
import { start } from 'qiankun';
export default {
    mounted() {
        if (!window.qiankunStarted) {
            console.log(1);
            window.qiankunStarted = true;
            start();
        }
    },
    beforeDestroy() {
        window.qiankunStarted = false;
    }
};
</script>

<style>
.qinkunMainBox {
    width: 100%;
    height: 100%;
}
</style>