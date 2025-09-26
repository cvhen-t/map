<template>
    <div>
        <el-table :row-style="cellStyle"
                  :cell-style="cellStyle"
                  :header-row-style="{backgroundColor:'#f4f9f9',border:'0px'}"
                  :header-cell-style="{fontSize:'14px',fontWeight:'bold',color:'#333333',borderColor:'#eeeeee',backgroundColor:'transparent'}"
                  :data="tableData"
                  style="width: 35%">
            <el-table-column type="index"
                             label="序号"
                             width="50"> </el-table-column>
            <el-table-column prop="date"
                             label="日期"
                             width="120">
                <template slot-scope="scope">
                    <el-input v-if="edit == scope.$index"
                              v-model="scope.row.date"
                              @input="changeValue(scope.row)"
                              placeholder="请输入内容"></el-input>
                    <span v-else>{{ scope.row.date }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="name"
                             label="姓名"
                             width="120">
                <template slot-scope="scope">
                    <el-input v-if="edit == scope.$index"
                              v-model="scope.row.name"
                              @input="changeValue(scope.row)"
                              placeholder="请输入内容"></el-input>
                    <span v-else>{{ scope.row.name }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="city"
                             label="市区"
                             width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.city }}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right"
                             label="操作"
                             width="100">
                <template #default="scope">
                    <el-button @click="handleClick(scope.row)"
                               type="text"
                               size="small">查看</el-button>
                    <el-button v-if="edit == scope.$index"
                               @click="toesave(scope.$index)"
                               type="text"
                               size="small">保存</el-button>
                    <el-button v-else
                               @click="toedit(scope.$index)"
                               type="text"
                               size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'; // 引入axios
export default {
    created() {
        axios.get('/user/tableData').then((res) => {
            if (res.data.code == 200) {
                let { data } = res.data.data;
                let getTableData = data.map((item) => {
                    return {
                        id: item.id,
                        date: item.newValue,
                        name: item.oldValue,
                        city: item.newValue + item.oldValue
                    };
                });
                this.tableData = getTableData;
            }
        });
    },
    methods: {
        cellStyle({ row, rowIndex }) {
            console.log(rowIndex, this.tableData.length - 1);
            if (rowIndex === this.tableData.length - 1) {
                return { border: '0px' };
            }
            return '';
        },

        handleClick(row) {
            console.log(row);
        },
        toedit(i) {
            this.edit = i;
        },
        toesave() {
            this.edit = -1;
        },
        changeValue(item) {
            item.city = item.date * 1 + item.name * 1;
        }
    },

    data() {
        return {
            edit: -1,
            tableData: []
        };
    }
};
</script>
<style>
</style>