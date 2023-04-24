<template>
  <div class="header">
    <div style="height: 70px; width: 100%">
      <div class="header-logo">
        <img
          style="width: 50px; height: 50px; float: left"
          src="../../assets/img/logo.png"
          alt=""
        />
        <div class="title">荐影</div>
        <div class="header-logo-text"></div>
      </div>
      <div class="header-links">
        <router-link to="/" class="header-link" :underline="false"
          >首页</router-link
        >
        <router-link to="/movies" class="header-link" :underline="false"
          >电影</router-link
        >
        <router-link to="/recomend" class="header-link" :underline="false"
          >推荐</router-link
        >
        <router-link to="/forum" class="header-link" :underline="false"
          >论坛</router-link
        >
      </div>

      <div class="header-search">
        <el-input
          prefix-icon="el-icon-search"
          id="inp"
          placeholder="搜索电影"
          v-model.trim="searchText"
          @keyup.enter.native="goSearch"
        />
      </div>

      <div
        v-if="!isLogin"
        @click="toLogin"
        style="float: right; padding-top: 23px; padding-right: 50px"
        class="header-link"
      >
        登录
      </div>
      <el-dropdown v-if="isLogin" style="float: right; padding-right: 10px">
        <el-button type="text">
          <div class="header-name">
            {{ this.user.username }}
            <i class="el-icon-caret-bottom"></i>
          </div>
          <img
            alt=""
            style="width: 45px; height: 45px; border-radius: 50%"
            :src="user.head"
          />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link
              :underline="false"
              :to="{ path: center }"
              style="padding-right: 7px"
            >
              <i
                style="font-size: 15px; padding-right: 3px"
                class="el-icon-user-solid"
              ></i
              >个人中心
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link
              :underline="false"
              to="/me/setting"
              style="padding-right: 7px"
            >
              <i
                style="font-size: 15px; padding-right: 3px"
                class="el-icon-setting"
              ></i
              >个人设置
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-button type="text" @click="handleLogout" :underline="false">
              <i
                style="font-size: 15px; padding-right: 3px"
                class="el-icon-switch-button"
              ></i
              >退出登录
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { getInfo } from "@/api/user";

export default {
  name: "Header",
  data() {
    return {
      isLogin: false,
      searchList: [],
      searchText: "",
      state: "",
      timeout: null,
      user: {
        username: "",
      },
      center: "",
    };
  },

  created() {
    this.init();
  },

  watch: {
    "$route.params": {
      handler(val) {
        this.searchText = val.text;
      },
      immediate: true,
    },
  },
  methods: {
    toLogin() {
      this.$router.push({
        name: "login",
        query: { redirect: this.$router.currentRoute.fullPath },
      });
    },
    init() {
      if (window.localStorage.getItem("ID") !== null) {
        getInfo(window.localStorage.getItem("ID")).then((res) => {
          if (res.code === 200) {
            this.isLogin = true;
            this.user = res.obj;
            this.center = "/user/" + res.obj.id;
          } else {
            this.isLogin = false;
            this.user = {};
          }
        });
      }
    },

    setHead() {
      this.init();
    },

    goSearch() {
      this.$router.push("/search/" + this.searchText);
    },
    async handleLogout() {
      await this.$store.dispatch("user/logout");
      //this.$router.push({ path: "/login" });
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      // getInfo(window.localStorage.getItem("ID")).then((res) => {
      //   if (res.code === 200) {
      //     this.isLogin = true;
      //     this.user = res.obj;
      //   } else {
      //     this.isLogin = false;
      //     this.user = {};
      //   }
      // });
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 70px;
  background: #ffffff;
  // box-shadow: 0 2px 12px 0 rgb(0 0 0/10%);
  border: 1px solid #ebeef5;
}

.title {
  float: left;
  font-size: 30px;
  padding-top: 8px;
  font-family: 华文行楷;
}

.header-logo {
  padding-top: 10px;
  padding-left: 10%;
  float: left;
  letter-spacing: 2px;
}

.header-logo-text {
  font-size: 30px;
  padding-top: 3px;
  font-weight: bolder;
  padding-left: 15px;
  float: left;
}

.header-search {
  float: left;
  width: 300px;
  border-radius: 20px;
  padding-top: 16px;
}

.header-links {
  float: left;
  padding-left: 5px;
  padding-top: 23px;
}

.header-link {
  letter-spacing: 2px;
  font-size: 17px;
  padding-right: 40px;
  cursor: pointer;
}

.header-name {
  color: #000000;
  float: right;
  padding-top: 15px;
  padding-left: 15px;
  font-weight: bolder;
  font-size: 15px;
  letter-spacing: 2px;
}

.search-btn {
  width: 35px;
  height: 32px;
  background-image: url("./imgs/nav_mv_bg.png");
  background-position: -40px 35px;
  border-radius: 3px;
  margin-top: 2px;
  cursor: pointer;
}

.nav-search {
  float: left;
  margin-left: -15px;
  height: 32px;
  padding-top: 20px;
  align-self: center;
  background-image: url("./imgs/nav_mv_bg.png");
  border-radius: 3px;
  background-color: #fff;
  display: flex;
  #inp {
    width: 460px;
    height: 28px;
    outline: none;
    background-color: #fff;
    border: 1px solid #aeaeae;
    -webkit-appearance: none;
    margin-top: 2px;
    text-indent: 11px;
  }
}
.search-content {
  width: 300px;
  height: 200px;
  background-color: pink;
  z-index: 10;
  position: relative;
  top: -15px;
}
</style>
