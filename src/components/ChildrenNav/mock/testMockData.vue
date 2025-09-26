<template>
  <div>
       <button @click="getData()">获取数据</button>
       
       <span>{{toString(test)}}</span>
       <router-view></router-view>

  </div>
</template>


<script>
import axios from "axios"; // 引入axios
export default {
  data() {
    return {
      test: "1232131",
    };
  },

  methods: {
    getData() {
      axios.get("/user/list").then((res) => {
        console.log(res);
      });
    },
//数组深拷贝
    deepClone(obj) {
      var newObj = obj.constructor === Array ? [] : {};
      if (typeof obj !== "object") {
        return;
      } else {
        for (var i in obj) {
          newObj[i] =
            typeof obj[i] === "object" ? this.deepClone(obj[i]) : obj[i];
        }
      }
      return newObj;
    },

    // 对象深拷贝
    deepCloneObj(obj) {
      var newObj = obj.constructor === Array ? [] : {};
      if (typeof obj !== "object") {
        return;
      } else {
        for (var i in obj) {
          newObj[i] =
            typeof obj[i] === "object" ? this.deepCloneObj(obj[i]) : obj[i];
        }
      }
      return newObj;
    },

    // 数组深拷贝
    deepCloneArray(obj) {
      var newObj = obj.constructor === Array ? [] : {};
      if (typeof obj !== "object") {
        return;
      } else {
        for (var i in obj) {
          newObj[i] =
            typeof obj[i] === "object" ? this.deepCloneArray(obj[i]) : obj[i];
        }
      }
      return newObj;
    },

    datatoJson(data) {
      return JSON.stringify(data);
    },

  
  

    toString(data){
      console.log(1);
      return 1

    },
    //数组转字符串
    toString(data) {
      if (data instanceof Array) {
        return data.join(",");
      }
      return data;
    },
    // 数组去重
    unique(arr) {
      return Array.from(new Set(arr));
    },

    // 数组过滤
    filter(arr, key) {
      return arr.filter((item) => {
        return item[key] === true;
      });
    },

    //DOM操作 
    dom(id) {
      return document.getElementById(id);
    },

    //获取元素的样式
    getStyle(obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr];
      } else {
        return getComputedStyle(obj, false)[attr];
      }
    },


    arrayfilter(arr) {
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) == -1) {
          newArr.push(arr[i]);
        }
      }
      return newArr;
    },

    //获取元素的索引
    getIndex(arr, val) {
      return arr.indexOf(val);
    },

  },
};
</script>

<style>
</style>    