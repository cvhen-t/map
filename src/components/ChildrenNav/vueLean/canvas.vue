<template>
    <div>
        <div>
            <input style="margin-left:20px; width: 185px;"
                   multiple
                   type="file"
                   @change="onFileChange"
                   accept="application/pdf" />
            <el-button :disabled="type"
                       @click="mergePDFs"
                       size="mini">合并pdf</el-button>

            <el-switch @change="typeChange"
                       style="margin-left:20px"
                       v-model="type"
                       active-text="预览模式"
                       inactive-text="合并模式">
            </el-switch>

        </div>
        <div>
        </div>

        <div class="pdfItemList">
            <el-checkbox-group @change="checkboxGroup"
                               v-model="checkboxGroup1"
                               size="small">
                <el-checkbox v-for="item in pdfList"
                             :key="item.uuid"
                             :label="item.uuid">
                    <div>
                        <pdf :src="item.pdfSrc" />
                        <p>{{item.pdfName}}</p>
                    </div>
                </el-checkbox>
            </el-checkbox-group>

        </div>

        <el-drawer @close="closePdfDrawer"
                   size="50%"
                   title="我是标题"
                   :visible.sync="drawer"
                   :with-header="false">
            <div>
                <el-button class="downLoadButton"
                           @click="downloadMergedPdf"
                           size="mini">下载pdf</el-button>

                <pdf v-for="item in pageCount"
                     :Key='item'
                     :page="item"
                     :src="lookPdfUrl" />
            </div>
        </el-drawer>

    </div>
</template>
  
  <script>
import pdf from 'vue-pdf';
import { PDFDocument } from 'pdf-lib';

export default {
    components: {
        pdf
    },
    data() {
        return {
            checkboxGroup1: [],
            pdfSrc: null,
            pdfList: [],
            drawer: false,
            lookPdfUrl: null,
            pageCount: 0,
            type: true
        };
    },
    methods: {
        async onFileChange(event) {
            let upLoadPdfList = [];

            for (const iterator of event.target.files) {
                upLoadPdfList.push(iterator);
            }
            upLoadPdfList.forEach(async (element) => {
                let pdfName = element.name;
                let findPdf = this.pdfList.findIndex((item) => item.pdfName == pdfName);
                if (findPdf != -1) {
                    this.$message.warning('已经存在');
                    return;
                }
                if (element && element.type === 'application/pdf') {
                    console.log(element);
                    // 使用 FileReader 读取文件内容为 ArrayBuffer
                    const arrayBuffer = await element.arrayBuffer();
                    this.pdfSrc = { data: arrayBuffer };
                    this.pdfList.push({ pdfName, pdfSrc: this.pdfSrc, uuid: Date.now() });
                    console.log(this.pdfList);
                } else {
                    alert('Please upload a valid PDF file.');
                }
            });
        },
        // 合并pdf
        async mergePDFs() {
            this.lookPdfUrl = null;
            const mergedPdf = await PDFDocument.create();
            for (const item of this.checkboxGroup1) {
                const pdfBytes = new Uint8Array(this.uuinFindUrl(item).data);
                const pdf = await PDFDocument.load(pdfBytes);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }
            this.pageCount = mergedPdf.pageCount;
            const mergepdfSrc = await mergedPdf.save();
            this.lookPdfUrl = new Uint8Array(mergepdfSrc);
            this.drawer = true;
        },
        // 复选框
        async checkboxGroup(e) {
            console.log(e.length);
            if (e.length == 0) {
                return;
            }
            if (e.length > 1) {
                // let mergedPdfList=
            } else {
                if (!this.type) return;
                console.log(this.uuinFindUrl(e[0]));
                const pdfDoc = await PDFDocument.load(new Uint8Array(this.uuinFindUrl(e[0]).data));
                this.pageCount = pdfDoc.getPageCount(); // 获取页数并保存
                this.lookPdfUrl = this.uuinFindUrl(e[0]);
                this.drawer = true;
                console.log(this.lookPdfUrl, '123213213123');
            }
        },
        typeChange(e) {
            console.log(e);
        },
        //下载pdf
        downloadMergedPdf() {
            const blob = new Blob([this.lookPdfUrl], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'merged.pdf'; // 设置下载文件名
            link.click(); // 模拟点击下载
        },
        // 关闭抽屉pdf预览
        closePdfDrawer() {
            if (this.type) {
                this.checkboxGroup1 = [];
            }
            console.log(this.checkboxGroup1);
            // this.checkboxGroup1 = [];
        },
        uuinFindUrl(uuid) {
            return this.pdfList.find((item) => item.uuid == uuid).pdfSrc;
        }
    }
};
</script>

<style scoped>
.downLoadButton {
}
.pdfItemList {
}
</style>
  