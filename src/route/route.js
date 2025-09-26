/*
 * @Author: cc ‘2327506380@qq.com’
 * @Date: 2022-08-22 10:14:32
 * @LastEditors: cc ‘2327506380@qq.com’
 * @LastEditTime: 2023-01-10 17:45:01
 * @FilePath: \map\src\route\route.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import VueRouter from 'vue-router';

export const routes = [
    { path: '/', redirect: '/HellWord/hellPage' },
    {
        path: '/HellWord',
        name: '首页',
        indexnum: '1-1',
        icon: 'el-icon-s-data',
        component: () => import('@/components/Navcomponents/HelloWorld'),
        children: [
            {
                path: '/HellWord/hellPage',
                name: '使用说明',
                indexnum: '1-1',
                component: () => import('../components/ChildrenNav/HellWord/hellPage.vue')
            }
        ]
    },
    {
        path: '/chat',
        name: '聊天',
        indexnum: '1',
        icon: 'el-icon-s-data',
        component: () => import('@/components/Navcomponents/chat.vue'),
        children: [
            {
                path: '/chat/chatDemo',
                name: '聊天',
                indexnum: '1-1',
                component: () => import('../components/ChildrenNav/chat/chatDemo.vue')
            }
        ]
    },
    {
        path: '/MAP01',
        name: '地图',
        indexnum: '2',
        icon: 'el-icon-picture',
        component: () => import('../components/Navcomponents/MAP01.vue'),
        children: [
            {
                path: '/HellWord/mapTest',
                name: 'MapBox地图',
                indexnum: '2-1',
                component: () => import('../components/ChildrenNav/MAP01/mapTest.vue')
            }
        ]
    },
    {
        path: '/mock',
        name: '数据部分',
        indexnum: '3',
        icon: 'el-icon-upload',
        component: () => import('../components/Navcomponents/mock.vue'),
        children: [
            {
                path: '/mock/testMockData',
                name: 'mock获取数据',
                indexnum: '3-1',
                component: () => import('../components/ChildrenNav/mock/testMockData.vue')
                // children:[
                //   {
                //     path: 'a',
                //     name:'mock获取数据',
                //     indexnum:'3-1',
                //     component: ()=>import("../components/ChildrenNav/mock/testMockData.vue"),

                //   },
                // ]
            },
            {
                path: '/mock/Arrfun',
                name: '数组方法',
                indexnum: '3-2',
                component: () => import('../components/ChildrenNav/mock/Arrfun.vue')
            },
            {
                path: '/mock/codeedit',
                name: '在线编辑器',
                indexnum: '3-3',
                component: () => import('../components/ChildrenNav/mock/codeedit.vue')
            }
        ]
    },
    {
        path: '/Vuelearn',
        name: '组件案例',
        indexnum: '4',
        icon: 'el-icon-menu',
        component: () => import('../components/Navcomponents/vueLean.vue'),
        children: [
            {
                path: '/Vuelearn/passdata',
                name: '组件传参',
                indexnum: '4-1',
                component: () => import('../components/ChildrenNav/vueLean/passdata.vue')
            },
            {
                path: '/Vuelearn/Packcomponent',
                name: '可编辑表格',
                indexnum: '4-2',
                component: () => import('../components/ChildrenNav/vueLean/Packcomponent.vue')
            },
            {
                path: '/Vuelearn/checkFrom',
                name: '表单校验',
                indexnum: '4-3',
                component: () => import('../components/ChildrenNav/vueLean/checkFrom.vue')
            },
            {
                path: '/Vuelearn/treeSelect',
                name: '树形下拉',
                indexnum: '4-4',
                component: () => import('../components/ChildrenNav/vueLean/treeSelect.vue')
            },
            {
                path: '/Vuelearn/column',
                name: '柱状显示',
                indexnum: '4-5',
                component: () => import('../components/ChildrenNav/vueLean/column.vue')
            },
            {
                path: '/Vuelearn/editpen',
                name: '编辑用户',
                indexnum: '4-6',
                component: () => import('../components/ChildrenNav/vueLean/editpen.vue')
            },
            {
                path: '/Vuelearn/keeplive',
                // meta: {
                //   keepAlive: false,
                // },
                name: 'keeplive',
                indexnum: '4-7',
                component: () => import('../components/ChildrenNav/vueLean/keeplive.vue')
            },
            {
                path: '/Vuelearn/Shensbox',
                // meta: {
                //   keepAlive: false,
                // },
                name: '放大伸缩框',
                indexnum: '4-8',
                component: () => import('../components/ChildrenNav/vueLean/Shensbox.vue')
            },
            // {
            //     path: '/Vuelearn/monaco-editor',
            //     // meta: {
            //     //   keepAlive: false,
            //     // },
            //     name: 'monaco-editor',
            //     indexnum: '4-9',
            //     component: () => import('../components/ChildrenNav/vueLean/monaco-editor.vue')
            // },
            {
                path: '/Vuelearn/el-collapse',
                // meta: {
                //   keepAlive: false,
                // },
                name: 'el折叠面板禁用点击',
                indexnum: '4-10',
                component: () => import('../components/ChildrenNav/vueLean/el-collapse.vue')
            },
            {
                path: '/Vuelearn/packageComponent',
                // meta: {
                //   keepAlive: false,
                // },
                name: '组件封装，v-model的使用',
                indexnum: '4-11',
                component: () => import('../components/ChildrenNav/vueLean/packageComponent.vue')
            },
            {
                path: '/Vuelearn/canvas',
                // meta: {
                //   keepAlive: false,
                // },
                name: 'PDF合并',
                indexnum: '4-12',
                component: () => import('../components/ChildrenNav/vueLean/canvas.vue')
            },
            {
                path: '/Vuelearn/dm',
                // meta: {
                //   keepAlive: false,
                // },
                name: '弹幕效果',
                indexnum: '4-13',
                component: () => import('../components/ChildrenNav/vueLean/dm.vue')
            },
            {
                path: '/Vuelearn/layerWord',
                // meta: {
                //   keepAlive: false,
                // },
                name: '印章移动',
                indexnum: '4-13_1',
                component: () => import('../components/ChildrenNav/vueLean/layerWord.vue')
            },
            {
                path: '/Vuelearn/tabletest',
                // meta: {
                //   keepAlive: false,
                // },
                name: '表格',
                indexnum: '4-14',
                component: () => import('../components/ChildrenNav/vueLean/tabletest.vue')
            },
            {
                path: '/Vuelearn/loadTable',
                // meta: {
                //   keepAlive: false,
                // },
                name: '表格底部加载',
                indexnum: '4-15',
                component: () => import('../components/ChildrenNav/vueLean/loadTable.vue')
            },
            {
                path: '/Vuelearn/trancfCheck',
                // meta: {
                //   keepAlive: false,
                // },
                name: '穿梭狂',
                indexnum: '4-16',
                component: () => import('../components/ChildrenNav/vueLean/trancfCheck.vue')
            },
            {
                path: '/Vuelearn/canvastopdf',
                // meta: {
                //   keepAlive: false,
                // },
                name: '画布转PDF',
                indexnum: '4-17',
                component: () => import('../components/ChildrenNav/vueLean/canvastopdf.vue')
            },
            {
                path: '/Vuelearn/g6AndMap',
                // meta: {
                //   keepAlive: false,
                // },
                name: 'G6地图',
                indexnum: '4-19',
                component: () => import('../components/ChildrenNav/vueLean/g6AndMap.vue')
            }
        ]
    },
    {
        path: '/MangerCtrl',
        name: '系统管理',
        indexnum: '5',
        icon: 'el-icon-s-data',
        component: () => import('@/components/Navcomponents/HelloWorld'),
        children: [
            {
                path: '/MangerCtrl/addPage',
                name: '添加页面',
                indexnum: '5-1',
                component: () => import('../components/ChildrenNav/MangerCtrl/addPage.vue')
            },
            {
                path: '/MangerCtrl/upProjectPage',
                name: '发布项目',
                indexnum: '5-2',
                component: () => import('../components/ChildrenNav/MangerCtrl/upProjectPage.vue')
            }
        ]
    },
    {
        path: '/qianKun',
        name: '乾坤应用',
        indexnum: '6',
        icon: 'el-icon-s-data',
        component: () => import('@/components/Navcomponents/qianKun'),
        children: [
            {
                path: '/QingKun/qinKunVue3',
                name: 'vue3',
                indexnum: '6-1',
                component: () => import('../components/ChildrenNav/QingKun/qinKunVue3.vue')
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes // (缩写) 相当于 routes: routes
});

export default router;
