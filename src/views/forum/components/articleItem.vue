<template>
  <div class="article-item">
    <div class="article-item-inner">
      <div class="article-body">
        <div class="user-info">
          <div class="avatar">
            <el-image class="avatar-img" :src="data.userImg"></el-image>
          </div>
          <router-link :to="'/user/' + data.uid" class="link-info">{{
            data.username
          }}</router-link>

          <el-divider direction="vertical"></el-divider>
          <div class="post-time">{{ data.createTime }}</div>
        </div>
        <router-link :to="'/articleDetail/' + data.id" class="title">{{ data.title }}</router-link>
        <div class="summary">{{ data.summary }}</div>
        <div class="article-info">
          <span class="iconfont icon-eye-solid">
            {{ data.readCount == 0 ? "阅读" : data.readCount }}
          </span>
          <span class="iconfont icon-good">
            {{ data.goodCount == 0 ? "点赞" : data.likeCount }}
          </span>
          <span class="iconfont icon-comment">
            {{ data.commentCount == 0 ? "评论" : data.commentCount }}
          </span>
        </div>
      </div>
      <div class="cover" v-if="data.cover">
        <el-image
          style="width: 100px; height: 100px"
          fit="scale-down"
          :src="data.cover"
        >
        </el-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "articleItem",
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

<style lang="less" scoped>
.article-item {
  padding: 5px 15px 0 15px;
  .article-item-inner {
    border-bottom: 1px solid #ddd;
    padding: 10px 0px;
    display: flex;
    .article-body {
      width: 80%;
      flex: 1;
      .user-info {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #4e5969;
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
        .link-info {
          margin-left: 5px;
          color: #494949;
          text-decoration: none;
        }
        .link-info:hover {
          color: var(--link);
        }
        .post-time {
          font-size: 13px;
          color: #9a9a9a;
        }
      }
      .title {
        font-weight: bold;
        text-decoration: none;
        color: #4a4a4a;
        font-size: 16px;
        margin: 10px 0px;
        display: inline-block;
      }
      .summary {
        width: 100%;
        font-size: 14px;
        color: #86909c;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .article-info {
        margin-top: 10px;
        display: flex;
        align-items: center;
        font-size: 13px;
        .iconfont-isLike {
          color: blue;
          margin-right: 25px;
          font-size: 14px;
        }
        .iconfont {
          color: #86909c;
          margin-right: 25px;
          font-size: 14px;
        }
        .iconfont:before {
          padding-right: 3px;
        }
        .edit-btn {
          color: var(--link);
          cursor: pointer;
        }
      }
    }
    .cover {
      background: #ddd;
      border-radius: 5px;
      overflow: hidden;
      width: 100px;
      height: 100px;
    }
  }
}
</style>