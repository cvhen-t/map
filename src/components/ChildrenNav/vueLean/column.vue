<template>
  <div>
    <div class="box">
        <div   v-for="(item , i) in timedata" :key="i"  class="listy"
         :class="[item.up ? 'activeClass' : 'errorClass']" >
          <div class="lispan">
              <p>时间：<span>{{item.time}}</span></p>
              <p>情况：<span>{{!item.up?'未掉线':'掉线'}}</span></p>
              <p>内容：<span>{{item.value}}</span></p>
          </div>
         </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            timedata:[
                {time:1,up:true,value:'这是未掉线的设置'},
                {time:1,up:false,value:'这是掉线的设置'},
                {time:4,up:true,value:'这是未掉线的设置'},
                {time:1,up:false,value:'这是掉线的设置'},
                {time:6,up:true,value:'这是未掉线的设置'},
                {time:1,up:false,value:'这是掉线的设置'},
            ]
        }
    }
}
</script>

<style>
.box{
    display: flex;
    height:150px ;
    border: 1px solid black;
}

.listy{
    height:150px ;
    width: 30px;
    position: relative;
}

.activeClass{
    background-color: brown;
}
.errorClass{
    background-color: rgb(14, 186, 134);
}

.lispan{
    display: inline-block;
    color: black;
    display: none;
    position: absolute;
    left: 30px;
    top: 0px;
}
.listy:hover .lispan{
    width: 100px;
    z-index: 10000;
    display: block;
}



</style>