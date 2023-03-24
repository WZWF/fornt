<template>
  <div class="comment-item">
    <div class="avatar">
      <el-image class="avatar-img" :src="commentData.userImg"></el-image>
    </div>
    <div class="comment-info">
      <div class="nick-name">
        <span class="name">{{ commentData.username }}</span>
        <span class="tag-author" v-if="commentData.uid == articleUserId"
          >作者</span
        >
      </div>
      <div class="comment-content">
        <div>
          <span v-html="commentData.content"></span>
        </div>
      </div>
      <div class="op-panel">
        <div class="time">
          <span>{{ commentData.createTime ? dateFormat(commentData.createTime) : "" }}</span>
        </div>
        <div
          :class="[
            'iconfont icon-good',
            commentData.isLike == 1 ? 'active' : '',
          ]"
          @click="doLike(commentData)"
        >
          {{ commentData.likeCount > 0 ? commentData.likeCount : "点赞" }}
        </div>
        <div
          class="iconfont icon-comment"
          @click="showReplyPanel(commentData, 0)"
        >
          回复
        </div>
      </div>
      <div class="comment-sub-list" v-if="commentData.children">
        <div
          class="comment-sub-item"
          v-for="(sub, index) in commentData.children"
          :key="index"
        >
          <div class="avatar">
            <el-image class="avatar-img" :src="sub.userImg"></el-image>
          </div>
          <div class="comment-sub-info">
            <div class="nick-name">
              <span class="name">{{ sub.username }}</span>
              <span class="tag-author" v-if="sub.uid === articleUserId"
                >作者</span
              >
              <span class="reply-name">回复</span>
              <span class="a-link">@{{ sub.replyUsername }}</span>
              <span>：</span>
              <span class="sub-content" v-html="sub.content"></span>
            </div>
            <div class="op-panel">
              <div class="time">
                <span>{{ sub.createTime }}</span>
              </div>
              <div
                :class="[
                  'iconfont icon-good',
                  sub.isLike == 1 ? 'active' : '',
                ]"
                @click="doLike(sub)"
              >
                {{ sub.likeCount > 0 ? sub.likeCount : "点赞" }}
              </div>
              <div
                class="iconfont icon-comment"
                @click="showReplyPanel(sub, 1)"
              >
                回复
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reply-info"  v-show="commentData.showReply"> <!-- -->
        <commentPost
          :placeholderInfo="placeholderInfo"
          :articleId="articleId"
          :pCommentId="pCommentId + ''"
          :replyUserId="replyUserId"
          :userId="currentUserId"
          @postCommentFinish="postCommentFinish"
        ></commentPost>
      </div>
    </div>
  </div>
</template>

<script>
import { likeComment } from '@/api/forum';
import { mapState } from "vuex";
import commentPost from "./commentPost.vue";

export default {
  name: "commentItem",
  components: {
    commentPost,
  },
  props: {
    articleId: {
      type: String,
    },
    commentData: {
      type: Object,
    },
    articleUserId: {
      type: String,
    },
    currentUserId: {
      type: String,
    },
  },
  data() {
    return {
      pCommentId: 0,
      replyUserId: null,
      placeholderInfo: null,
      self: this,
    };
  },
  computed: {
    ...mapState({
      user: function () {
        return this.$store.state.user;
      },
    }),
  },
  methods: {
    showReplyPanel(curData, type) {
      if (!this.user.token) {
        this.$router.push({
          name: "login",
          query: { redirect: this.$router.currentRoute.fullPath },
        });
        return;
      }
      this.pCommentId = this.commentData.id;
      this.replyUserId = curData.uid;
      this.placeholderInfo = "回复 @" + curData.username;
      const haveShow = this.commentData.showReply == undefined ? false : this.commentData.showReply;
      this.$emit("hiddenAllReply");
      if (type == 0) {
        this.commentData.showReply = !haveShow;
      } else {
        this.commentData.showReply = true;
      }
      this.self.$forceUpdate();
    },
    postCommentFinish(res){
      this.commentData.children = res;
      this.placeholderInfo = undefined;
    },
    doLike(data) {
      if (!this.user.token) {
        this.$router.push({
          name: "login",
          query: { redirect: this.$router.currentRoute.fullPath },
        });
        return;
      }
      likeComment({cid : data.id}).then((res) => {
        if (res.code === 200) {
          data.likeCount = res.obj.likeCount;
          data.isLike = res.obj.isLike;
        } else {
          this.$message.error(res.message);
        }
      })
    },
    //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一 如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    update(){
      this.self.$forceUpdate();
    },
  },
};
</script>

<style lang="less">
.comment-item {
  display: flex;
  padding-top: 15px;
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
  }
  .comment-info {
    flex: 1;
    margin-left: 10px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
    .nick-name {
      .name {
        font-size: 14px;
        color: #61666d;
        margin-right: 10px;
        cursor: pointer;
      }
      .tag-author {
        background: #ff6699;
        color: #fff;
        font-size: 12px;
        border-radius: 2px;
        padding: 0px 3px;
      }
    }
    .comment-content {
      margin-top: 5px;
      font-size: 15px;
      line-height: 22px;
      .tag {
        margin-right: 5px;
        font-size: 12px;
        border-radius: 3px;
        padding: 0px 5px;
      }
    }
    .op-panel {
      display: flex;
      align-items: center;
      margin-top: 5px;
      font-size: 13px;
      color: #61666d;
      .time {
        margin-right: 20px;
      }
      .iconfont {
        margin-right: 15px;
        font-size: 14px;
        color: #9499a0;
        cursor: pointer;
      }
      .iconfont::before {
        margin-right: 3px;
      }
      .active {
        color: #007fff;
      }
    }
    .comment-sub-list {
      margin-top: 10px;
      .comment-sub-item {
        display: flex;
        margin: 8px 0px;
        font-size: 14px;
        .avatar {
          display: flex;
          cursor: pointer;
          background: #f0f0f0;
          align-items: center;
          overflow: hidden;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          .avatar-img {
            width: 30px;
            height: 30px;
            border-radius: 15px;
          }
        }
        .comment-sub-info {
          margin-left: 5px;
          .nick-name {
            .reply-name {
              margin: 0px 5px;
            }
            .sub-content {
              font-size: 15px;
            }
          }
        }
      }
    }
    .reply-info {
      margin-top: 15px;
    }
  }
}
</style>