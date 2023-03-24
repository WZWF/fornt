<template>
  <div class="comment-body">
    <div class="comment-title">
      <div class="title">
        评论<span class="count">{{ count }}</span>
      </div>
      <div class="tab">
        <span
          @click="orderChange(0)"
          :class="['tab-item', orderType == 0 ? 'active' : '']"
          >热榜</span
        >
        <el-divider direction="vertical" />
        <span
          @click="orderChange(1)"
          :class="['tab-item', orderType == 1 ? 'active' : '']"
          >最新</span
        >
      </div>
    </div>
    <div class="comment-form-panel">
      <commentPost
        :articleId="articleId"
        :pCommentId="'0'"
        :userId="user.id"
        @postCommentFinish="postCommentFinish"
      ></commentPost>
    </div>
    <div class="comment-list">
      <commentItemList
        :data="commentList"
        :queryInfo="queryInfo"
        :count="count"
        :articleUserId="articleUserId"
        :articleId="articleId"
        :loading="loading"
        :currentUserInfo="user"
        @loadData="loadComment"
      ></commentItemList>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import commentPost from "./commentPost.vue";
import commentItemList from "./commentItemList.vue";
import { loadCommentList } from "@/api/forum"

export default {
  name: "commentList",
  components: {
    commentPost,
    commentItemList,
  },
  props: {
    articleId: {
      type: String,
    },
    articleUserId: {
      type: String,
    },
  },
  data() {
    return {
      orderType: 0,
      commentList: [],
      count: 0,
      queryInfo: {
        curPage: 1,
        pageSize: 15,
        orderType: 0,
      },
      loading: false,
    };
  },
  methods: {
    orderChange(type) {
      this.orderType = type;
      this.queryInfo.orderType = type;
      this.loadComment()
    },
    postCommentFinish(resultData) {
      this.commentList.unshift(resultData);
      this.coount = Number(this.count) + 1;
      this.$emit("updataCommentCount", this.count);
    },
    async loadComment() {
      this.loading = true;

      await loadCommentList(this.articleId, this.queryInfo).then((res) => {
        if (res.code === 200) {
          this.commentList = res.obj.objs == null ? [] : res.obj.objs;
          this.count = res.obj.count;
        } else {
          this.$message.error(res.message);
        }
      })

      this.loading = false;
    },
  },
  computed: {
    ...mapState({
      user: function () {
        return this.$store.state.user;
      },
    }),
  },
  created() {
    this.loadComment();
  }
};
</script>

<style lang="less" scoped>
.comment-body {
  .comment-title {
    display: flex;
    align-items: center;
    .title {
      font-size: 20px;
      .count {
        font-size: 14px;
        padding: 0px 10px;
      }
    }
    .tab {
      .tab-item {
        cursor: pointer;
      }
      .active {
        color: #007fff;
      }
    }
  }
  .comment-form-panel {
    margin-top: 20px;
  }
}
</style>