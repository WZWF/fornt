<template>
  <div class="search-container">
    <h1 class="page-title">搜索：{{ $route.params.text }}</h1>
    <div class="search-result">
      <div v-if="!searchList.length">暂无搜索结果</div>
      <div
        class="item-content"
        v-for="(item, index) in searchList"
        :key="index"
      >
        <img :src="item.posterURL" class="item-img" />
        <div class="left-content">
          <router-link :to="'/movie/' + item.id" class="title"
            ><div v-html="item.name"></div>
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
          <div class="place" v-html="item.descri"></div>
        </div>
      </div>
    </div>
    <div v-if="searchList.length" class="search-page">
      <el-pagination
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
</template>

<script>
import rankstar from "@/components/rankstar/rankstar.vue";
import { getSearchResult } from "@/api/search";

export default {
  name: "search",
  components: {
    rankstar,
  },
  watch: {
    "$route.params": {
      handler(val) {
        // 根据路由参数获取用户信息并更新
        this.text = val.text;
        this.search(val.text);
      },
      immediate: true, // 立即执行
    },
  },
  data() {
    return {
      searchList: [],
      count: 0,
      text: "",
      queryInfo: {
        curPage: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    async search(text) {
      await getSearchResult(text, this.queryInfo).then((res) => {
        if (res.code === 200) {
          this.searchList = res.obj.objs == null ? [] : res.obj.objs;
          this.count = res.obj.count;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.search(this.text);
    },
    handleCurrentChange(newPage) {
      this.queryInfo.curPage = newPage;
      this.search(this.text);
    },
  },
  // created() {
  //   this.search(this.text);
  // },
};
</script>

<style lang="less" scoped>
.search-container {
  width: 65%;
  margin: 0 auto;
  margin-bottom: 35px;
}
.search-result {
  width: 100%;
}
.page-title {
  margin-top: 25px;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 30px;
  padding: 0;
  color: #494949;
}
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
  }
}
</style>