<template>
  <div class="post-comment-panel">
    <div class="avatar">
      <el-image v-if="user.id" class="avatar-img" :src="user.avatar"></el-image>
      <div v-if="!user.id" class="no-login">未登录</div>
    </div>
    <div class="comment-form">
      <el-form :model="formData" :rules="rules" ref="formDataRef">
        <!--textarea输入-->
        <el-form-item prop="content">
          <el-input
            clearable
            :placeholder="placeholderInfo"
            type="textarea"
            :maxlength="800"
            resize="none"
            show-word-limit
            v-model="formData.content"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="send-btn" @click="postCommentDo">发表</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { postComment } from "@/api/forum";
export default {
  name: "commentPost",
  props: {
    articleId: {
      type: String,
    },
    pCommentId: {
      type: String,
    },
    replyUserId: {
      type: String,
    },
    userId: {
      type: String,
    },
    placeholderInfo: {
      type: String,
      default: "请文明发言",
    },
  },
  data() {
    const checkPostComment = (rule, value, callback) => {
      if (value == null) {
        callback(new Error(rule.message));
      } else {
        callback();
      }
    };
    return {
      articleInfo: {
        userImg:
          "http://124.222.196.87:9000/movie/movie_photo/images/1/poster.jpg",
      },
      formData: {
        content: "",
      },
      rules: {
        content: [
          {
            required: true,
            message: "请输入评论内容",
            validator: checkPostComment,
          },
          { min: 5, message: "评论至少5个字" },
        ],
      },
    };
  },
  methods: {
    postCommentDo() {
      if (!this.user.token) {
        this.$router.push({
          name: "login",
          query: { redirect: this.$router.currentRoute.fullPath },
        });
        return;
      }
      this.$refs.formDataRef.validate(async (valid) => {
        if (!valid) return;
        let data = {};
        data.articleId = this.articleId;
        data.pCommentId = this.pCommentId;
        data.replyUserId = this.replyUserId;
        data.content = this.formData.content;
        await postComment(data).then((res) => {
          if (res.code === 200) {
            this.$refs.formDataRef.resetFields();
            this.$emit("postCommentFinish", res.obj);
          } else {
            this.$message.error(res.message);
          }
        });
      });
    },
  },
  computed: {
    ...mapState({
      user: function () {
        return this.$store.state.user;
      },
    }),
  },
};
</script>

<style lang="less">
.post-comment-panel {
  display: flex;
  align-items: top;
  .avatar {
    display: flex;
    cursor: pointer;
    background: #f0f0f0;
    align-items: center;
    overflow: hidden;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    .avatar-img {
      width: 50px;
      height: 50px;
      border-radius: 25px;
    }
    .no-login {
      width: 100%;
      text-align: center;
      font-size: 13px;
    }
  }
  .comment-form {
    flex: 1;
    margin: 0px 10px;
    .el-textarea__inner {
      height: 60px;
    }
  }
  .send-btn {
    cursor: pointer;
    width: 60px;
    height: 60px;
    background: #007fff;
    color: #fff;
    text-align: center;
    line-height: 60px;
    border-radius: 5px;
  }
}
</style>