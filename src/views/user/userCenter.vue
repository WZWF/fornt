<template>
  <div class="container">
    <div class="user-info">
      <el-card class="base-info">
        <div class="avatar">
          <el-image class="avatar-img" :src="userInfo.head"></el-image>
        </div>
        <div class="username">
          <span>{{ userInfo.name }}</span>
          <span
            v-if="userInfo.gender == 0"
            class="gender-iconfont iconfont icon-woman"
          ></span>
          <span
            v-if="userInfo.gender == 1"
            class="gender-iconfont iconfont icon-man"
          ></span>
        </div>
        <div class="desc">
          <span>
            {{ userInfo.desc }}
          </span>
        </div>
      </el-card>
      <el-card class="expend-info">
        <div class="info-item">
          <div class="item-left el-icon-star-off">评分数</div>
          <div class="value">{{ userInfo.rankCount }}</div>
        </div>
        <div class="info-item">
          <div class="item-left el-icon-edit">发帖数</div>
          <div class="value">{{ userInfo.postCount }}</div>
        </div>
        <div class="info-item">
          <div class="item-left iconfont icon-like">获赞数</div>
          <div class="value">{{ userInfo.likeCount }}</div>
        </div>
        <div class="info-item">
          <div class="item-left iconfont icon-register">注册时间</div>
          <div class="value">{{ userInfo.createTime }}</div>
        </div>
      </el-card>
    </div>

    <el-card class="view">
      <div>
        <el-tabs v-model="activeTabName" @tab-click="changeTab">
          <el-tab-pane label="评分" name="0"></el-tab-pane>
          <el-tab-pane label="影评" name="5"></el-tab-pane>
          <el-tab-pane label="发帖" name="1"></el-tab-pane>
          <el-tab-pane label="评论" name="2"></el-tab-pane>
          <el-tab-pane label="点赞" name="3"></el-tab-pane>
          <el-tab-pane label="评分分布" name="4"></el-tab-pane>
        </el-tabs>
        <div class="view-list">
          <div
            v-if="
              activeTabName == 0 && !loading && data != null && data.length == 0
            "
          >
            <div class="no-data">
              <div class="iconfont icon-empty"></div>
              <div class="msg">暂无数据</div>
            </div>
          </div>
          <div class="movie-list" v-if="activeTabName == 0">
            <div class="movie-item">
              <div
                class="item-content"
                v-for="(item, index) in data"
                :key="index"
              >
                <img :src="item.posterURL" class="item-img" />
                <div class="left-content">
                  <router-link :to="'/movie/' + item.id" class="title"
                    ><div>
                      <div class="name">
                        {{ item.name }}
                      </div>
                      <span style="color: #aeaeae; font-size: 13px">
                        &nbsp;&nbsp;({{ item.createTime }})</span
                      >
                    </div>
                  </router-link>
                  <div class="rank-content">
                    <rankstar
                      :score="item.score == null ? 0 : item.score * 2"
                      class="rank-star"
                    ></rankstar>
                    <div class="score-text">
                      {{ item.score == null ? 0 : item.score.toFixed(1) }}
                    </div>
                  </div>
                  <div class="place">{{ item.descri }}</div>
                </div>
              </div>
            </div>
            <div v-if="data.length" class="search-page">
              <el-pagination
                :hide-on-single-page="true"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.curPage"
                :page-size="queryInfo.pageSize"
                layout="total, prev, pager, next"
                :total="count"
              >
              </el-pagination>
            </div>
          </div>
          <div class="movie-list" v-if="activeTabName == 5">
            <div class="movie-comment-item">
              <div
                class="item-content"
                v-for="(item, index) in data"
                :key="index"
              >
                <movieCommentItem :data="item"></movieCommentItem>
              </div>
            </div>
            <div v-if="data.length" class="search-page">
              <el-pagination
                :hide-on-single-page="true"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.curPage"
                :page-size="queryInfo.pageSize"
                layout="total, prev, pager, next"
                :total="count"
              >
              </el-pagination>
            </div>
          </div>
          <div
            class="forum-list"
            v-if="
              activeTabName != 0 && activeTabName != 4 && activeTabName != 5
            "
          >
            <dataList
              :data="data"
              :queryInfo="queryInfo"
              :count="count"
              :loading="loading"
              @loadData="changeTab"
            >
            </dataList>
          </div>
          <div class="rating-graph" v-if="activeTabName == 4">
            <ratingGraph
              :option="option"
              :width="'80%'"
              :height="'400px'"
            ></ratingGraph>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import rankstar from "@/components/rankstar/rankstar.vue";
