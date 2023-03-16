<template>
  <div class="mv-item" @click="goDetail">
    <img class="top-img" :src="itemData.posterURL" />
    <div class="title one-line">{{ itemData.title }}</div>
    <div class="score" v-if="itemData.score">
      <div class="score-content">
        <rankstar :score="itemData.score * 2" />
        <span class="score-text">{{ itemData.score.toFixed(1) }}</span>
      </div>
    </div>
    <div v-else class="no-score">暂无评分</div>
  </div>
</template>

<script>
import rankstar from "@/components/rankstar/rankstar.vue";

export default {
  name: "movieItem",
  components: {
    rankstar,
  },
  props: {
    itemData: {
      type: Object,
    },
  },
  methods:{
    goDetail() {
      this.$router.push({
        path:'/movie/' + this.itemData.id
      });
    },
  },
};
</script>

<style scoped lang="less">

.mv-item {
  margin-left: 10px;
  margin-right: 10px;
  width: 125px;
  display: inline-block;
  margin-bottom: 10px;
  cursor: pointer;
}
.top-img {
  display: block;
  width: 115px;
  height: 161px;
  background-color: #ccc;
  margin: 0 auto;
}

.title {
  text-align: center;
  color: #333;
  width: 100px;
  margin: 0 auto;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.score-content {
  display: flex;
  width: 77px;
  margin: 0 auto;
  margin-top: 5px;
}

.score-text {
  color: #e09015;
  font-size: 12px;
  margin-left: 6px;
  margin-top: -3px;
}

.no-score {
  margin-top: 2px;
  text-align: center;
}
</style>