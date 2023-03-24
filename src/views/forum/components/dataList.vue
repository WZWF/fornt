<template>
  <div>
    <div
    v-if="!loading && data != null && data.length == 0"
  >
  <div class="no-data">
    <div class="iconfont icon-empty"></div>
    <div class="msg">暂无文章</div>
  </div>
  </div>
  <div class="skeleton" v-if="loading">
    <el-skeleton :row="2" animated></el-skeleton>
  </div>
    <div v-for="(item, index) in data" :key="index">
      <articleItem :data="item"/>
    </div>
    <div class="pagination">
      <el-pagination
        :hide-on-single-page="true"
        background
        :total="count"
        :current-page.sync="queryInfo.curPage"
        layout="prev, pager, next"
        @current-change="handlePageNoChange"
        style="text-align: left"
        :page-size="queryInfo.pageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import articleItem from "./articleItem";

export default {
  name: "dataList",
  components:{
    articleItem,
  },
  props: {
    data: {
      type: Array,
    },
    count: {
      type: Number,
    },
    queryInfo: {
      type: Object,
    },
    loading: {
      type: Boolean
    }
  },
  methods: {
    handlePageNoChange(newPage) {
      this.queryInfo.curPage = newPage;
      this.$emit("loadData");
    }
  },
  data() {
    return {};
  },
  created() {
  }
};
</script>

<style lang="less">
.pagination {
  padding: 10px 0px 10px 10px;
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
</style>