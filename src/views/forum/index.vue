<template>
  <div class="content">
    <div class="forum-head">
      <el-input class="forum-search" placeholder="提示"> </el-input>
      <el-button type="primary">发帖</el-button>
    </div>
    <div class="forum-body">
      <QuestionList v-for="(item, index) in postList" :key="index" :ietmData="item"/>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-size="queryInfo.pageSize"
        layout="prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import QuestionList from "@/components/article/QuestionList.vue";
export default {
  data() {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      count: 0,
      postList: [
        {
          id: "1",
          uid: "1",
          title: "有哪些常见却很少有人知道背后原因的生活现象?",
          type: "",
          description:
            "大明： 1. 进入一个温暖的房间，不一会儿，你便习惯了温暖，然后全身心投入学习,和工作。 而身处一个寒冷的房间里，你却始终被其困扰。你甚至难以集中注意力，不…",
          created_time: "",
          delete_flag: "",
          lookCount: 0,
        },
        {
          id: "2",
          uid: "1",
          title: "回避型依恋的人最后都怎么样了？",
          type: "",
          description:
            "cover 有故事的蔡老师： 我曾经是一个回避型依恋者，目前在我先生的引导下已经走出回避的状态，转为安全型。并且有缘的是， 本抱有对心理学感兴趣，并且本硕也刚好主修心理学课程的想法，在知乎上开始慢慢分享与“回避型依恋…",
          created_time: "",
          delete_flag: "",
          lookCount: 0,
        },
        {
          id: "3",
          uid: "1",
          title: "你觉得是上班更苦还是上学更苦?",
          type: "",
          description:
            "田林哥哥： 大家都说上班比上学更苦，但是不好意思，今天这事我得唱个反调： 对于我这种穷苦孩子来说， 上学比上班苦多了。 为啥？ 因为读书的时候没钱，也害怕找家…",
          created_time: "",
          delete_flag: "",
          lookCount: 0,
        },
        {
          id: "4",
          uid: "1",
          title: "回7k左右的前端平时工作是做什么的？",
          type: "",
          description:
            "Haru前端： 下面有很多回答，大多数回答的是一些会前端三大基础啊，html,css,JavaScript这些，然后一两个框架。实在是太笼统了，这回做…",
          created_time: "",
          delete_flag: "",
          lookCount: 0,
        },
      ],
    };
  },
  methods: {
    handleClick() {},
  },
  components: {
    QuestionList,
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.content {
  background: rgb(247, 246, 246);
  width: 80%;
  margin: 2% auto;
}
.forum-head {
  width: 100%;
  .forum-search{
    width: 200px;
  }
}
</style>
