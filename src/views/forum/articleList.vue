<template>
  <div class="container-body" :style="{ width: this.global.bodyWidth + 'px' }">
    <div class="article-panel">
      <div class="top-tab">
        <div
          :class="['tab', queryInfo.orderType == 0 ? 'active' : '']"
          @click="changeOrderType(0)"
        >
          最多阅读
        </div>
        <el-divider direction="vertical"></el-divider>
        <div
          :class="['tab', queryInfo.orderType == 1 ? 'active' : '']"
          @click="changeOrderType(1)"
        >
          最多点赞
        </div>
        <el-divider direction="vertical"></el-divider>
        <div
          :class="['tab', queryInfo.orderType == 2 ? 'active' : '']"
          @click="changeOrderType(2)"
        >
          最新发布
        </div>
      </div>
      <div class="article-list">
        <dataList
          :data="articleList"
          :queryInfo="queryInfo"
          :count="count"
          :loading="loading"
          @loadData="fetchData"
        >
        </dataList>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleList } from "@/api/forum";
import articleItem from "./components/articleItem";
import dataList from "./components/dataList";

export default {
  components: {
    articleItem,
    dataList,
  },
  data() {
    return {
      articleList: [
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
      count: 0,
      queryInfo: {
        curPage: 1,
        pageSize: 15,
        orderType: 0
      },
      loading: false,
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      getArticleList(this.queryInfo).then((res) => {
        if (res.code === 200) {
          this.articleList = res.obj.objs == null ? [] : res.obj.objs;
          this.count = res.obj.count;
        } else {
          this.$message.error(res.message);
        }
      });
      this.loading = false;
    },
    changeOrderType(type) {
      this.queryInfo.orderType = type;
      this.fetchData()
    },
  },
  created() {
    this.fetchData()
  }
};
</script>

<style lang="less" scoped>
.container-body {
  margin: 10px auto;
  background: #eee;
  padding-top: 5px;
  .article-panel {
    background: #fff;
    .top-tab {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      font-size: 15px;
      border-bottom: 1px solid #ddd;
      .tab {
        cursor: pointer;
      }
      .active {
        color: #007fff;
      }
    }
  }
}
</style>