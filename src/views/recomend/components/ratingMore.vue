<template>
  <div class="recommmend-contariner">
    <div class="recommend-head">
      <h2 class="recommend-title">
        <span class="icon-span"
          ><img src="@/assets/icons/svg/ratingMore.png" class="icon" /></span
        >最多评分
      </h2>
    </div>
    <div class="recommend-body">
      <div v-if="!movieData.length">暂无电影推荐</div>
      <div v-else>
        <div class="load-more">
          <span class="load-more-content">
            最多评分电影推荐...
            <a class="load-more-a" @click="loadMore">加载更多</a>
          </span>
        </div>
        <movieItem
          v-for="(item, index) in movieData"
          :itemData="item"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
  
  <script>
import movieItem from "@/components/movieItem/movieItem.vue";
import { getRatingMore } from "@/api/recommendation";
export default {
  name: "ratingMore",
  components: {
    movieItem,
  },
  data() {
    return {
      movieData: [],
      count: 0,
      query: {
        start: 0,
        num: 6,
      },
    };
  },
  methods: {
    toLogin() {
      this.$router.push({
        name: "login",
        query: { redirect: this.$router.currentRoute.fullPath },
      });
    },
    async getMovieData() {
      await getRatingMore(this.query).then((res) => {
        if (res.code === 200) {
          this.movieData = res.obj.objs;
          this.query.start += this.query.num;
          this.count = res.obj.count;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    loadMore() {
      if (this.query.start > this.count) {
        this.$message.info("没有更多数据了");
      } else {
        this.loadMoreMovie();
      }
    },
    async loadMoreMovie() {
      await getRatingMore(this.query).then((res) => {
        if (res.code === 200) {
          this.movieData.push(...res.obj.objs);
          this.query.start += this.query.num;
          this.count = res.obj.count;
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
  created() {
    this.getMovieData();
  },
};
</script>
  
  <style lang="less" scoped>
.recommmend-contariner {
  width: 80%;
  margin: 1px 10%;
}
.recommend-head {
  width: 100%;
  margin: 5px 0;
}
.recommend-title {
  margin: 15px 0;
  color: #494949;
  font-weight: bold;
  font-size: 1.3em;
}

.load-more {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.load-more-content {
  color: #aeaeae;
}

.load-more-a {
  cursor: pointer;
  color: #3279f4;
  user-select: none;
}

.recommend-body {
  width: 100%;
  min-height: 100px;
}

.icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}

.icon-span {
  margin-right: 5px;
}
</style>