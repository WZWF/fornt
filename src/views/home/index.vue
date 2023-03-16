<template>
  <div class="app">
    <el-carousel height="500px" type="card" indicator-position="outside">
      <el-carousel-item v-for="(item, index) in posterList" :key="index">
        <img alt="" @click="goMovie(item.mid)" :src="item.poster" style="width: 100%; height: 500px" />
        <div class="carousel_div">
          <h3>{{ item.title }}</h3>
        </div>
      </el-carousel-item>
    </el-carousel>

    <div class="main">
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
    </div>
  </div>
</template>

<script>
import { listAllPoster } from "@/api/movie"

export default {
  data() {
    return {
      topList: [],
      filmList: [],
      posterList: [],
    };
  },
  methods: {
    goMovie(mid) {
      this.$router.push({
        path:'/movie/' + mid
        });
    },
    getList() {
      listAllPoster().then((res) => {
        this.posterList = res.obj;
      });
    },
  },

  mounted() {
    this.getList();
  },
};
import "@/assets/css/home.css";
</script>

<style scoped>
.app {
  padding: 50px 120px;
}

.main {
  float: left;
  padding-top: 40px;
}

.carousel_div {
  position: relative;
  background-color: rgb(80, 80, 80, 0.1);
  box-shadow: -11px -34px 100px 10px grey;
  bottom: 24px;
}

.carousel_div h3 {
  text-align: center;
  color: white;
}
</style>