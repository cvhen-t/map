
<template>

    <div>
        <div class="main-body">
            <el-input @focus="getTreeData()"
                      v-model="input"
                      placeholder="请输入内容"></el-input>

            <div>

                <div class="bomTree"
                     v-if="isShow">
                    <el-tree @check-change="selectChange"
                             :props="props"
                             :load="loadNode"
                             lazy
                             show-checkbox></el-tree>
                </div>

            </div>

            <div v-for=" (item,i) in datalist"
                 :key="i"
                 :class="isActive===i?'active':''"
                 @click="isActive=i,handleItemClick(item)">{{item.name}}

            </div>

            <tagList ref="tagList"></tagList>
        </div>

        <div></div>

    </div>
</template>

<script>
import axios from 'axios'; // 引入axios
import tagList from './childCompoen/tagList.vue';

export default {
    components: { tagList },
    data() {
        return {
            input: '',
            props: {
                label: 'name',
                children: 'zones',
                isLeaf: 'leaf'
            },
            isShow: false,
            treedata: {},
            datalist: [{ name: 1 }, { name: 2 }],
            isActive: -1
        };
    },
    methods: {
        loadNode(node, resolve) {
            if (node.level === 0) {
                return resolve([{ name: 'region' }]);
            }
            axios.get('/select/treedata').then((res) => {
                let neobj = res.data.data.data;
                resolve(neobj);
            });
        },
        getTreeData() {
            this.isShow = true;
            this.isadd = true;
        },
        selectChange(data, checked, a) {
            this.isShow = a;
            this.input = data.name;
        },
        treeclose() {
            console.log(1);
            this.isShow = false;
        },
        handleItemClick(item) {
            this.handleItemClic222k();
            console.log(item);
        }
    }
};
</script>
<style>
.main-body {
    width: 400px;
    position: relative;
}
.active {
    color: red;
}
.bomTree {
    width: 400px;
    position: absolute;
    top: 40px;
    left: 0px;
    padding: 10px;
    /* border: 1px solid #ddd; */
    box-shadow: 0px 0px 9px #888888;
}
</style>