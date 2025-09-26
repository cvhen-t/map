/*
 * @Author: cc ‘2327506380@qq.com’
 * @Date: 2022-08-22 10:14:32
 * @LastEditors: cc ‘2327506380@qq.com’
 * @LastEditTime: 2023-01-12 17:20:33
 * @FilePath: \map\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';
import App from './App.vue';
import BaiduMap from 'vue-baidu-map';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import router from './route/route';
import axios from 'axios';
import './commin/webSocketClass.js';

if (process.env.NODE_ENV !== 'production') require('./mock');
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

import jshint from 'jshint';

window.JSHINT = jshint.JSHINT;
// 引入代码编辑器
// import { codemirror } from 'vue-codemirror';
// import 'codemirror/lib/codemirror.css';

Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.use(ElementUI);
// Vue.use(codemirror);

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    router
}).$mount('#app');

Vue.use(BaiduMap, {
    ak: 'SJ5BZ-WUB6U-TNXV3-B3L4L-7437F-I4FU4'
});

// 乾坤
import { registerMicroApps, start } from 'qiankun';
registerMicroApps([
    {
        name: 'vue3app', // app name registered
        entry: '//192.168.0.102:8081',
        container: '#container',
        activeRule: '/QingKun/qinKunVue3'
    }
]);
// start();
