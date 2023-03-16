<template>
  <div class="movie-coments">
    <h2 class="intro-title">{{ title }} 的影评</h2>
    <div class="scroll-warp">
      <div class="comment-item" v-for="item in detailData.list" :key="item.id">
        <div class="top-content">
          <img class="avatar" :src="item.user.head" />
          <span class="nickname">{{ item.user.name }}</span>
          <div v-if="item.rating" class="rankstar">
            <rankstar :score="item.rating * 2"></rankstar>
          </div>
          <div class="time">{{ item.createTime }}</div>
        </div>
        <div class="content three-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import rankstar from "@/components/rankstar/rankstar.vue";
import { getMovieComments } from "@/api/movie.js";
export default {
  components: { rankstar },
  name: "movieRecomende",
  methods: {
  },
  computed: {
    title: function(){
      return this.$store.state.title;
    }
  },
  created() {
    this.getDetail();
  },
  data() {
    return {
      id: null,
      detailData: {
        list: [],
      },
      
    };
  },
};
</script>

<style scoped>
.intro-title {
  margin: 24px 0 12px 0;
  font-size: 16px;
  color: #007722;
}
.top-content {
  display: flex;
  align-items: center;
}
.top-content .avatar {
  width: 24px;
  height: 24px;
}
.top-content .nickname {
  font-size: 13px;
  margin-left: 10px;
  color: #37a;
  margin-right: 10px;
}
.top-content .time {
  font-size: 13px;
  margin-left: 10px;
  color: #999;
}
.comment-item {
  padding: 20px 0px;
  position: relative;
  border-top: 0.5px solid #ddd;
  margin-bottom: 5px;
}
.rankstar {
  display: flex;
  align-items: center;
}
.rank-text {
  margin-right: 3px;
}
.content {
  margin-top: 10px;
  color: #666;
  font-size: 13px;
  line-height: 1.5;
}
</style>