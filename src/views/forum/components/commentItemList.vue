<template>
  <div>
    <div v-if="!loading && data != null && data.length == 0">
      <div class="no-data">
        <div class="iconfont icon-empty"></div>
        <div class="msg">暂无评论</div>
      </div>
    </div>
    <div class="skeleton" v-if="loading">
      <el-skeleton :row="2" animated></el-skeleton>
    </div>
    <div v-for="(item, index) in data" :key="index">
      <commentItem ref="item"
        :articleId="articleId"
        :commentData="item"
        :articleUserId="articleUserId"
        :currentUserId="currentUserInfo.userId"
        @hiddenAllReply="hiddenAllReplyHandler"
      ></commentItem>
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
import commentItem from "./commentItem.vue";
export default {
  name: "commentItemList",
  components: {
    commentItem,
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
      type: Boolean,
    },
    currentUserInfo: {
      type: Object,
    },
    articleUserId:{
        type: String,
    },
    articleId:{
        type: String,
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handlePageNoChange(newPage) {
      this.queryInfo.curPage = newPage;
      this.$emit("loadData");
    },
    hiddenAllReplyHandler(){
      this.data.forEach((element, index) => {
        //let child = ('item'+index);
        this.$refs.item[index].update();
        element.showReply = false;
      })
      //
    },
  },
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