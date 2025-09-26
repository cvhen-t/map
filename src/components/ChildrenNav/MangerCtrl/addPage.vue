<!--
 * @Author: Yo yo.lu@foxmail.com
 * @Date: 2022-09-14 15:30:56
 * @LastEditors: Yo yo.lu@foxmail.com
 * @LastEditTime: 2022-10-12 17:31:22
 * @FilePath: \map\src\components\ChildrenNav\MangerCtrl\addPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="box">
        <el-button @click="drawer = true"
                   type="primary"
                   style="margin-left: 16px;">
            创建页面
        </el-button>
        <el-drawer title="我是标题"
                   :visible.sync="drawer"
                   :with-header="false">
            <span>配置页面!</span>

            <div style="margin: 20px;"></div>
            <el-form label-position="right"
                     label-width="80px"
                     :model="formLabelAlign">
                <el-form-item label="页面名称">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>

                <el-form-item label="所属模块">
                    <el-select v-model="formLabelAlign.mouble"
                               placeholder="请选择活动区域">
                        <el-option label="系统管理"
                                   value="MangerCtrl"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 
                <el-form-item label="活动形式">
                    <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item> -->
            </el-form>

            <el-button @click="addPage"
                       type="primary"
                       style="margin-left: 16px;">
                开始创建

            </el-button>

        </el-drawer>

    </div>

</template>

<script>
import { addpage } from '../../../utils/util';

export default {
    data() {
        return {
            drawer: false,
            formLabelAlign: {
                name: '',
                mouble: ''
            }
        };
    },
    methods: {
        addPage() {
            addpage();
            // console.log(this.formLabelAlign);
        }
    }
};
</script>

<style  scoped>
.box {
    /* display: flex;
    flex-direction: column; */
    height: 100%;
    overflow: hidden;
    padding: 10px;
}
</style>