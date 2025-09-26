<template>
  <div>
      <h1>项目介绍</h1>
      <br>
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
      <el-radio-button label="top">显示在上</el-radio-button>
      <!-- <el-radio-button label="right">显示在右</el-radio-button> -->
      <el-radio-button label="left">显示在左</el-radio-button>
    </el-radio-group>

    <el-tabs :tab-position="tabPosition" style="height: 200px">
      <el-tab-pane label="项目介绍">
        <div>
          1、本项目主要为了个人或团队练习项目，方便个人写一些练习操作，或者的测试单元。
        </div>
        <div>
          2、导航采用二级导航的模式，可以对写的demmo，或者测试单元进行分类操作，方便查看，记录
        </div>
        <div>
          3、样式方面采用简洁的风格,导航支持伸缩和展开，使用者不在关注导航的操作
        </div>
      </el-tab-pane>

      <el-tab-pane label="已安装包">
        <div style="height: 600px; width: 600px">
          <div style="margin-top: 10px">
            <p>样式支持：(全局安装)</p>
            <span>iviewui：</span
            ><a target="_blank" href="http://v1.iviewui.com/components/"
              >网站:http://v1.iviewui.com/components</a
            >
            <p></p>
            <span>element：</span
            ><a
              target="_blank"
              href="https://element.eleme.cn/#/zh-CN/component"
              >网站:https://element.eleme.cn/#/zh-CN/component</a
            >
             <p></p>
            <span>配色网站：</span>
              <a target="_blank" href="http://tool.c7sky.com/webcolor/#character_14">http://tool.c7sky.com/webcolor/#character_14</a>
          </div>

          <div style="margin-top: 10px">
            <p>数据类(全局安装)</p>
            <span>mock：</span
            ><a target="_blank" href="http://mockjs.com/"
              >网站:http://mockjs.com/</a
            >
            <p></p>
            <span>axios：</span
            ><a
              target="_blank"
              href="https://element.eleme.cn/#/zh-CN/component"
              >网站:http://www.axios-js.com/</a
            >
          </div>

          <div style="margin-top: 10px">
            <p>配置类(全局安装)</p>
            <p></p>
            <span>jsx：</span
            ><a target="_blank" href="https://www.npmjs.com/package/jsx"
              >网站:https://www.npmjs.com/package/jsx</a>
            <p></p>
            <span>百度地图</span><span>网站：
              <a target="_blank" href="https://dafrok.github.io/vue-baidu-map/#/zh/start/usage">
              
              vue-百度网站:https://dafrok.github.io/vue-baidu-map/#/zh/start/usage</a><br>
                <a target="_blank" href="https://lbsyun.baidu.com/index.php?title=jspopularGL/guide/show">
              百度地图api网站:https://lbsyun.baidu.com/index.php?title=jspopularGL/guide/show</a>
              </span>
             
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="项目目录结构">
        <p>项目重要目录结构</p>
        <el-tree
          :data="data"
          @node-click="handleNodeClick"
        ></el-tree>
        <div style="margin-top: 10px"></div>
        <p>项目文件说明：</p>
        <p><span>1、accets</span><span>存放一些图片 图表文件 方便引用</span></p>
        <div style="margin-top: 10px">
          <span>2、componets</span> <span> 里面包含三个文件夹： </span
          ><br /><br />

          <span
            >childCompoen
            这个文件夹主要是为了保存封装的子组件，或者需要被引入的组件写在这个文件夹，命名需要与引入的组件的名字加上chlid,例如：a组件需要引入一个组件：
            所以可以写成：achlid为组件名称，当多个时
            可以创建achid文件夹，里面存放引入的多个文件</span
          >

          <p style="margin-top: 8px">
            'Navcomponents',这个文件夹，就是一级导航的文件，里面的文件只需要配置二级导航的路由出口就行。没一个vue文件都是一个一级导航的页面，当然也是他的子路由的出口
          </p>

          <p style="margin-top: 8px">
            'ChildrenNav',这个文件夹，为二级导航。里面全是对应一级导航的文件夹，一级导航可以对应很多二级导航，所以为了便于管理，每一个一级导航都对应一个文件夹，
            名字需要与一级导航的文件相同。比如在"Navcomponents"文件夹里有个
            tet.vue 的文件 他就是一个一级导航文件
            那么他对应的是需要在“ChildrenNav”里面去创建一个tet的文件夹，后续所有tet的二级
            导航都放在这个文件夹里面
          </p>
        </div>
      </el-tab-pane>

      <el-tab-pane label="菜单的创建与对应路由创建">
        <div>
          <p>使用创建很简单：只需要添加对应的路由文件 就可以完成导航的生成</p>
          <p>子路由就是二级导航</p>

          <pre>
                 {
        path: '/HellWord',
        name:'首页',
        indexnum:'1',
        icon:'el-icon-s-data',
        component: ()=>import("@/components/Navcomponents/HelloWorld"),
        children: [
          {
            path: '/HellWord/hellPage',
            name:'使用说明',
            indexnum:'1-1',
            component: ()=>import("../components/ChildrenNav/HellWord/hellPage.vue"),
          },
        ],
      },
            </pre
          >
          <pre>
              /HellWord 就是一级导航 需要在一级导航（Navcomponents）创建一个Hellword.vue文件 指定路由出口
              /HellWord/hellPage就是二级导航的路由 在二级文件里（ChildrenNav）创建HellWord文件夹 然后把组件（hellPage.vue）写在这个文件夹里面就可以了
              
              name：为导航的名称
              icon：是小图标
              indexnum：是对应的标识


          </pre>
        </div>
      </el-tab-pane>

        <el-tab-pane label="git 提交操作">
        <div>
         

          <pre>
       
       提交代码前：git pull 一下 提取到最新的代码 防止远程分支别人提交过
       git merge main（本地分支 不一定是main 但是这个项目只有main分支）这个操作是合并本地和 pull下来的最新代码


       然后就是自己写代码的代码 
       git add . 
       git commit -m '提交备注 一定要写'
       git push 提交代码
            </pre>
        
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: "left",
      data: [
        {
          label: "accets(静态文件目录)",
        },
        {
          label: "componets(组件目录)",
          children: [
            {
              label: "childCompoen(封装的组件目录，)",
            },
            {
              label: "Navcomponents(一级导航的目录)",
            },
            {
              label: "ChildrenNav(二级导航)",
            },
          ],
        },

        {
          label: "mock(假数据目录)",
          children: [
            {
              label: "mockJsonData(假数据的json文件)",
            },
          ],
        },
        {
          label: "route(路由文件)",
        },
      ],
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
  },
};
</script>

<style>
.el-tabs {
  width: 100% !important;
  height: 100% !important;
}
</style>