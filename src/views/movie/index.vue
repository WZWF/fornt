<template>
  <div class="detail-container">
    <div class="left-content">
      <movieInfo />
      <movieRecomende />
      <movieComent />
    </div>
  </div>
</template>

<script>
import movieInfo from "./components/movieInfo.vue";
import movieRecomende from "./components/movieRecomende.vue";
import movieComent from "./components/movieComent.vue";
export default {
  name: "detail",
  components: {
    movieInfo,
    movieRecomende,
    movieComent,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.detail-container {
  display: flex;
  margin: 0 25%;
}

.left-content {
  width: 705px;
  margin-top: 40px;
  padding: 15px;
}
</style>