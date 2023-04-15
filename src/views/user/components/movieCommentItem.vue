<template>
  <div class="movie-comment-item">
    <div class="movie-comment-item-inner">
        
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
  }
}
</style>