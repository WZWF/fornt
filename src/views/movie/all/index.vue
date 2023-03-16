<template>
  <div class="main-container">
    <div class="top-list">
      <div class="horizontal-list" v-if="types.short.length">
        <div class="list-title">类别：</div>
        <div
          :class="selectType === 'ALL' ? 'list-item item-active' : 'list-item'"
          @click="handleTypeSelect(-1, 'ALL')"
        >
          ALL
        </div>
        <div
          :class="
            selectType === item.typeName ? 'list-item item-active' : 'list-item'
          "
          v-for="(item, index) in types.short"
          :key="index"
          @click="handleTypeSelect(item.id, item.typeName)"
        >
          <span>{{ item.typeName }}</span>
        </div>
        <button class="more-a" v-if="types.isShowMore">
          <span class="more-type" @click="expand" v-if="types.isShowMore"
            >显示更多</span
          >
        </button>
      </div>
      <div class="horizontal-list">
        <div class="list-title">是否有播放源：</div>
        <div
          class="list-item"
          v-for="(item, index) in palys"
          :key="index"
          :class="
            selectPlayID === item.id ? 'list-item item-active' : 'list-item'
          "
          @click="handlePlaySelect(item.id)"
        >
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="movie-content" v-if="movieData.length">
      <!-- <div
        v-for="(item, index) in movieData"
        :key="index"
        class="mv-item"
        @click="goDetail(item.id)"
      >
        <img class="top-img" :src="item.posterURL" />
        <div class="title one-line">{{ item.title }}</div>
        <div class="score" v-if="item.score">
          <div class="score-content">
            <rankstar :score="item.score * 2" />
            <span class="score-text">{{ item.score.toFixed(1) }}</span>
          </div>
        </div>
        <div v-else class="no-score">暂无评分</div>
      </div>-->
      <movieItem v-for="(item,index) in movieData" :itemData="item" :key="index"/>
    </div>

  </div>
</template>
  
<script>
import { getTypes } from "@/api/type";
import { getMovies } from "@/api/movie";
import movieItem from "@/components/movieItem/movieItem.vue";

export default {
  components: { movieItem },
  data() {
    return {
      types: {
        orgin: [],
        short: [],
        isShowMore: true,
      },
      selectType: "ALL",
      selectPlayID: 0,
      query: {
        tid: -1,
        play: 0,
        start: 0,
        num: 100,
      },
      movieData: [],
      palys: [
        { name: "不限", id: 0 },
        { name: "有播放源", id: 1 },
        { name: "无播放源", id: 2 },
      ],
      count: 0,
    };
  },
  methods: {
    async allTypes() {
      getTypes().then((res) => {
        this.types.orgin = res.obj;
        this.types.short = this.types.orgin.slice(0, 10);
        this.types.isShowMore = this.types.orgin.length > 10;
      });
    },
    expand() {
      this.types.short = this.types.orgin;
      this.types.isShowMore = false;
    },
    handleTypeSelect(id, type) {
      if (this.selectType === type) return;
      this.selectType = type;
      this.query.tid = id;
      this.resetQuery();
      this.loadData();
    },
    resetQuery() {
      this.query.num = 100;
      this.query.start = 0;
    },
    handlePlaySelect(id) {
      if (this.selectPlayID === id) return;
      this.selectPlayID = id;
      this.query.play = id;
      this.resetQuery();
      this.loadData();
    },
    async loadData() {
      getMovies(this.query).then((res) => {
        if (res.code === 200) {
          this.movieData = res.obj.objs;
          this.query.start += this.query.num;
          this.count = res.obj.count;
          //console.log(this.count)
        } else {
          this.$message.error(res.message);
        }
      });
    },
    loadMore() {
      getMovies(this.query).then((res) => {
        if (res.code === 200) {
          this.movieData.push(...res.obj.objs);
          this.query.start += this.query.num;
          this.count = res.obj.count;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    delay(delay) {
      setTimeout(() => {
        this.loadMore();
      }, delay);
    },
    listenerOnScroll() {
      const _this = this;
      window.onscroll = function () {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + windowHeight > scrollHeight - 1) {
          if (
            _this.movieData !== null &&
            _this.movieData.length < _this.count
          ) {
            _this.delay(200);
          } else {
            _this.$message.info("没有更多数据");
          }
        }
      };
    },
  },
  created() {
    this.allTypes();
    this.loadData();
  },
  mounted() {
    this.listenerOnScroll();
  },
  destroyed() {
    window.onscroll = null;
  }
};
</script>
  
<style scoped lang="less">
.main-container {
  display: flex;
  margin: 20px auto;
  width: 85%;
  flex-wrap: wrap;
}

.movie-content {
  margin: 1% 5%;
}

.top-list {
  margin: 35px 5% 0 5%;
  width: 100%;
  border: 1px solid #ccc;
}

.list-item {
  height: 25px;
  margin: 0 15px 15px 15px;
  text-align: center;
  padding-top: 7px;
  cursor: pointer;
}

.item-active {
  background-color: #99a9bf;
  color: white;
  border-radius: 20px;
}

.list-title {
  text-align: center;
  padding: 7px 0 0 15px;
}

.horizontal-list {
  display: flex;
  flex-wrap: wrap;
  /*justify-content: space-between;*/
  overflow: hidden;
  margin-top: 20px;
}

.more-a {
  display: inline-block;
  margin: 7px 15px 15px 0;
  border-radius: 20px;
  border: 0 solid #aaa;
}
.more-type {
  cursor: pointer;
}
</style>
  