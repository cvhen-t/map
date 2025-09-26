<template>
    <div>
        <el-table v-resize="offset"
                  :data="tableData"
                  style="width: 100%"
                  height="200px"
                  @scroll.native="handleScroll"
                  ref="table">
            <el-table-column prop="date"
                             label="Date"
                             width="180" />
            <el-table-column prop="name"
                             label="Name"
                             width="180" />
            <el-table-column prop="address"
                             label="Address" />
        </el-table>
        <div v-if="loading"
             class="loading">Loading...</div>

        <div>
            <!-- <el-button @click="sendParent">我是a页面,贝嵌套的页面</el-button> -->
            <el-tree ref="tree"
                     @node-click="checkTree"
                     :indent="7"
                     v-loading="loadingTree"
                     :expand-on-click-node="false"
                     :data="treeData"
                     :default-expanded-keys="keyIdArray"
                     :props="defaultProps"
                     node-key="id">
                <span slot-scope="{ node, data }">
                    <el-radio :value="radio"
                              :label="data.id">
                        {{ node.label }}
                    </el-radio>
                </span>
            </el-tree>
        </div>
    </div>
</template>
  
  <script>
export default {
    data() {
        return {
            tableData: [
                { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
                { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
                { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
                { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
                { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
                { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' }

                // 初始数据...
            ],
            loading: false,
            page: 1,
            totalPages: 5,
            treeData: [
                { id: 1, label: '节点1', children: [{ id: 2, label: '节点1-1' }] },
                { id: 3, label: '节点2', children: [{ id: 4, label: '节点2-1' }] }
            ],

            defaultProps: {
                children: 'children',
                label: 'label'
            },
            radio: '', //  这一行
            keyIdArray: ['1'],

            loadingTree: false,
            checkedList: [] //选中节点的数据
        };
    },
    methods: {
        checkTree(data) {
            this.radio = data.id;
        },
        handleScroll(event) {
            const tableBody = this.$refs.table.$el.querySelector('.el-table__body-wrapper');
            if (tableBody.scrollHeight - tableBody.scrollTop === tableBody.clientHeight) {
                this.loadMoreData();
            }
        },
        async loadMoreData() {
            if (this.loading || this.page >= this.totalPages) return;
            this.loading = true;

            // 模拟异步加载数据
            setTimeout(() => {
                const newData = [
                    { date: '2016-05-05', name: 'John', address: 'No. 189, Grove St, Los Angeles' },
                    { date: '2016-05-06', name: 'John', address: 'No. 189, Grove St, Los Angeles' }
                    // 新数据...
                ];
                this.tableData.push(...newData);
                this.page++;
                this.loading = false;
            }, 1000);
        }
    }
};
</script>
  
  <style>
.loading {
    text-align: center;
    padding: 10px;
}
</style>
  