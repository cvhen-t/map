<template>
    <div class="editor-box">
        <ace ref="editor"
             :value="content"
             @init="initEditor"
             :lang="lang"
             :height="height === 0 ? '100%' : height"
             :theme="theme"
             :options="options"
             width="100%"
             v-bind="config">
        </ace>
    </div>
</template>

<script>
import ace from 'vue2-ace-editor';
export default {
    name: 'SqlEditor',
    components: {
        ace
    },
    props: {
        content: {
            type: String,
            default: ''
        },
        height: {
            type: Number,
            default: 0
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        theme: {
            type: String,
            default: 'monokai'
        },
        lang: {
            type: String,
            default: 'sql'
        },
        config: {
            type: Object,
            default: () => {
                return {
                    font_size: 16,
                    sql_atom: true
                };
            }
        }
    },
    computed: {
        options() {
            if (this.readOnly) {
                return {
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableLiveAutocompletion: this.config.sql_atom,
                    showPrintMargin: false,
                    fontSize: this.config.font_size,
                    readOnly: true
                };
            }
            return {
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: this.config.sql_atom,
                showPrintMargin: false,
                fontSize: this.config.font_size
            };
        }
    },
    created() {},
    methods: {
        initEditor(editor) {
            require('brace/ext/language_tools');
            // 设置语言
            require('brace/mode/sql');
            require('brace/snippets/sql');
            // 设置主题 按需加载
            require('brace/theme/monokai');
            require('brace/theme/chrome');
            require('brace/theme/crimson_editor');
            // 监听值的变化
            editor.getSession().on('change', (val) => {
                this.$emit('change', editor.getValue());
            });
        }
    }
};
</script>

<style>
</style>