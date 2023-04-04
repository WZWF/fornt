<template>
  <div class="movie-coments">
    <h2 class="intro-title">{{ title }} 的影评 ({{ count }})</h2>
    <div class="scroll-warp">
      <div class="comment-item" v-for="item in detailData" :key="item.id">
        <div class="top-content">
          <img class="avatar" :src="item.userImg" />
          <span class="nickname">{{ item.name }}</span>
          <div v-if="item.rating" class="rankstar">
            <rankstar :score="item.rating * 2"></rankstar>
          </div>
          <div class="time">{{ item.createTime }}</div>
        </div>
        <div class="content three-line">{{ item.comment }}</div>
      </div>
    </div>
    <div class="load-more" v-if="pageInfo.start < count">
      <a class="load-more-a" @click="loadMore">点击加载更多</a>
    </div>
  </div>
</template>

<script>
import rankstar from "@/components/rankstar/rankstar.vue";
import { getMovieComments } from "@/api/movie.js";
export default {
  components: { rankstar },
  name: "movieRecomende",
  computed: {
    title: function () {
      return this.$store.state.title;
    },
  },
  created() {
  },
  methods: {
    async getDetail() {
      let queryInfo = {};
      queryInfo.mid = this.id;
      queryInfo.start = this.pageInfo.start;
      queryInfo.cnt = this.pageInfo.cnt;
      getMovieComments(queryInfo).then((res) => {
        if (res.code === 200) {
          this.detailData = res.obj.objs;
          this.count = res.obj.count;
          this.pageInfo.start += res.obj.objs.length;
        } else {
          this.$message.error(res.message);
        }
      })
    },
    async loadMore() {
      let queryInfo = {};
      queryInfo.mid = this.id;
      queryInfo.start = this.pageInfo.start;
      queryInfo.cnt = this.pageInfo.cnt;
      getMovieComments(queryInfo).then((res) => {
        if (res.code === 200) {
          this.detailData.push(...res.obj.objs);
          this.count = res.obj.count;
          this.pageInfo.start += res.obj.objs.length;
        } else {
          this.$message.error(res.message);
        }
      })
    }
  },
  data() {
    return {
      id: null,
      count: 0,
      pageInfo: {
        start: 0,
        cnt: 20,
      },
      detailData: {
        // list: [{
        //   head: '1111',
        //   name: 'abc',
        //   rating: 3,
        //   createTime: '2000-00-00 00:00:00',
        //   commnet: '11111111'
        // },
        // {
        //   head: '1111',
        //   name: 'abc',
        //   rating: 3,
        //   createTime: '2000-00-00 00:00:00',
        //   commnet: '11111111'
        // },
        // {
        //   head: '1111',
        //   name: 'abc',
        //   rating: 3,
        //   createTime: '2000-00-00 00:00:00',
        //   commnet: '11111111'
        // }],
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

.load-more {
  color: #007722;
  margin: 0 auto;
  text-align: center;
}

.load-more-a {
  cursor: pointer;
}

.load-more-a:hover {
  text-decoration: underline;
}
</style>