<template>
  <div v-if="detailData.list.length">
    <div class="movie-recomende">
      <h2 class="intro-title">{{ title }} 相关电影</h2>
    </div>
    <div class="scroll-warp">
      <div class="scroll-content">
        <div class="movie-item" v-for="item in detailData.list" :key="item.id">
          <el-tooltip :content="item.name" placement="top">
            <img
              class="movie-img"
              :src="item.head"
              @click="goOtherMovie(item.id)"
            />
          </el-tooltip>
          <div class="movie-name one-line">{{ item.name }}</div>
          <div class="movie-language one-line">{{ item.language }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMovieRecomendeDetail } from "@/api/movie.js";
import movieInfo from "./movieInfo.vue"
export default {
  name: "movieRecomende",
  components:{
      movieInfo
    },
  methods: {
    async getDetail(id) {
      await getMovieRecomendeDetail(id).then((res) => {
        //console.log(res);
        if (res.code === 200) {
          this.detailData.list = res.obj;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    goOtherMovie(next) {
      //console.log(next)
      this.$router.push({
        path:'/movie/' + next
        
      });
      location.reload()
      //this.getDetail(next)
    },
  },
  computed: {
    // id: function () {
    //   return this.$route.query.id;
    // },
    title: function () {
      return this.$store.state.title;
    },
  },
  created() {
    this.id = this.$route.params.id
    //console.log(this.id)
    this.getDetail(this.id);
    //console.log(this.id);
  },
  data() {
    return {
      id:null,
      detailData: {
        list: [],
      },
    };
  },
  watch: {
    '$route.params': {
      handler(val) {
        // 根据路由参数获取用户信息并更新
        this.id = val.id
        this.getDetail(val.id)
      },
      immediate: true // 立即执行
    }
  },
};
</script>

<style scoped>
.intro-title {
  margin: 24px 0 12px 0;
  font-size: 16px;
  color: #007722;
}
.movie-item {
  display: inline-block;
  margin-right: 20px;
}

.scroll-warp {
  overflow-x: auto;
  overflow-y: hidden;
}

.scroll-content {
  display: inline-block;
  white-space: nowrap;
}

.movie-name {
  width: 120px;
  color: #111;
  font-size: 13px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.movie-language {
  columns: #9b9b9b;
  font-size: 13px;
  text-align: center;
  width: 94px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.movie-img {
  width: 95px;
  height: 133px;
  object-fit: cover;
  margin: 0 auto;
  background-color: #ccc;
  cursor: pointer;
}
</style>