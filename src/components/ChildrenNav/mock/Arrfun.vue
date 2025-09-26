<template>
  <div style="display: flex">
    <div style="width: 50%; margin-right: 20px">
      <el-collapse v-model="activeNames" @change="handleChange">
        <!-- ----------------------------数组查重------------------------------------------------------- -->
        <el-collapse-item title="数组查重" name="1">
            <span>判断数组里面是否包含某个对象</span>
          <pre>
            arrSelect(arr,chaeckfield, chaeckvalue) {
                for (let i = 0; i &lt; arr.length; i++) {
                    if (arr[i].chaeckfield == chaeckvalue) return i;
                }
                return -1;
                }
        </pre>

        <el-col :span="12">
            <div class="sub-title">模拟数组数据</div>
            <el-autocomplete class="inline-input"  v-model="state1" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
        </el-col>

        <el-col :span="12">
            <div class="sub-title">模拟对象数据</div>
            <el-autocomplete class="inline-input"  v-model="state1" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
        </el-col>

        </el-collapse-item>
        <!-- ----------------------------------------------------------------------------------- -->

        <el-collapse-item title="数组过滤" name="2">
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div style="width: 50%;">
      在线编辑运行



    </div>
  </div>
</template>

<script>
export default {
      mounted() {
      this.restaurants = this.loadAll();
    },
    created(){
   
    },
    components: {
},
    data() {
      return {
        restaurants: [],
        state1: '',
        state2: '',
        activeNames: ['1']

      };
    },
  methods: {

   arrSelect(arr,chaeckfield, chaeckvalue) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].chaeckfield == chaeckvalue) return i;
        }
        return -1;
        },





















//优化输入方法
querySearch(queryString, cb) {
var restaurants = this.restaurants;
var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
// 调用 callback 返回建议列表的数据
cb(results);
},
createFilter(queryString) {
return (restaurant) => {
    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
};
},
loadAll() {
    return [
        { "value": "[{name:1,arg:2,work:3}]" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        ];
    },  
handleSelect(item) {
    console.log(item);
},
handleChange(val) {
    console.log(val);
}
  }
};

</script>

<style>
.el-collapse-item__content{
    /* padding: 0px !important */
}
</style>