<template>

    <div class="code-mirror-div">
        <div class="tool-bar">
            <span>请选择主题</span>
            <el-select @change="selectcmTheme"
                       v-model="cmTheme"
                       placeholder="请选择"
                       size="small"
                       style="width:150px">
                <el-option v-for="item in cmThemeOptions"
                           :key="item"
                           :label="item"
                           :value="item"></el-option>
            </el-select>
            <span style="margin-left: 10px">请选择编辑模式</span>
            <el-select v-model="cmEditorMode"
                       placeholder="请选择"
                       size="small"
                       style="width:150px"
                       @change="onEditorModeChange">
                <el-option v-for="item in cmEditorModeOptions"
                           :key="item"
                           :label="item"
                           :value="item"></el-option>
            </el-select>

            <el-button type="primary"
                       size="small"
                       style="margin-left:10x"
                       @click="getValue(cmMode)">运行代码</el-button>
            <el-button type="primary"
                       size="small"
                       style="margin-left:10x"
                       @click="setValue">修改内容</el-button>
        </div>
        <div style="width: 100%;height: 100%;">
            <CodeMirrorEditor ref="cmEditor"
                              :cmTheme="cmTheme"
                              :cmMode="cmMode"
                              :autoFormatJson="autoFormatJson"
                              :jsonIndentation="jsonIndentation"></CodeMirrorEditor>
        </div>

    </div>

</template>

 

<script>
// 使用时需要根据CodeMirrorEditor.vue的实际存放路径，调整from后面的组件路径，以便正确引用

import CodeMirrorEditor from '../../../components/childCompoen/passdataChild/codeeditChild.vue';
export default {
    components: {
        CodeMirrorEditor
    },
    data() {
        return {
            cmTheme: 'idea', // codeMirror主题
            cmEditorMode: 'javascript', // 编辑模式
            // codeMirror主题选项
            cmThemeOptions: [
                'default',
                '3024-day',
                '3024-night',
                'abcdef',
                'ambiance',
                'ayu-dark',
                'ayu-mirage',
                'base16-dark',
                'base16-light',
                'bespin',
                'blackboard',
                'cobalt',
                'colorforth',
                'darcula',
                'dracula',
                'duotone-dark',
                'duotone-light',
                'eclipse',
                'elegant',
                'erlang-dark',
                'gruvbox-dark',
                'hopscotch',
                'icecoder',
                'idea',
                'isotope',
                'lesser-dark',
                'liquibyte',
                'lucario',
                'material',
                'material-darker',
                'material-palenight',
                'material-ocean',
                'mbo',
                'mdn-like',
                'midnight',
                'monokai',
                'moxer',
                'neat',
                'neo',
                'night',
                'nord',
                'oceanic-next',
                'panda-syntax',
                'paraiso-dark',
                'paraiso-light',
                'pastel-on-dark',
                'railscasts',
                'rubyblue',
                'seti',
                'shadowfox',
                'solarized dark',
                'solarized light',
                'the-matrix',
                'tomorrow-night-bright',
                'tomorrow-night-eighties',
                'ttcn',
                'twilight',
                'vibrant-ink',
                'xq-dark',
                'xq-light',
                'yeti',
                'yonce',
                'zenburn'
            ],
            // 编辑模式选项
            cmEditorModeOptions: ['default', 'json', 'sql', 'javascript', 'css', 'xml', 'html', 'yaml', 'markdown', 'python'],
            cmMode: 'javascript', //codeMirror模式
            jsonIndentation: 2, // json编辑模式下，json格式化缩进 支持字符或数字，最大不超过10，默认缩进2个空格
            autoFormatJson: true // json编辑模式下，输入框失去焦点时是否自动格式化，true 开启， false 关闭
        };
    },

    created() {
        console.log(this.cmTheme);
    },

    methods: {
        // 切换编辑模式事件处理函数
        onEditorModeChange(value) {
            switch (value) {
                case 'json':
                    this.cmMode = 'application/json';
                    break;
                case 'sql':
                    this.cmMode = 'sql';
                    break;
                case 'javascript':
                    this.cmMode = 'javascript';
                    break;
                case 'xml':
                    this.cmMode = 'xml';
                    break;
                case 'css':
                    this.cmMode = 'css';
                    break;
                case 'html':
                    this.cmMode = 'htmlmixed';
                    break;
                case 'yaml':
                    this.cmMode = 'yaml';
                    break;
                case 'markdown':
                    this.cmMode = 'markdown';
                    break;
                case 'python':
                    this.cmMode = 'python';
                    break;

                default:
                    this.cmMode = 'application/json';
            }
        },

        // 修改样式（不推荐，建议参考<style>中的样式，提前配置好样式）

        setStyle() {
            let styleStr =
                'position: absolute; top: 80px; left: 50px; right: 200px; bottom: 20px; padding: 2px; width: 100%;height: 400px;';
            this.$refs.cmEditor.setStyle(styleStr);
        },

        //获取内容
        getValue(lang) {
            let content = this.$refs.cmEditor.getValue();
            if (lang == 'javascript') {
                new Function(content)();
            } else {
                this.$message({
                    message: '暂时不支持其他语言',
                    type: 'warning'
                });
            }
        },
        selectcmTheme(value) {
            console.log(value);
        },

        // //修改内容
        setValue() {
            this.$refs.cmEditor.setValue(JSON.stringify(''));
        }
    }
};
</script>
<style>
.CodeMirror {
    height: 100% !important;
}
.code-mirror-div {
    width: 100%;
    height: 100%;
}
.vue-codemirror {
    width: 100%;
    height: 1005;
}
</style>

 
