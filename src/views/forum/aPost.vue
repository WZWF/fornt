<template>
  <div>
    <div class="top-container">
      <div @click="returnLast" class="return">
        <span class="el-icon-arrow-left">返回</span>
      </div>
      <div class="publish">
        <button
          data-v-70c12ddb=""
          type="button"
          class="el-button el-button--primary el-button--mini"
          style="margin-left: 10px"
        >
          <span> 发布 </span>
        </button>
      </div>
    </div>
    <div class="createPost-main-container">
      <el-form
        ref="postForm"
        :model="postForm"
        :rules="rules"
        class="form-container"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 20px" prop="title">
              <MDinput
                v-model="postForm.title"
                :maxlength="100"
                name="name"
                required
              >
                标题
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          style="margin-bottom: 20px"
          label-width="90px"
          id="mid"
          label="相关电影:"
          prop="mid"
        >
          <el-autocomplete
            v-model="postForm.mid"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入选择相关电影"
            @select="handleSelect"
            class="related-movies"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 10px"
          label-width="90px"
          id="summary"
          prop="summary"
        >
          <label class="label-text" slot="label"
            >摘&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要:</label
          >
          <el-input
            v-model="postForm.summary"
            :rows="1"
            type="textarea"
            class="article-textarea"
            autosize
            placeholder="请输入摘要"
            maxlength="200"
          />
          <span v-show="contentShortLength" class="word-counter"
            >{{ contentShortLength }}/200</span
          >
          <!-- <span v-show="!contentShortLength" class="word-counter"
            >{{ contentShortLength }}/200</span
          > -->
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 30px">
          <editorHtml
            ref="editor"
            :modelValue="postForm.content"
            :height="400"
          />
        </el-form-item>

        <el-form-item prop="cover" style="margin-bottom: 30px">
          <el-upload
          accept=".png,.jpg"
            :multiple="false"
            :show-file-list="false"
            :headers="header"
            :on-success="handleImageSuccess"
            class="image-uploader"
            drag
            :action="uploadAction"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将文件拖到此处上传封面，或<em>点击上传</em>
            </div>
          </el-upload>
          <div class="image-preview">
            <div
              v-show="postForm.cover.length > 1"
              class="image-preview-wrapper"
            >
              <img :src="postForm.cover" />
              <div class="image-preview-action">
                <i class="el-icon-delete" @click="rmImage" />
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import MDinput from "@/components/MDinput";
import { mapState } from "vuex";
import { getToken } from "@/utils/auth";
import config from "@/config";
import { getMovieListByName } from "@/api/search";
import { rmImg } from "@/api/upload";

// const defaultForm = {
//   status: "draft",
//   title: "", // 文章题目
//   content: "", // 文章内容
//   content_short: "", // 文章摘要
//   source_uri: "", // 文章外链
//   image_uri: "", // 文章图片
//   display_time: undefined, // 前台展示时间
//   id: undefined,
//   platforms: ["a-platform"],
//   comment_disabled: false,
//   importance: 0,
// };

