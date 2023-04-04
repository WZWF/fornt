<template>
  <div>
    <div class="container-body" style="width: 60%" v-if="articleInfo">
      <div
        class="detail-container"
        :style="{ width: this.global.bodyWidth - 300 + 'px' }"
      >
        <div class="article-detail">
          <div class="title">
            <span class="tag tag-no-audit" v-if="articleInfo.status == 0"
              >待审核</span
            >
            {{ articleInfo.title }}
          </div>
          <!--用户信息-->
          <div class="user-info">
            <div class="avatar">
              <el-image
                class="avatar-img"
                :src="articleInfo.userImg"
              ></el-image>
            </div>
            <div class="user-info-detail">
              <router-link
                class="nick-name a-link"
                :to="`/user/${articleInfo.uid}`"
                >{{ articleInfo.username }}</router-link
              >
              <div class="time-info">
                <span>{{ articleInfo.createTime }}</span>
                <span class="iconfont icon-eye-solid">
                  {{
                    articleInfo.readCount == 0 ? "阅读" : articleInfo.readCount
                  }}
                </span>
                <router-link
                  v-if="articleInfo.uid == user.uid"
                  :to="`/editPost/${articleInfo.articleId}`"
                  class="a-link btn-edit"
                >
                  <span class="iconfont icon-edit">编辑</span>
                </router-link>
              </div>
            </div>
          </div>
          <!--文章详情-->
          <div class="detail" id="detail" v-html="articleInfo.content"></div>
        </div>
        <!--相关电影-->
        <div class="attachment-panel" id="view-attachment" v-if="articleInfo.mid">
          <!-- <div class="title">附件</div>
        <div class="attachment-info">
          <div class="iconfont icon-zip item"></div>
          <div class="file-name item">xxx</div>
          <div class="size item">
            xxx
          </div>
          <div class="item">
            需要<span class="integral">xxx</span
            >积分
          </div>
          <div class="download-count item">
            已下载xxx次
          </div>
          <div class="download-btn item">
            <el-button
              type="primary"
              size="small"
              
              >下载</el-button
            >
          </div>
        </div> -->
          <div class="title">相关电影</div>
          <div class="item-content">
            <img :src="movieData.posterURL" class="item-img" />
            <div class="left-content">
              <router-link :to="'/movie/' + movieData.id" class="title"
                ><div>{{ movieData.name }}</div>
              </router-link>
              <div class="rank-content">
                <rankstar
                  :score="movieData.score == null ? 0 : movieData.score * 2"
                  class="rank-star"
                ></rankstar>
                <div class="score-text">
                  {{ movieData.score == null ? 0 : movieData.score.toFixed(1) }}
                </div>
              </div>
              <div class="place" style="margin-top: 5px">
                {{ movieData.descri }}
              </div>
            </div>
          </div>
        </div>
        <!--评论-->
        <div
          class="comment-panel"
          id="view-comment"
          v-if="articleInfo.status == 1"
        >
          <commentList
            v-if="articleInfo.id"
            :articleId="articleInfo.id"
            :articleUserId="articleInfo.uid"
            @updateCommentCount="updateCommentCount"
          ></commentList>
        </div>
      </div>
    </div>
    <!--左侧快捷操作-->
    <div class="quick-panel" style="left: 10%">
      <!--点赞-->
      <el-badge
        :value="articleInfo.likeCount"
        type="info"
        :hidden="!articleInfo.likeCount > 0"
      >
        <div class="quick-item" @click="doLikeHandler">
          <span
            :class="['iconfont icon-good', hasLike ? 'have-like' : '']"
          ></span>
        </div>
      </el-badge>
      <!--评论-->
      <el-badge
        :value="articleInfo.commentCount"
        type="info"
        :hidden="!articleInfo.commentCount > 0"
      >
        <div
          class="quick-item"
          @click="goToPostion('view-comment')"
        >
          <span class="iconfont icon-comment"></span>
        </div>
      </el-badge>
      <!--附件-->
      <!-- <div class="quick-item" @click="goToPostion('view-attachment')">
          <span class="iconfont icon-attachment"></span>
        </div> -->
      <!--图片预览-->
      <!-- <ImageViewer
          ref="imageViewerRef"
          :imageList="previewImgList"
        ></ImageViewer> -->
    </div>
  </div>
</template>

<script>
import rankstar from "@/components/rankstar/rankstar.vue";
import commentList from "./components/commentList.vue";
import { getArticleDetail, getUserLike, likeArticle } from "@/api/forum";
import { getArticleMovieInfo } from "@/api/movie";
import { mapState } from "vuex";

