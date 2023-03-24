<template>
  <div class="main-container">
    <online id="online" />
    <offline id="offline" />
    <hot id="hot" />
    <ratingMore id="ratingMore" />
    <newMovie id="newMovie" />
    <div class="annchor-point">
      <div class="point-item">
        <a href="#online"><img src="@/assets/icons/svg/online.png" class="icon" /></a>
      </div>
      <div class="point-item">
        <a href="#offline"><img src="@/assets/icons/svg/offline.png" class="icon" /></a>
      </div>
      <div class="point-item">
        <a href="#hot"><img src="@/assets/icons/svg/hot.png" class="icon" /></a>
      </div>
      <div class="point-item">
        <a href="#ratingMore"><img src="@/assets/icons/svg/ratingMore.png" class="icon" /></a>
      </div>
      <div class="point-item">
        <a href="#newMovie"><img src="@/assets/icons/svg/newMovie.png" class="icon" /></a>
      </div>
    </div>
  </div>
</template>

<script>
import online from "./components/online.vue";
import offline from "./components/offline.vue";
import hot from "./components/hot.vue";
import ratingMore from "./components/ratingMore.vue";
import newMovie from "./components/newMovie.vue";

export default {
  name: "recomend",
  components: {
    online,
    offline,
    hot,
    ratingMore,
    newMovie,
  },
  created() {
    console.log(this.$store.state.user);
  }
};
</script>

<style scoped lang="less">
.main-container {
  display: flex;
  margin: 20px auto;
  width: 80%;
  flex-wrap: wrap;
}

.annchor-point {
  background-color: white;
  position: fixed;
  top: 20%;
  right: 10%;
  .point-item {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: #eee;
    margin-bottom: 15px;
    cursor: pointer;
    a {
      color: #000;
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>