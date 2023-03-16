<template>
  <div class="edit-post">
    <el-form
      :model="formData"
      :rules="rules"
      ref="formDataRef"
      class="post-panel"
      label-width="50px"
    >
      <div class="post-editor">
        <el-card :body-style="{ padding: '5px' }">
          <template #header>
            <span>正文</span>
          </template>
        </el-card>
      </div>
      <div class="post-setting">
        <el-card :body-style="{ padding: '5px', margin: '0px' }">
          <template #header>
            <span>设置</span>
          </template>
          <el-form-item label="标题" prop="title">
            <el-input
              clearable
              placeholder="提示"
              v-model="formData.title"
            ></el-input>
          </el-form-item>
        </el-card>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addPost",
  data() {
    return {
      formData: {},
      formDataRef: {},
    };
  },
};
</script>

<style lang="less">
.edit-post {
  .post-panel {
    display: flex;
    .el-card__header {
      padding: 10px;
    }
    .post-editor {
      flex: 1;
    }
    .post-setting {
      margin-left: 10px;
      width: 450px;
    }
  }
}
</style>