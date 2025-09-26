<template>
    <div class="ssBox">

        <div class="ssBox-box">
            <i @click="isactive=!isactive"
               class="el-icon-edit"></i>
            <div v-show="isactive"
                 class="ssBox-item1">1111111111111</div>
            <div class="ssBox-item2">
                <div v-for="(item,index) in activelisy"
                     :key="index"
                     class="input-item"
                     :ref="item.ref"
                     @click="inoutclikc">{{item.name}}</div>

                <el-input class="ssBox-item2-child1"
                          ref="input1-child"
                          v-model="input2"
                          placeholder="请输入内容"></el-input>
                <el-input class="ssBox-item2-child2"
                          ref="input2-child"
                          v-model="input2"
                          placeholder="请输入内容"></el-input>
                <el-input class="ssBox-item2-child3"
                          ref="input4-child"
                          v-model="input2"
                          placeholder="请输入内容"></el-input>

            </div>

        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        let a = this.$refs['input1'];
        // console.log(a.clientHeight);
        // console.log(a.clientWidth);
    },

    // 统计方式
    watch: {
        isactive(nv) {
            // if (!nv) {
            this.updom();
            // }
        }
    },
    computed: {
        activelisy() {
            return this.isactive
                ? [
                      { name: '老是', id: '1', ref: 'input1' },
                      { name: '妮的', id: '2', ref: 'input2' },
                      { name: '妮的', id: '3', ref: 'input3' },
                      { name: '妮的', id: '4', ref: 'input4' }
                  ]
                : [
                      { name: '老是', id: '1', ref: 'input1' },
                      { name: '妮的', id: '2', ref: 'input2' },
                      { name: '妮的', id: '3', ref: 'input3' },
                      { name: '妮的', id: '4', ref: 'input4' },
                      { name: '妮的', id: '5', ref: 'input5' },
                      { name: '妮的', id: '6', ref: 'input6' },
                      { name: '妮的', id: '7', ref: 'input7' },
                      { name: '妮的', id: '8', ref: 'input8' }
                  ];
        }
    },

    data() {
        return {
            isactive: true,
            input2: '1',
            list: [
                { name: '老是', id: '1', ref: 'input1' },
                { name: '妮的', id: '2', ref: 'input2' },
                { name: '妮的', id: '3', ref: 'input3' },
                { name: '妮的', id: '4', ref: 'input4' }
            ]
        };
    },
    methods: {
        inoutclikc() {
            console.log(this.$refs);
            // this.$refs['showData_table']
        },
        updom() {
            !this.isactive &&
                this.list.forEach((item) => {
                    let a = this.$refs[item.ref];
                    this.$refs[`${item.ref}-child`] && console.log(this.$refs[`${item.ref}-child`].$el.style);
                    this.$refs[`${item.ref}-child`] && (this.$refs[`${item.ref}-child`].$el.style.left = a[0].offsetLeft + 'px');
                    this.$refs[`${item.ref}-child`] && (this.$refs[`${item.ref}-child`].$el.style.top = a[0].offsetHeight + 'px');
                });

            // this.isactive &&
            //     this.list.forEach((item) => {
            //         this.$refs[`${item.ref}-child`] && (this.$refs[`${item.ref}-child`].$el.style.left = 0 + 'px');
            //         this.$refs[`${item.ref}-child`] && (this.$refs[`${item.ref}-child`].$el.style.top = 0 + 'px');
            //     });
        }
    }
};
</script>


<style scoped >
/* .ssBox {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
} */
.ssBox-box {
    /* border: 1px solid red; */
    width: 100%;
    height: 800px;
    display: flex;
    justify-items: center;
    align-items: center;
    padding: 10px 0;
}

.ssBox-item1 {
    border: 1px solid red;
    height: 100%;
    width: 50%;
    margin: 0 10px;
}
.ssBox-item2 {
    /* display: flex;
    flex-wrap: wrap; */
    border: 1px solid red;
    height: 100%;
    flex-grow: 1;
    margin: 0 10px;
    position: relative;
}
.input-item {
    width: 100px;
    height: 50px;
    border: 1px solid red;
    display: inline-block;
}
.ssBox-item2-child1 {
    /* border: 1px solid red; */
    width: 60px;
    height: 100px;
    position: absolute;
    top: 100px;
    left: 0px;
}
.ssBox-item2-child2 {
    /* border: 1px solid red; */
    width: 60px;
    height: 150px;
    position: absolute;
    top: 150px;
    left: 0px;
}
.ssBox-item2-child3 {
    /* border: 1px solid red; */
    width: 60px;
    height: 50px;
    position: absolute;
    top: 200px;
    left: 0px;
}
</style>