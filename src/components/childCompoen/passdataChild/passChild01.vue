<template>
    <div>
        <li v-for="item in datalist" :key="item.id">
            商品名称：{{item.name}} 
            价格：{{item.price}} 
            已选数量：{{item.num}} 
            <Button   @click="numchange(item.name)"><Icon type="md-remove" /></Button>
            <Button @click="numchange(item.name,'add')"><Icon type="md-add" /></Button>
        </li>
        <span>总价：{{allpricedata}}</span>
        <Button @click="allprice(allpricedata)">付款</Button><Button @click="numchange('','reset')">清空</Button>
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    props: ['datalist','numchange','allprice'],
    methods:{},
    created(){},
    computed: {
    allpricedata:function(){
        let moeny = 0
        // eslint-disable-next-line no-debugger
        //  debugger
            this.$props.datalist.forEach(item => {
                moeny += item.num*item.price
            });
            return moeny;
    }
},

}
</script>

<style>

</style>