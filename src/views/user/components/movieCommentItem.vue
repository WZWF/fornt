<template>
  <div class="movie-comment-item">
    <div class="movie-comment-item-inner">
      <div class="top-content">
        <div>
          <img class="avatar" :src="data.userImg" />
        </div>
        <div style="width: 100%">
          <span class="nickname"
            ><router-link :to="`/user/${data.id}`">{{
              data.name
            }}</router-link></span
          >
          <div class="time">{{ data.createTime }}</div>
        </div>
      </div>
      <div class="content three-line">留言: {{ data.comment }}</div>
      <div class="related-movie">
        留言电影：<router-link :to="`/movie/${data.mid}`">{{
          data.movie
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "movieCommentItem",
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

<style lang="less" scoped>
.movie-comment-item {
  padding: 5px 15px 0 15px;
  .movie-comment-item-inner {
    border-bottom: 1px solid #ddd;
    padding: 10px 0px;
    display: flex;
    flex-flow: row wrap;
  }
  .top-content {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
    }
    .nickname {
      font-size: 13px;
      margin-left: 10px;
      color: #37a;
      margin-right: 10px;
    }
    .time {
      // width: 100%;
      font-size: 13px;
      margin-left: 10px;
      color: #999;
    }
  }
  .content {
    width: 100%;
    margin-top: 10px;
    color: #666;
    font-size: 13px;
    line-height: 1.5;
  }
  .related-movie {
    margin-top: 10px;
    color: #666;
    font-size: 13px;
    line-height: 1.5;
  }
}
</style>