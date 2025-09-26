<template>
  <div>
    <div>
      <h2>管理后台：</h2>
      <Form ref="formLeft" :model="formLeft" label-position="left" :label-width="100">
        <Row type="flex" align="bottom" class="code-row-bg">
          <Col span="5"> <FormItem label="商品名称"> <Input v-model="formLeft.name"></Input> </FormItem> </Col>
          <Col span="5">  <FormItem label="商品价格">  <Input v-model="formLeft.price"></Input> </FormItem> </Col>
          <Col span="5"> <FormItem label="商品数量"> <Input v-model="formLeft.num"></Input></FormItem> </Col>
          <Col span="5"> <FormItem label="商品ID"> <Input v-model="formLeft.id"></Input> </FormItem> </Col>
          <Col span="4"> <FormItem> <Button style="margin-left: 0" @click="handleSubmit('formLeft')">添加商品</Button> </FormItem> </Col>
        </Row>
      </Form>
      <hr />
      <button @click="to()">12321</button>
      <h2>店铺：</h2>
      <div class="shaplist">
        <div v-for="item in shaplist" :key="item.id" class="shapchild">
          <p>{{ item.name }}</p>
          <p>{{ item.price }}</p>
          <p>{{ item.num }}</p>
        </div>
      </div>
    </div>
    <hr />
    <!-- //子组件 -->
    <div> <h2>购物车：</h2> <passChild01 :datalist="datalist" :numchange="numchange" :allprice="allprice"></passChild01> </div>
  </div>
</template>

<script>
import passChild01 from "../../childCompoen/passdataChild/passChild01.vue";

export default {
  components: {
    passChild01,
  },
  data() {
    return {
      datalist: [
        { name: "帽子", price: 52, num: 0, id: "1" },
        { name: "衬衫", price: 202, num: 0, id: "2" },
        { name: "裤子", price: 200, num: 0, id: "3" },
      ],
      shaplist: [{ name: "帽子", price: 52, num: 0, id: "1" }],

      formLeft: {
        name: "",
        price: "",
        num: "",
        id: "",
      },
    };
  },
  methods: {
     to(){
      this.$router.push('/Vuelearn/keeplive');
  },
    numchange(name = "", type = "") {
      this.datalist.map((item) => {
        if (item.name == name && type == "add") item.num++;
        if (item.name == name && type == "" && item.num > 0) item.num--;
        if (name == "" && type == "reset") item.num = 0;
      });
    },

    allprice(data) {
      if (data <= 0) {
        this.$Message.success("未购买商品");
      } else {
        this.$Message.success("支付成功，已支付：" + data);
      }
    },

    //添加商品
    handleSubmit() {
      let obj = JSON.parse(JSON.stringify(this.formLeft));
      if (this.objValueIsNull(obj)) {
        this.shaplist.push(obj);
        for (const key in this.formLeft) {
          this.formLeft[key] = "";
        }
      } else {
        this.$Message.success("请填写商品信息");
      }
    },

    //判断对象里面的值是否为空
    objValueIsNull(object) {
      let isadd = false;
      for (const key in object) {
        if (object[key] == "") {213123
          isadd = false;
        } else {
          isadd = true;
        }
      }
      return isadd;
    },
  },
};
</script>

<style>
.ivu-form-item-content {
  margin-left: 0px !important;
}
.shaplist{
display: flex;
}
.shapchild {
  height: 240px;
  width: 150px;
  border: 1px solid sienna;
  margin: 10px;
  text-align: center;
  padding-top: 50px;
}
</style>