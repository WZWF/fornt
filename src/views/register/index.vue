<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="registerForm"
      :rules="registerFormRules"
      auto-complete="on"
    >
      <div class="login-form">
        <div class="login-form-header">
          <img
            style="width: 75px; height: 75px; float: left; padding-right: 40px"
            src="@/assets/img/logo.png"
            alt=""
          />
          <div class="login-form-text">荐影 - 注册</div>
        </div>
        <div style="color: #91949c; font-weight: bolder">
          <el-form-item hidden label="ID" prop="id">
            <el-input v-model="registerForm.id"></el-input>
          </el-form-item>
          <el-form-item prop="username">
            <p>Username</p>
            <el-input
              class="login-form-input"
              type="text"
              v-model="registerForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <p>Password</p>
            <el-input
              class="login-form-input"
              placeholder="请输入密码"
              :type="passwordType"
              :key="passwordType"
              ref="password"
              v-model="registerForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPassword">
            <p>Check Password</p>
            <el-input
              class="login-form-input"
              placeholder="请确认密码"
              v-model="registerForm.checkPassword"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <p>Email</p>
            <el-input
              class="login-form-input"
              placeholder="请输入邮箱"
              v-model="registerForm.email"
            ></el-input>
          </el-form-item>
          <el-form-item prop="birthday">
            <p>Birthday</p>
            <el-date-picker
              v-model="registerForm.birthday"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="info">
            <p>Info</p>
            <el-input
              type="textarea"
              class="login-form-input"
              placeholder="请输入简介"
              v-model="registerForm.info"
            ></el-input>
          </el-form-item>
          <el-form-item prop="gender">
            <p>Gender</p>
            <el-radio v-model="registerForm.gender" label="1">男</el-radio>
            <el-radio v-model="registerForm.gender" label="0">女</el-radio>
          </el-form-item>
          <el-form-item prop="types">
            <p>Like Type</p>
            <el-checkbox
              v-model="registerForm.types"
              v-for="item in category"
              :label="item.id"
              :key="item.id"
              >{{ item.typeName }}
            </el-checkbox>
          </el-form-item>

          <div style="padding-top: 10px">
            <el-checkbox v-model="agree"
              >我已同意"荐影"用户注册协议!</el-checkbox
            >
          </div>
          <el-button @click="postLogin" class="login-form-button" type="primary"
            >SIGN UP</el-button
          >
        </div>
        <div class="login-form-footer">
          <el-link
            href="/login"
            style="font-weight: bolder; font-size: 16px; color: #91949c"
            :underline="false"
          >
            我有账号 去登录
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
import { register, findByName } from "@/api/user";
import { getId, getCategory } from "@/api/common";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!(value.length > 0)) {
        callback(new Error("请输入用户名"));
      } else {
        new Promise(() => {
          findByName({ username: value }).then((resp) => {
            if (resp.code !== 200) {
              callback(new Error(resp.message));
            } else {
              callback();
            }
          });
        });
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("请输入合适的密码"));
      } else {
        callback();
      }
    };
    const validateCheckPassword = (rule, value, callback) => {
      if (value == "" || value !== this.registerForm.password) {
        callback(new Error("请与密码一致"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请正确填写邮箱"));
      } else {
        if (value !== "") {
          var reg =
            /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(value)) {
            callback(new Error("请输入有效的邮箱"));
          }
        }
        callback();
      }
    };
    return {
      registerForm: {
        id: "",
        username: "",
        password: "",
        checkPassword: "",
        email: "",
        birthday: "",
        info: "",
        gender: "",
        types: [],
      },
      category: [],
      agree: false,
      registerFormRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        checkPassword: [
          { required: true, trigger: "blur", validator: validateCheckPassword },
        ],
        email: [{ required: true, trigger: "blur", validator: validateEmail }],
        birthday: [{ required: true }],
        info: [{ required: true }],
        gender: [{ required: true }],
        types: [{ required: true }],
      },
      passwordType: "password",
    };
  },
  methods: {
    getId() {
      new Promise(() => {
        getId().then((resp) => {
          const { obj } = resp;
          this.registerForm.id = obj;
        });
      });
    },
    getCategory() {
      new Promise(() => {
        getCategory().then((resp) => {
          const { obj } = resp;
          this.category = obj;
        });
      });
    },
    postLogin() {
      if (this.agree === false) {
        this.$message({
          message: '请勾选 我已同意"荐影"用户注册协议!',
          type: "warning",
        });
        return;
      }
      console.log(this.registerForm);
      register(this.registerForm).then((resp) => {
        if (resp.code === 200) {
          this.$router.push("/login");
        } else {
          this.$message({
            message: '注册失败',
            type: "warning",
          });
        }
      });
    },
  },
  created() {
    this.getId(), this.getCategory();
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
  margin: auto;
  /*position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -25%);*/
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