export default {
  name: "aPost",
  components: { MDinput },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error",
        });
        callback(new Error(rule.field + "为必传项"));
      } else {
        callback();
      }
    };
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback();
        } else {
          this.$message({
            message: "外链url填写不正确",
            type: "error",
          });
          callback(new Error("外链url填写不正确"));
        }
      } else {
        callback();
      }
    };
    return {
      header: {
        Authentication: getToken(),
      },
      uploadAction: config.API_URL + "/upload/uploadImage",
      //postForm: Object.assign({}, defaultForm),
      postForm: {
        id: null,
        title: "",
        mid: null,
        movieList: [],
        uid: this.user != null ? this.user.id : null,
        username: this.user != null ? this.user.name : null,
        cover: "",
        content: "",
        summary: "",
      },
      loading: false,
      dataObj: null,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: "blur" }],
      },
      tempRoute: {},
    };
  },
  computed: {
    contentShortLength() {
      return this.postForm.summary == null ? 0 : this.postForm.summary.length;
    },
    ...mapState({
      user: function () {
        console.log(111);
        console.log(this.$store.getters);
        return this.$store.state.user;
      },
    }),
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return +new Date(this.postForm.display_time);
      },
      set(val) {
        this.postForm.display_time = new Date(val);
      },
    },
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(id);
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route);
  },
  methods: {
    querySearchAsync(name, cb) {
      if (name != null && name.length > 0) {
        getMovieListByName(name).then((res) => {
          setTimeout(() => {
            if (res.code === 200) {
              this.movieList = res.obj;
              cb(this.loadMovieList());
            } else {
              this.$message.error(res.message);
              cb();
            }
          }, 600);
        });
      }
    },
    loadMovieList() {
      let arr = new Array(0);
      for (let i = 0; i < this.movieList.length; i++) {
        arr.push({
          id: this.movieList[i].id,
          value: this.movieList[i].name,
        });
      }
      return arr;
    },
    rmImage() {
      rmImg({imagePath : this.postForm.cover}).then((res) => {
        if (res.code === 200) {
          this.postForm.cover = '';
        } else {
          this.$message.error(res.message);
        }
      })
    },
    handleSelect(item) {
      this.postForm.mid = item.id;
    },
    handleImageSuccess(res) {
      if (res.code === 200) {
        this.postForm.cover = res.obj;
      } else {
        this.$message.error(res.message);
      }
    },
    fetchData(id) {
      fetchArticle(id)
        .then((response) => {
          this.postForm = response.data;

          // just for test
          this.postForm.title += `   Article Id:${this.postForm.id}`;
          this.postForm.content_short += `   Article Id:${this.postForm.id}`;

          // set tagsview title
          this.setTagsViewTitle();

          // set page title
          this.setPageTitle();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setTagsViewTitle() {
      const title = "Edit Article";
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.postForm.id}`,
      });
      this.$store.dispatch("tagsView/updateVisitedView", route);
    },
    setPageTitle() {
      const title = "Edit Article";
      document.title = `${title} - ${this.postForm.id}`;
    },
    submitForm() {
      console.log(this.postForm);
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$notify({
            title: "成功",
            message: "发布文章成功",
            type: "success",
            duration: 2000,
          });
          this.postForm.status = "published";
          this.loading = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // draftForm() {
    //   if (
    //     this.postForm.content.length === 0 ||
    //     this.postForm.title.length === 0
    //   ) {
    //     this.$message({
    //       message: "请填写必要的标题和内容",
    //       type: "warning",
    //     });
    //     return;
    //   }
    //   this.$message({
    //     message: "保存成功",
    //     type: "success",
    //     showClose: true,
    //     duration: 1000,
    //   });
    //   this.postForm.status = "draft";
    // },
    getRemoteUserList(query) {
      searchUser(query).then((response) => {
        if (!response.data.items) return;
        this.userListOptions = response.data.items.map((v) => v.name);
      });
    },
    returnLast() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less">
.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

#summary {
  .el-form-item__label {
    font-size: 18px;
    margin-top: 3px;
  }
}

#mid {
  .el-form-item__label {
    font-size: 18px;
  }
}

.related-movies {
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  text-indent: 0px;
  .el-input__inner {
    border: 0px;
  }
}

.top-container {
  margin-top: 15px;
  width: 100%;
  height: 30px;
  display: flex;
  //background-color: pink;
  border-bottom: 1px solid #e0e0e0;
  .return {
    font-size: 18px;
    color: #b0adad;
    cursor: pointer;
  }
  .publish {
    position: absolute;
    right: 20px;
  }
}

.image-uploader {
  width: 35%;
  float: left;
}

.image-preview {
  width: 200px;
  height: 200px;
  position: relative;
  border: 1px dashed #d9d9d9;
  float: left;
  margin-left: 50px;
  .image-preview-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .image-preview-action {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    cursor: pointer;
    text-align: center;
    line-height: 200px;
    .el-icon-delete {
      font-size: 36px;
    }
  }
  &:hover {
    .image-preview-action {
      opacity: 1;
    }
  }
}
</style>