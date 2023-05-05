<template>
  <div>
    <div v-if="!loading">
      <el-skeleton :row="1" animated></el-skeleton>
    </div>
    <div class="movie-info" v-if="detailData.id">
      <h1 class="title">{{ detailData.title }}</h1>
      <div class="desc-content">
        <img class="mv-img" :src="detailData.posterURL" />
        <div class="mv-desc">
          <p>
            导演:<span class="it">{{ detailData.director }}</span>
          </p>
          <p>
            主演:
            <span
              v-for="(item, index) in actorsList.short"
              :key="index"
              class="it"
            >
              {{ item }}
              <template v-if="index != actorsList.short.length - 1">
                /
              </template>
            </span>
            <a class="more-a"
              ><span
                class="more-actors"
                @click="expand"
                v-if="actorsList.isShowMore"
                >更多...</span
              ></a
            >
          </p>
          <p>
            类型:<span class="it">{{ detailData.types.join(" / ") }}</span>
          </p>
          <p>
            语言:<span class="it">{{ detailData.language }}</span>
          </p>
          <p>
            发行日期:<span class="it">{{ detailData.issue }}</span>
          </p>
          <p>
            拍摄日期:<span class="it">{{ detailData.shoot }}</span>
          </p>
          <p>
            片长:<span class="it">{{ detailData.timelong }}(min)</span>
          </p>
        </div>
        <div class="rank-video">
          <div class="mv-rank">
            <div class="rank-title">评分</div>
            <div class="rank-score">
              <div class="score">
                <strong class="num">{{
                  detailData.score == null ? 0 : detailData.score
                }}</strong>
              </div>
              <div class="score-star">
                <rankstar :score="detailData.score * 2" class="rankstar" />
                <div class="score-comment">
                  <a href="#">{{ detailData.rateCount }}</a
                  >人评价
                </div>
              </div>
            </div>
            <div class="better-conent">
              <div v-for="item in []" class="rate-item" :key="item.index"></div>
            </div>
          </div>
          <div class="mv-video" v-if="videoList.length">
            <div class="video-title">播放链接:</div>
            <div v-for="(item, index) in shortVideoList" :key="index">
              <div class="video-item">
                <a @click="playVideo(item)">{{ item.name }}</a>
              </div>
            </div>
            <div
              class="move-video-item"
              v-if="videoList != null && videoList.length > 2"
            >
              <span class="more-video" @click="showMoreVideo">查看更多...</span>
            </div>
          </div>
        </div>
      </div>
      <div class="opera-box" @mouseleave="resetScore">
        <div>请评分：</div>
        <div class="rankstar">
          <div
            :class="['star-item', item.state]"
            v-for="(item, index) in starList.list || []"
            :key="index"
            @mouseenter="changeScore(index)"
            @click="sendScore(index)"
          ></div>
        </div>
        <div>
          <img
            src="https://img1.doubanio.com/f/shire/5bbf02b7b5ec12b23e214a580b6f9e481108488c/pics/add-review.gif"
          />
          <a href="javascript:void(0)" class="comment-link" @click="goPublish">
            写影评</a
          >
        </div>
      </div>
      <div class="intro">
        <h2 class="intro-title">{{ detailData.title }}的剧情简介· · · · ·</h2>
        <div class="intro-content">
          {{ detailData.descri ? detailData.descri : "暂无简介..." }}
        </div>
      </div>
    </div>
    <div class="video_con" v-show="videoIsShow" style="display: none">
      <video :src="videoUrl" controls="controls" ref="videoPlayer"></video>
      <div class="mask" @click="hide"></div>
    </div>
    <el-dialog
      title="更多资源"
      :visible.sync="isShowMoreVideo"
      width="20%"
      @close="closeMoreVideoList"
    >
      <div v-for="(item, index) in videoList" :key="index">
        <div class="video-item">
          <a @click="playVideo(item)">{{ item.name }}</a>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import rankstar from "@/components/rankstar/rankstar.vue";