import dataList from "@/views/forum/components/dataList";
import ratingGraph from "./components/ratingGraph";
import movieCommentItem from "./components/movieCommentItem";
import {
  getUserCenterInfo,
  getUserRatingMovie,
  getRelatedArticles,
  getUserMovieComment
} from "@/api/user.js";
import { getDistribution } from "@/api/rating.js";
export default {
  name: "userCenter",
  components: {
    rankstar,
    ratingGraph,
    dataList,
    movieCommentItem,
  },
  data() {
    return {
      id: "",
      activeTabName: 0,
      userInfo: {
        // head: "http://124.222.196.87:9000/movie/user_image/2023/03/09/943b4d64ee2c4e31970de66f0292db0a.png",
        // name: "abc",
        // gender: 1,
        // desc: "123abc",
        // rankCount: 111,
        // postCount: 111,
        // likeCount: 111,
        // createTime: "2000-00-00",
      },
      option: {
        xAxis: {
          data: ["1", "2", "3", "4", "5"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            // data: [120, 200, 150, 200, 100],
            data: [0, 0, 0, 0, 0],
            type: "bar",
          },
        ],
      },
      loading: false,
      data: [
        // {
        //   id: 113938,
        //   name: "Nixon by Nixon: In His Own Words (2014)",
        //   posterURL:
        //     "http://124.222.196.87:9000/movie/movie_photo/images/113938/poster.jpg",
        //   score: 3.5,
        //   descri: "From 1971 to 1973, Richard Nixon secretly recorded ",
        //   createTime: "2000-00-00 00:00:00",
        // },
        // {
        //   userImg:
        //     "http://124.222.196.87:9000/movie/movie_photo/images/1/poster.jpg",
        //   title: "123456",
        //   createTime: "2000-01-01 00:00:00",
        //   summary:
        //     "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
        //   username: "abc",
        //   readCount: 0,
        //   goodCount: 0,
        //   commentCount: 0,
        //   cover:
        //     "http://124.222.196.87:9000/movie/movie_photo/images/1/poster.jpg",
        // },
      ],
      queryInfo: {
        curPage: 1,
        pageSize: 15,
      },
      count: 0,
    };
  },
  methods: {
    setData(res) {
      this.data = [];
      this.count = 0;
      if (res.code === 200) {
        this.data = res.obj.objs == null ? [] : res.obj.objs;
        this.count = res.obj.count;
      } else {
        this.$message.error(res.message);
      }
    },
    changeTab(tab, event) {
      if (this.activeTabName == 0) {
        getUserRatingMovie(this.id, this.queryInfo).then((res) => {
          this.setData(res);
        });
      } else if (this.activeTabName == 4) {
        getDistribution(this.id).then((res) => {
          if (res.code === 200) {
            this.option.series[0].data = res.obj == null ? [] : res.obj;
          }
        });
      } else if (this.activeTabName == 5) {
        getUserMovieComment(this.id, this.queryInfo).then((res) => {
          this.setData(res);
        });
      } else {
        getRelatedArticles(this.id, this.queryInfo, this.activeTabName).then(
          (res) => {
            this.setData(res);
          }
        );
      }
    },
    userCenterInfo(id) {
      getUserCenterInfo(id).then((res) => {
        if (res.code === 200) {
          this.userInfo = res.obj == null ? {} : res.obj;
        }
      });
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.changeTab(null, null);
    },
    handleCurrentChange(newPage) {
      this.queryInfo.curPage = newPage;
      this.changeTab(null, null);
    },
  },
  watch: {
    "$route.params": {
      handler(val) {
        // 根据路由参数获取用户信息并更新
        this.id = val.id;
        this.userCenterInfo(val.id);
        this.changeTab(null, null);
      },
      immediate: true, // 立即执行
    },
  },
};
</script>

<style scoped lang="less">
.container {
  width: 80%;
  margin: 5% auto;
  .user-info {
    float: left;
    width: 25%;
    margin-right: 15px;
    .avatar {
      margin: 0 auto;
      display: flex;
      cursor: pointer;
      background: #f0f0f0;
      align-items: center;
      overflow: hidden;
      width: 90px;
      height: 90px;
      border-radius: 45px;
      .avatar-img {
        width: 90px;
        height: 90px;
        border-radius: 45px;
      }
    }
    .username {
      text-align: center;
    }
    .desc {
      margin-top: 5px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 10px;
    }
    .expend-info {
      margin-top: 15px;
      .info-item {
        display: flex;
        justify-content: space-between;
        line-height: 30px;
        .item-left {
          align-self: center;
          vertical-align: middle;
        }
        .item-left::before {
          padding-right: 5px;
          vertical-align: middle;
        }
        .value {
          font-size: 13px;
        }
      }
    }
    margin-bottom: 15px;
  }
  .view {
    width: 70%;
    margin-left: 15px;
    .movie-item {
      width: 100%;
      .item-content {
        display: flex;
        padding: 10px;
        width: 100%;
        overflow: hidden;
        flex-wrap: wrap;
        .item-img {
          width: 48px;
          height: 69px;
          margin-right: 15px;
        }
        .title {
          .name {
            float: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 400px;
          }
          font-size: 14px;
        }
        .rank-content {
          display: flex;
        }
        .rank-star {
          margin-top: 3px;
          margin-right: 3px;
        }
        .score-text {
          color: #e09015;
        }

        .place {
          position: absolute;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 60%;
          max-width: 600px;
        }
      }
    }
    .rating-graph {
      width: 100%;
      height: 400px;
    }
  }
}
.gender-iconfont {
  color: blue;
  margin-left: 5px;
}

.no-data {
  text-align: center;
  padding: 10px 0px;
  .icon-empty {
    font-size: 50px;
    color: #bbb;
  }
  .msg {
    margin-top: 10px;
    color: #909399;
    font-size: 14px;
  }
}
.movie-list {
  margin: 0 0 20px 0px;
}
</style>