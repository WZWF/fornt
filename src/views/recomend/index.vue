<template>
  <div class="main-container">
    <online />
    <offline />
    <hot />
    <ratingMore />
    <newMovie />
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
};
</script>

<style scoped lang="less">
.main-container {
  display: flex;
  margin: 20px auto;
  width: 80%;
  flex-wrap: wrap;
}

</style>