import { getMovieDetail, getVideos } from "@/api/movie.js";
import { getMovieScoreByUid, ratingMovie } from "@/api/rating.js";
import { mapState } from "vuex";
export default {
  name: "movieInfo",
  computed: {
    ...mapState({
      user: function () {
        return this.$store.state.user;
      },
    }),
  },
  components: {
    rankstar,
  },
  methods: {
    goPublish() {
      if (this.user.token) {
        this.$router.push("/publish?id=" + this.id);
      } else {
        this.$message.error("请先登录");
        this.$router.push({
          name: "login",
          query: { redirect: this.$router.currentRoute.fullPath },
        });
      }
    },
    async getDetail(id) {
      this.loading = false;
      await getMovieDetail(id).then((res) => {
        if (res.code === 200) {
          this.detailData = res.obj;
          // 设置当前电影title
          this.$store.commit("setTitle", this.detailData.title);
          this.actorsList.orgin = this.detailData.actors;
          this.actorsList.short = this.actorsList.orgin.slice(0, 3);
          this.actorsList.isShowMore = this.actorsList.orgin.length > 3;
        } else {
          this.$message.error(res.message);
        }
      });
      this.loading = true;
    },
    //显示所有演员
    expand() {
      this.actorsList.short = this.actorsList.orgin;
      this.actorsList.isShowMore = false;
    },
    playVideo(item) {
      if (item.type == 0) {
        this.isShowMoreVideo = false;
        this.videoIsShow = true;
        this.videoUrl = item.url;
      } else if (item.type == 1) {
        this.isShowMoreVideo = false;
        window.open(item.url, "_blank");
      }
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
    hide() {
      this.$refs.videoPlayer.pause();
      this.videoUrl = null;
      this.videoIsShow = false;
    },
    sendScore(index) {
      if (this.user.token) {
        index = index + 1;
        ratingMovie(this.id, this.user.id, index).then((res) => {
          if (res.code === 200) {
            if (this.score == 0) {
              this.detailData.rateCount = this.detailData.rateCount + 1;
            }
            this.score = index;
            this.resetScore();
            this.$message.success("评分成功!");
          } else {
            this.$message.error(res.message);
          }
        });
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
        });
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
    showMoreVideo() {
      this.isShowMoreVideo = true;
    },
    closeMoreVideoList() {
      this.isShowMoreVideo = false;
    },
    async getVideo(id) {
      await getVideos(id).then((res) => {
        if (res.code === 200) {
          this.videoList = res.obj == null ? [] : res.obj;
          this.shortVideoList = this.videoList.slice(0, 2);
        } else {
          this.$message.error(res.message);
        }
      })
    }
  },
  created() {
    this.getDetail(this.id);
    this.getScore();
    this.getVideo(this.id);
  },
  data() {
    return {
      id: this.$route.params.id,
      score: 0,
      loading: false,
      detailData: {},
      isShowMoreVideo: false,
      actorsList: {
        orgin: [],
        short: [],
        isShowMore: true,
      },
      starList: {
        list: new Array(5).fill({ state: "normal" }),
      },
      videoList: [
        // {
        //   name: 111,
        //   type: 0,
        //   url: "http://124.222.196.87:9000/movie/video/2023/03/15/526795cf57884f9f85cc796e6669ccec.MP4",
        // },
        // {
        //   name: 111,
        //   type: 1,
        //   url: "http://wwww.baidu.com",
        // },
        // {
        //   name: 111,
        //   type: 1,
        //   url: "http://wwww.baidu.com",
        // },
      ],
      shortVideoList: [
        // {
        //   name: "本地播放",
        //   type: 0,
        //   url: "http://124.222.196.87:9000/movie/video/2023/03/15/526795cf57884f9f85cc796e6669ccec.MP4",
        // },
        // {
        //   name: "百度",
        //   type: 1,
        //   url: "http://wwww.baidu.com",
        // },
      ],
      videoIsShow: false,
      videoUrl: "",
    };
  },
  watch: {
    "$route.params": {
      handler(val) {
        // 根据路由参数获取用户信息并更新
        this.id = val.id;
        this.getDetail(val.id);
      },
      immediate: true, // 立即执行
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 26px;
  font-weight: bold;
  color: #494949;
}
.desc-content {
  display: flex;
  margin-top: 13px;
}
.mv-img {
  width: 135px;
  height: 200px;
}
.mv-desc {
  font-size: 13px;
  margin-left: 15px;
  max-width: 333px;
  margin-right: 15px;
}
.mv-desc p {
  margin: 2px 0;
  color: #666;
}

.mv-desc p .it {
  color: #111;
}

.rank-video {
  border-left: 1px solid #eaeaea;
  color: #9b9b9b;
}

.mv-rank {
  width: 155px;
  margin: 2px 0 0 0;
  padding: 0 0 0 15px;
}

.mv-video {
  width: 155px;
  margin: 10px 0 0 10px;
  padding: 5px 0 0 5px;
  border-top: 1px solid #eaeaea;
}

.video-item {
  text-align: center;
  margin: 10px;
  a {
    cursor: pointer;
  }
  a:hover {
    text-decoration: underline;
    color: blue;
  }
}

.rank-score {
  margin-top: 5px;
  display: flex;
}

.rank-score .num {
  color: #494949;
  padding: 0;
  font-size: 28px;
}

.score-star {
  margin-left: 10px;
  padding-top: 5px;
}

.score-star .rankstar {
  transform: scale(1.3);
  transform-origin: 0 0;
}

.score-comment {
  margin-top: 7px;
}

.rate-item {
  display: flex;
}

.more-actors {
  color: #aaa;
  cursor: pointer;
}

.more-a :hover {
  color: #fff;
  background-color: #aaa;
}

.intro-title {
  margin: 24px 0 12px 0;
  font-size: 16px;
  color: #007722;
}

.comment-link {
  font-size: 13px;
}

.opera-box .rankstar {
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

.video_con video {
  position: fixed;
  width: 800px;
  height: 546px;
  left: 50%;
  top: 50%;
  margin-top: -273px;
  transform: translateX(-50%);
  z-index: 990;
}
.video_con .mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 980;
  background-color: rgba(0, 0, 0, 0.8);
}

.more-video {
  color: #aaa;
  cursor: pointer;
}

.more-video:hover {
  color: #fff;
  background-color: #aaa;
}

.move-video-item {
  text-align: center;
  font-size: 14px;
}
</style>