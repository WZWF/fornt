<template>
  <div class="app">
    <el-carousel
      height="500px"
      type="card"
      indicator-position="outside"
      @change="changeItem"
    >
      <div>
        <el-carousel-item v-for="(item, index) in posterList" :key="index">
          <img
            alt=""
            @click="goMovie(item.mid)"
            :src="item.poster"
            style="width: 100%; height: 500px"
          />
          <!-- <div class="carousel_div">
            <h3>{{ item.title }}</h3>
          </div> -->
        </el-carousel-item>
      </div>
      <div class="carousel_div">
        <h3>{{ title }}</h3>
      </div>
    </el-carousel>
    <div class="main">
      <div class="panel" v-if="recommentData.length">
        <div class="panel-header">
          <span class="panel-title">
            <span
              >系统推荐</span
            >
          </span>
        </div>
      </div>
      <div>
        <movieItem
          v-for="(item, index) in recommentData"
          :key="index"
          :itemData="item"
          class="movie-item"
        ></movieItem>
      </div>
    </div>

    <!-- <div class="main">
      <div class="movie-grid">
        <div class="panel">
          <div class="panel-header">
            <span class="panel-title">
              <span class="textcolor_orange"
                >正在热播 ( {{ filmList.length }} )</span
              >
            </span>
          </div>
          <div class="panel-content">
            <dl class="movie-list">
              <dd v-for="item in posterList" :key="item">
                <router-link :to="'/film/info?fid=' + item.id">
                  <div class="movie-item">
                    <div class="movie-poster">
                      <img class="poster-default" alt="" :src="item.poster" />
                      <img
                        class="movie-poster-img"
                        alt="不要先生与好的女士海报封面"
                        :src="item.title"
                      />
                      <div class="movie-overlay movie-overlay-bg">
                        <div class="movie-info">
                          <div class="movie-title" title="">
                            {{ item.title }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="movie-detail movie-wish">
                      <span class="stonefont">123</span>人想看
                    </div>
                    <div class="movie-ver"></div>
                  </div>
                  <div class="movie-detail movie-rt">
                    {{ item.releaseTime }} 上映
                  </div>
                </router-link>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { listAllPoster, getReco } from "@/api/movie";
import { visit } from "@/api/home"
import movieItem from "@/components/movieItem/movieItem.vue";

export default {
  components: {
    movieItem,
  },
  data() {
    return {
      recommentData: [
        {
          id: "1",
          title: "Toy Story (1995)",
          posterURL:
            "http://124.222.196.87:9000/movie/movie_photo/images/1/poster.jpg",
          score: 3.8724696356275303,
        },
        {
          id: "1",
          title: "Toy Story (1995)",
          posterURL:
            "http://124.222.196.87:9000/movie/movie_photo/images/1/poster.jpg",
          score: 3.8724696356275303,
        },
        {
          id: "1",
          title: "Toy Story (1995)",
          posterURL:
            "http://124.222.196.87:9000/movie/movie_photo/images/1/poster.jpg",
          score: 3.8724696356275303,
        },
        {
          id: "1",
          title: "Toy Story (1995)",
          posterURL:
            "http://124.222.196.87:9000/movie/movie_photo/images/1/poster.jpg",
          score: 3.8724696356275303,
        },
        {
          id: "1",
          title: "Toy Story (1995)",
          posterURL:
            "http://124.222.196.87:9000/movie/movie_photo/images/1/poster.jpg",
          score: 3.8724696356275303,
        },
        {
          id: "1",
          title: "Toy Story (1995)",
          posterURL:
            "http://124.222.196.87:9000/movie/movie_photo/images/1/poster.jpg",
          score: 3.8724696356275303,
        },
        {
          id: "1",
          title: "Toy Story (1995)",
          posterURL:
            "http://124.222.196.87:9000/movie/movie_photo/images/1/poster.jpg",
          score: 3.8724696356275303,
        },
        {
          id: "1",
          title: "Toy Story (1995)",
          posterURL:
            "http://124.222.196.87:9000/movie/movie_photo/images/1/poster.jpg",
          score: 3.8724696356275303,
        },
        {
          id: "1",
          title: "Toy Story (1995)",
          posterURL:
            "http://124.222.196.87:9000/movie/movie_photo/images/1/poster.jpg",
          score: 3.8724696356275303,
        },
      ],
      recommentData:[],
      posterList: [],
      title: "",
      query: {
        start: 0,
        num: 10,
      },
      count: 0,
    };
  },
  methods: {
    goMovie(mid) {
      this.$router.push({
        path: "/movie/" + mid,
      });
    },
    getList() {
      listAllPoster().then((res) => {
        this.posterList = res.obj == null ? [] : res.obj;
        if (res.obj != null) this.title = res.obj[0].title;
      });
      this.loadReco()
    },
    loadReco() {
      getReco(this.query).then((res) => {
        if (res.code === 200) {
          this.recommentData = res.obj.objs == null ? [] : res.obj.objs;
          this.query.start += this.query.num;
          this.count = res.obj.count;
        }
      })
    },
    changeItem(idx) {
      this.title = this.posterList[idx].title;
    },
    loadMore() {
      getReco(this.query).then((res) => {
        if (res.code === 200) {
          this.recommentData.push(...res.obj.objs);
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
            _this.recommentData !== null &&
            _this.recommentData.length < _this.count
          ) {
            _this.delay(200);
          } else {
            _this.$message.info("没有更多数据");
          }
        }
      };
    },
  },
  destroyed() {
    window.onscroll = null;
  },
  mounted() {
    this.getList();
    this.listenerOnScroll();
    visit();
  },
};
import "@/assets/css/home.css";
</script>

<style lang="less" scoped>
.app {
  padding: 50px 120px;
}

.main {
  float: left;
  padding: 40px;
  padding-top: 0px;

  .panel {
    margin: 20px;
     .panel-title{
       color: #000;
       font-family: 微软雅黑;
     }
  }
}

.carousel_div {
  position: absolute;
  width: 100%;
  text-align: center;
  //background-color: rgb(80, 80, 80, 0.1);
  background: none;
  box-shadow: -11px -34px 100px 10px grey;
  bottom: 24px;
  z-index: 10;
}

.carousel_div h3 {
  text-align: center;
  color: white;
}
</style>