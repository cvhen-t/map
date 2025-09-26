<template>
    <div>

        <el-switch v-model="value"
                   active-color="#13ce66"
                   inactive-color="#ff4949">
        </el-switch>
        <el-table :data="tableData"
                  style="width: 100%"
                  :cell-style="{padding:'6px 0'}"
                  :header-row-style="{backgroundColor:'#f4f9f9',border:'0px'}"
                  :header-cell-style="{fontSize:'14px',fontWeight:'bold',color:'#333333',borderColor:'#eeeeee',backgroundColor:'transparent'}">
            <el-table-column fixed
                             type="index"
                             label="序号"
                             align="center"
                             width="50"></el-table-column>
            <el-table-column align="center"
                             prop="date"
                             label="省份"
                             width="150">
            </el-table-column>
            <el-table-column align="center"
                             prop="date"
                             label="总体指标"
                             width="150">
            </el-table-column>

            <el-table-column align="center"
                             v-for="item,i in tablehead"
                             :key="i"
                             :label="item.name">
                <template slot="header"
                          slot-scope="scope">
                    <span @click="tableHeadType(scope)"
                          :class="{name:false}">{{ item.name}}</span>
                    <span v-show="item.id==='2'">
                        <el-popover placement="bottom-start"
                                    width="200"
                                    trigger="hover"
                                    content="12321321">
                            <i style="color: #0d867f;"
                               slot="reference"
                               class="el-icon-warning"></i>
                        </el-popover>
                    </span>
                </template>
                <el-table-column align="center"
                                 v-for="item2,i in item.child"
                                 :key="i"
                                 :label="item2.name"
                                 :prop="item2.prop"
                                 width="160">

                    <template slot="header"
                              slot-scope="scope">
                        <span @click="tableHeadType(scope)"
                              :class="{name:false}">{{ item2.name}}</span>
                        <span v-show="item2.id==='2'">
                            <el-popover placement="bottom-start"
                                        width="200"
                                        trigger="hover"
                                        content="12321321">
                                <i style="color: #0d867f;"
                                   slot="reference"
                                   class="el-icon-warning"></i>
                            </el-popover>
                        </span>
                    </template>
                    <template slot-scope="scope">
                        <ComparedTableCell :enable-compare="value"
                                           :value="scope.row[`${item2.prop}`]"
                                           :compared-value="scope.row[`${comList[item2.prop]}`]"
                                           :row="scope.row"
                                           :cell="item2">
                        </ComparedTableCell>
                    </template>

                    <el-table-column align="center"
                                     v-for="item3,i in item2.child"
                                     :key="i"
                                     width="150"
                                     :prop="item3.prop"
                                     :label="item3.name">

                        <template slot-scope="scope">
                            <ComparedTableCell :enable-compare="value"
                                               :value="scope.row[`${item3.prop}`]"
                                               :compared-value="scope.row[`${comList[item3.prop]}`]"
                                               :row="scope.row"
                                               :cell="item3">
                            </ComparedTableCell>
                        </template>

                    </el-table-column>

                </el-table-column>

            </el-table-column>
            <canvas></canvas>

        </el-table>
        <div style="width:500px;height:150px">
            <vuecan :canVasstyle="this.default"
                    :canVasData="data"></vuecan>
        </div>
    </div>
</template>
<script>
import ComparedTableCell from '../../../components/childCompoen/tabledeail.vue';
import vuecan from '../../childCompoen/vuecan.vue';
export default {
    components: {
        ComparedTableCell,
        vuecan
    },
    data() {
        return {
            tableData: [
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    zipcom: '+20',
                    zipbfb: '20',
                    zipbfbcom: '10'
                },
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    zipcom: '-20',
                    zipbfb: '20',
                    zipbfbcom: '-10'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    zipcom: '0',
                    zipbfb: '0',
                    zipbfbcom: '0'
                }
            ],
            tablehead: [],
            comList: { zip: 'zipcom', zipbfb: 'zipbfbcom' },
            value: false,
            ischeck: false,
            data: [
                { value: 73, color: 'blue' },
                { value: 79, color: 'yellow' },
                { value: 76, color: 'blue' },
                { value: 71, color: 'blue' },
                { value: 68, color: 'blue' },
                { value: 77, color: 'black' },
                { value: 91, color: 'blue' },
                { value: 82, color: 'yellow' },
                { value: 72, color: 'blue' },
                { value: 73, color: 'blue' }
            ],
            maxValue: 230,
            minValue: 0,
            default: {
                width: 500,
                height: 150
            }
        };
    },
    created() {
        this.tablehead = [
            {
                name: '图数一致性',

                child: [
                    { name: '图数一致性分项指标', prop: 'zipbfb' },

                    {
                        name: '有图无数',
                        id: '2',
                        child: [
                            { name: '考核数', prop: 'zip' },
                            { name: '问题数', prop: 'zip' },
                            { name: '通过率', prop: 'zip' }
                        ]
                    },
                    {
                        name: '有数无图',
                        id: '2',
                        child: [
                            { name: '考核数', prop: 'zip' },
                            { name: '问题数', prop: 'zip' },
                            { name: '通过率', prop: 'zip' }
                        ]
                    }
                ]
            },
            {
                name: '台账规范性',

                child: [
                    {
                        name: '台账规范性分项指标',
                        prop: 'zipbfb',
                        id: '2',
                        child: [
                            { name: '考核数', prop: 'zip' },
                            { name: '问题数', prop: 'zip' },
                            { name: '通过率', prop: 'zip' }
                        ]
                    },
                    {
                        name: '台账关键属性空值',
                        id: '2',
                        child: [
                            { name: '考核数', prop: 'zip' },
                            { name: '问题数', prop: 'zip' },
                            { name: '通过率', prop: 'zip' }
                        ]
                    },
                    {
                        name: '台账关键属性码值错误',
                        id: '2',
                        child: [
                            { name: '考核数', prop: 'zip' },
                            { name: '问题数', prop: 'zip' },
                            { name: '通过率', prop: 'zip' }
                        ]
                    }
                ]
            },
            {
                name: '拓扑连通性',
                id: '2',
                child: [
                    { name: '考核数', prop: 'zip' },
                    { name: '问题数', prop: 'zip' },
                    { name: '通过率', prop: 'zip' }
                ]
            }
        ];
    },
    methods: {
        tableHeadType(a) {
            return;
        }
    }
};
</script>

<style>
</style>