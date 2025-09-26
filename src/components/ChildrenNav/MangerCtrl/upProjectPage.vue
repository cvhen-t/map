
<template>
    <div>
        <!-- 这是单文件上传与文件夹上传的两个按钮 -->
        <div style="margin-bottom: 10px;">
            <input type="file"
                   id='file'
                   ref="file"
                   name="file" />
            <input type="button"
                   value="单文件上传"
                   onclick="uploadPic()" />
        </div>

        <div>
            <input type="file"
                   id='fileFolder'
                   ref="fileFolder"
                   name="file"
                   webkitdirectory />
            <input type="button"
                   value="文件夹上传"
                   onclick="uploadPic(1)" />
        </div>
        <el-button @click="addPage()"
                   type="primary"
                   style="margin-left: 16px;">
            发布
        </el-button>
    </div>
</template>

<script>
import { putProjectToServe } from '../../../api/index';
import axios from 'axios';

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
        addPage(type) {
            let formData = new FormData();
            let key = [];
            key = this.$refs['file'].files;
            if (1 === 1) {
                // 上传文件夹
                key = this.$refs['fileFolder'].files;
            }
            for (var i = 0; i < key.length; i++) {
                formData.append('file', key[i]);
            }
            console.log(formData.get('file'));

            let ajax = axios.create({
                baseURL: 'http://121.4.20.238:20229/uploadFolder',
                timeout: 2000,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            ajax.post('http://121.4.20.238:20229/uploadFolder', formData).then((res) => {
                console.log(res);
            });

            // putProjectToServe(formData);
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