<template>
  <div class="publish-container">
    <div class="page-title">写评论</div>
    <div class="movie-info" v-if="movieData.title">
      <img class="info-img" :src="movieData.posterURL" />
      <div class="right-info">
        <div class="title">{{ movieData.title }}</div>
        <div class="desc">
          {{ movieData.language }}
          {{ movieData.types.join(" / ") }}
          {{ movieData.score == null ? 0 : movieData.score }}分 {{ movieData.rateCount }}人
        </div>
      </div>
    </div>
    <div class="score-add">
      <div>给个评价吧：</div>
      <div class="rankstar"
      @mouseleave="resetScore"
      >
        <div
          :class="['star-item', item.state]"
          v-for="(item, index) in starList.list || []"
          :key="index"
          @click="sendScore(index)"
          @mouseenter="changeScore(index)"
        ></div>
      </div>
    </div>
    <div class="text-input">
      <textarea
        id="commentInput"
        placeholder="写评论..."
        v-model="content"
      ></textarea>
    </div>
    <div id="submitBtn" @click="submit">提交</div>
  </div>
</template>

<script>
import { getMovieDetail, postComment } from "@/api/movie.js";
import { getToken } from "@/utils/auth.js";
import { getId } from "@/api/common.js";
import { getMovieScoreByUid, ratingMovie } from "@/api/rating.js";
import { mapState } from "vuex";
export default {
  name: "publish",
  data() {
    return {
      content: "",
      movieData: {},
      starList: {
        list: new Array(5).fill({ state: "normal" }),
      },
      commentForm: {
        id: "",
        uid: "",
        mid: "",
        comment: ""
      },
      score: 0,
    };
  },
  computed: {
    id: function () {
      return this.$route.query.id;
    },
    ...mapState({
      user: function () {
        return this.$store.state.user;
      },
    }),
  },
  mounted() {
    this.init();
  },
  created() {
    if (getToken() === undefined || getToken() === null) {
      this.$router.push("/");
    }
  },
  methods: {
    async init() {
      await getMovieDetail(this.id).then((res) => {
        if (res.code === 200) {
          this.movieData = res.obj;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    changeScore(index) {
      let list = [];
      this.starList.list.forEach((item, _index) => {
        if (_index <= index) {
          item.state = "full";
        } else {
          item.state = "normal";
        }
        list.push({ ...item });
      });
      this.starList.list = list;
    },
    sendScore(index) {
      if (this.user.token) {
        index = index + 1;
        ratingMovie(this.id, this.user.id, index).then((res) => {
          if (res.code === 200) {
            this.score = index;
            this.resetScore();
          } else {
            this.$message.error(res.message);
          }
        })
      } else {
        this.$message.error("请先登录");
        this.$router.push({
          name: "login",
          query: { redirect: this.$router.currentRoute.fullPath },
        });
      }
      
    },
    async getScore() {
      if (this.user.token) {
        getMovieScoreByUid(this.id, this.user.id).then((res) => {
          if (res.code === 200) {
            this.score = res.obj;
            this.resetScore();
          } else {
            this.$message.error(res.message);
          }
        })
      }
    },
    resetScore() {
      let list = [];
      let index = this.score - 1;
      this.starList.list.forEach((item, _index) => {
        if (_index <= index) {
          item.state = "full";
        } else {
          item.state = "normal";
        }
        list.push({ ...item });
      });
      this.starList.list = list;
    },
    submit() {
      this.commentForm.comment = this.content;
      postComment(this.commentForm).then((res) => {
        if (res.code === 200) {
          this.$message.success("发布影评成功");
          this.$router.push({path: 'movie/' + this.id});
        } else {
          this.$message.error(res.message);
        }
      })
    },
    async initForm() {
      getId().then((res) => {
        if (res.code === 200) {
          this.commentForm.id = res.obj;
        } else {
          this.$message.error("未知错误！请刷新后重试！")
        }
      })
      this.commentForm.uid = this.user.id;
      this.commentForm.mid = this.id;
    },
  },
  created() {
    if (this.user.id === null || this.user.id === undefined || this.user.id === "") {
      this.$router.push({
          name: "login",
          query: { redirect: this.$router.currentRoute.fullPath },
        });
    }
    this.initForm();
    this.getScore();
  }
};
</script>

<style lang="less" scoped>
.publish-container {
  width: 500px;
  margin: 0 auto;
  margin-top: 25px;
}

.page-title {
  font-size: 14px;
  margin-top: 5px;
  color: #007722;
}

.movie-info {
  display: flex;
  width: 590px;
  height: 70px;
  margin: 0 auto;
  margin-top: 10px;
  background-color: #f8f8f8;
  overflow: hidden;
}

.info-img {
  width: 48px;
  height: 70px;
  margin-right: 15px;
}

.right-info {
  padding: 10px 40px 0 0;
  margin-bottom: 5px;
  .title {
    color: #37a;
    font-size: 14px;
    line-height: 1.4;
  }
  .desc {
    margin-top: 2px;
    color: #999;
  }
}

.rankstar {
  display: flex;
  align-items: center;
}

.star-item {
  width: 16px;
  height: 16px;
  background-size: cover;
  cursor: pointer;
  &.normal {
    background-image: url("./img/star.png");
  }
  &.full {
    background-image: url("./img/star-fill.png");
  }
}

.score-add {
  margin-top: 30px;
  display: flex;
}

.text-input {
  margin-top: 20px;
}

#commentInput {
  outline: none;
  border: none;
  border-top: 1px solid #ddd;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  padding: 16px 10px;
  width: 100%;
  min-height: 400px;
  overflow: auto;
  font-size: 14px;
}

#submitBtn {
  padding: 2px 20px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  background-color: #3db04d;
  width: 28px;
  cursor: pointer;
  font-size: 14px;
}
</style>