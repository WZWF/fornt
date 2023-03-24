<template>
  <div class="editor-html">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="{ 'height': height + 'px', 'overflow-y': 'hidden' }"
      :model-value="modelValue"
      :defultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @OnChange="onChange"
    />
  </div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default {
  name: "editorHtml",
  components: { Editor, Toolbar },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    height: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      mode: "default",
      editor: null,
      toolbarConfig: {
        excludeKey: ["uploadVideo"],
      },
      editorConfig: {
        placeholder: '请输入内容...',
        excludeKey: ["uploadVideo"],
        server: "/api/upload/forumImage",
        fieldName: "file",
        custonInsert(responseData, insertFn) {
          if (responseData.code === 200) {
            insertFn(
              //this.globalInfo.imageUrl + responseData.data.fieldName, //文件路径
              "",
              ""
            );
            return;
          } else {
            this.$message.error(responseData.message);
          }
        },
      },
    };
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  methods: {
    onChange(editor) {
      this.$emit("update:modelValue", editor.getHtml());
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
  },
};
</script>

<style>
.editor-html{
    border: 1px solid #ddd;
}
/* .w-e-text-container {
  height: 500px !important;
} */
</style>