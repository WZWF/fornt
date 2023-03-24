<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      auto-complete="on"
    >
      <div class="login-form">
        <div class="login-form-header">
          <img
            style="width: 75px; height: 75px; float: left; padding-right: 40px"
            src="@/assets/img/logo.png"
            alt=""
          />
          <div class="login-form-text">小小电影 - 登录</div>
        </div>
        <div style="color: #91949c; font-weight: bolder">
          <el-form-item prop="username">
            <p>Username</p>
            <el-input
              ref="username"
              type="text"
              tabindex="1"
              auto-complete="on"
              class="login-form-input"
              v-model="loginForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <p>Password</p>
            <el-input
              class="login-form-input"
              placeholder="请输入密码"
              v-model="loginForm.password"
              :type="passwordType"
              ref="password"
              :key="passwordType"
              show-password
              auto-complete="on"
              @keyup.enter.native="postLogin"
            ></el-input>
          </el-form-item>
          <div style="padding-top: 10px">
            <div style="float: right">
              <el-link
                href="/forget"
                style="font-weight: bolder; font-size: 14px; color: #91949c"
                :underline="false"
              >
                忘记密码?
              </el-link>
            </div>
          </div>
          <el-button
            :loading="loading"
            @click.native.prevent="postLogin"
            class="login-form-button"
            type="primary"
            >SIGN IN</el-button
          >
        </div>
        <div class="login-form-footer">
          <el-link
            href="/register"
            style="font-weight: bolder; font-size: 16px; color: #91949c"
            :underline="false"
          >
            还没有账号？去注册
            <i
              style="font-weight: bolder; font-size: 15px"
              class="el-icon-right"
            ></i>
          </el-link>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!(value.length > 0)) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("请输入合适的密码"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    postLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch("user/login", this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false;
            })
            .catch((error) => {
              console.log(error);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.login-form {
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  letter-spacing: 2px;
}

.login-form-header {
  height: 20px;
  padding-left: 45px;
  padding-bottom: 100px;
}

.login-form-text {
  color: #000000;
  font-weight: bold;
  font-size: 30px;
  padding-top: 15px;
}

.login-form-input {
  margin-bottom: 10px;
}

.login-form-button {
  border-radius: 3px;
  width: 100%;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 2px;
  height: 60px;
  background: #5a84fd;
  box-shadow: 0 5px 30px rgb(0 66 8.5%);
  margin-top: 35px;
}

.login-form-footer {
  font-weight: bolder;
  color: #91949c;
  padding-top: 40px;
  text-align: center;
}

.el-input__inner {
  height: 48px;
}

.el-checkbox {
  color: #91949c;
  font-weight: bolder;
  font-size: 15px;
}
</style>
