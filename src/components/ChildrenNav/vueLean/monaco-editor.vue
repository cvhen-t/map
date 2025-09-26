<!--
 * @Date: 2022-11-04 15:24:41
 * @LastEditTime: 2023-01-04 14:35:19
-->
<!-- <template>
    <div>
        <div>编辑器</div>
        <div id="monacoEditorContainer"
             style="height:300px;"></div>

    </div>
</template>

<script>
import * as monaco from 'monaco-editor';
export default {
    data() {
        return {
            standaloneEditorConstructionOptions: {
                value: '', // 编辑器的值
                language: 'javascript', //语言
                theme: 'vs-dark', // 编辑器主题：vs, hc-black, or vs-dark
                autoIndent: true, // 自动缩进
                readOnly: false // 是否只读
            }
        };
    },
    mounted() {
        this.createMonacoEditor();
    },
    methods: {
        createMonacoEditor() {
            const container = document.getElementById('monacoEditorContainer');
            this.monacoEditor = monaco.editor.create(container, this.standaloneEditorConstructionOptions);
        }
    }
};
</script>

<style>
</style> -->