export default {
  name: "articleDetail",
  components: {
    rankstar,
    commentList,
  },
  data() {
    return {
      movieData: {
        // posterURL:
        //   "http://124.222.196.87:9000/movie/movie_photo/images/113938/poster.jpg",
        // id: 1,
        // name: "Nixon by Nixon: In His Own Words (2014)",
        // score: 4,
        // descri:
        //   "From 1971 to 1973, Richard Nixon secretly recorded his private conversations in the White House. This film chronicles the content of those tapes, which include Nixon's conversations on the war in Vietnam, the Pentagon Papers leak, his Supreme Court appointments, and more--while also exposing shocking statements he made about women, people of color, Jews,and the media.",
      },
      articleInfo: {
        // status: 0,
        // commentCount: 1111,
        // likeCount: 1111,
        // content:
        //   "12345687987468545641351568496849685" +
        //   '<img style="width:80px; height:80px; display:block" class="avatar-img" src="http://124.222.196.87:9000/movie/movie_photo/images/1/poster.jpg">',
        // id: "111",
        // uid: "111",
        // readCount: 1111,
        // createTime: "2000-01-01 00:00:00",
        // username: "abc",
        // title: "标题",
        // status: 1,
        // userImg:
        //   "http://124.222.196.87:9000/movie/movie_photo/images/1/poster.jpg",
      },
      hasLike: false,
      id: null,
      commentCount: 0,
      //quickPanelLeft: (window.innerWidth - this.global.bodyWidth) / 2 - 110,
    };
  },
  watch: {
    "$route.params": {
      handler(val) {
        // 根据路由参数获取用户信息并更新
        this.id = val.id;
        this.getDetail(val.id);
      },
      immediate: true, // 立即执行
    },
  },
  methods: {
    doLikeHandler() {
      if (this.user.id) {
        if (this.hasLike) {
          this.$message.error("您已经点过赞了");
        } else {
          likeArticle(this.id, this.user.id, this.articleInfo.uid).then((res) => {
            if (res.code === 200) {
              this.articleInfo.likeCount = Number(this.articleInfo.likeCount) + 1;
              this.hasLike = true;
              this.$message.success("点赞成功");
            } else {
              this.$message.error(res.message);
            }
          })
        }
      } else {
        this.$router.push({
          name: "login",
          query: { redirect: this.$router.currentRoute.fullPath },
        });
      }
    },
    goToPostion(id){
      document.querySelector("#" + id).scrollIntoView();
    },
    previewImgList() {},
    updateCommentCount(commentCount) {
      this.commentCount = commentCount;
    },
    async getDetail(id) {
      await getArticleDetail(id).then((res) => {
        if (res.code === 200) {
          this.articleInfo = res.obj == null ? {} : res.obj;
        } else {
          this.$message.error(res.message)
        }
      });
      if (this.articleInfo !== null && this.articleInfo !== undefined) {
        if (
          this.articleInfo.mid !== null &&
          this.articleInfo.mid !== undefined
        ) {
          getArticleMovieInfo(this.articleInfo.mid).then((res) => {
            if (res.code === 200) {
              this.movieData = res.obj == null ? {} : res.obj;
            } else {
              this.$message.error(res.message)
            }
          });
        }
        if (this.user.id)
          getUserLike(this.articleInfo.id, this.user.id).then((res) => {
            if (res.code === 200) {
              this.hasLike = res.obj == null ? false : res.obj;
            }
          });
      }
    },
  },
  computed: {
    ...mapState({
      user: function () {
        return this.$store.state.user;
      },
    }),
  },
};
</script>

<style lang="less" scoped>
.container-body {
  position: relative;
  margin: 12px auto;
  .detail-container {
    .article-detail {
      background: #fff;
      padding: 15px;
      .avatar {
        display: flex;
        cursor: pointer;
        background: #f0f0f0;
        align-items: center;
        overflow: hidden;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        .avatar-img {
          width: 30px;
          height: 30px;
          border-radius: 15px;
        }
      }
      .title {
        font-weight: bolder;
        .tag {
          font-size: 12px;
          border-radius: 3px;
          padding: 0px 5px;
          margin-right: 5px;
          font-weight: normal;
        }

        .tag-no-audit {
          color: #61666d;
          border: 1px solid #61666d;
        }
      }
      .user-info {
        margin-top: 15px;
        display: flex;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        .user-info-detail {
          margin-left: 10px;
          .nick-name {
            text-decoration: none;
            color: #4e5969;
            font-size: 15px;
          }
          .nick-name:hover {
            color: #007fff;
          }
          .time-info {
            margin-top: 5px;
            font-size: 13px;
            color: #4e5969;
            .iconfont {
              margin-left: 10px;
            }
            .iconfont::before {
              padding-right: 3px;
            }
            .btn-edit {
              .iconfont {
                font-size: 14px;
              }
            }
          }
        }
      }
      .detail {
        letter-spacing: 1px;
        line-height: 22px;
        a {
          text-decoration: none;
          color: #007fff;
        }
        img {
          max-width: 90%;
          cursor: pointer;
        }
      }
    }

    .attachment-panel {
      margin-top: 20px;
      background: #fff;
      padding: 20px;
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
      .title {
        font-size: 18px;
      }
      .attachment-info {
        display: flex;
        align-items: center;
        color: #9f9f9f;
        margin-top: 10px;
        .item {
          margin-right: 10px;
        }
        .icon-zip {
          font-size: 20px;
          color: #6ca1f7;
        }
        .file-name {
          color: #6ca1f7;
        }
        .integral {
          color: red;
          padding: 0px 5px;
        }
      }
    }
    .comment-panel {
      margin-top: 20px;
      background: #fff;
      padding: 20px;
    }
  }
}
.quick-panel {
  position: fixed;
  width: 50px;
  top: 200px;
  text-align: center;
  .is-fixed {
    top: 10px;
    right: 15px;
  }
  .quick-item {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: #e0e0e0;
    margin-bottom: 30px;
    cursor: pointer;
    .iconfont {
      font-size: 22px;
      color: #61666d;
    }
    .have-like {
      color: blue;
    }
  }
}
</style>