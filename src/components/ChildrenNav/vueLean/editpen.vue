<template>
  <div>
    <div class="editpeofrom">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名字">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="年纪">
          <el-input v-model="form.age"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    

    <button @click="adduser()">添加用户</button>

    <div>
      <div class="userarr" v-for="(item, i) in proarr" :key="i">

          <li>{{item.name}}</li>
          <li>{{item.age}}</li>

          <button @click="edituser(item)" >编辑</button>
      </div>
    </div>

    <div class="editpeofrom" v-if="isshow">
      <el-form ref="fromdata" :model="fromdata" label-width="80px">
        <el-form-item label="名字">
          <el-input v-model="fromdata.name"></el-input>
        </el-form-item>

        <el-form-item label="年纪">
          <el-input v-model="fromdata.age"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="tosave()">确定编辑</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        age: "",
      },
      isshow:false,
      fromdata:{

      },
      proarr: [],
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      let data = JSON.parse(JSON.stringify(this.form))
      this.proarr.push(data)
    },
    adduser(){
        this.proarr.push({name:1})
        
    },
    edituser(data){
    this.fromdata=data 
    this.isshow=true
    },

    tosave(){
    this.isshow=false

    }
  },


};
</script>


<style>
.editpeofrom {
  width: 400px;
  height: 200px;
}

.userarr{
    width: 100px;
    height: 300px;
    border: 1px solid black;
    display:inline-block;
    
}
</style>