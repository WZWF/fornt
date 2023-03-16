<template>
  <div>
    <h3 style="letter-spacing: 1px; font-weight: 400; padding-bottom: 20px">
      基本设置
    </h3>

    <div>
      <el-form
        style="width: 350px; float: left"
        label-position="top"
        ref="form"
        :model="user"
        label-width="80px"
      >
        <el-form-item style="padding: 0" label="用户名">
          <el-input v-model="user.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="user.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生年月">
          <el-col>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="user.birthday"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item style="padding: 0" label="邮箱">
          <el-input type="email" v-model="user.email" disabled></el-input>
          <el-link v-if="user.status == 2" @click="activationEmail"
            >邮箱未激活！点击激活邮箱！</el-link
          >
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input :rows="5" type="textarea" v-model="user.info"></el-input>
        </el-form-item>
        <el-form-item style="padding: 0" label="上次登录时间">
          <el-input
            type="text"
            v-model="user.lastLoginTime"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item style="padding-top: 20px">
          <el-button type="primary" @click="updateInfo">更新基本信息</el-button>
          <el-button type="primary" @click="showResetPass">修改密码</el-button>
          <el-button type="primary" @click="showResetEmail">修改邮箱</el-button>
        </el-form-item>
      </el-form>
      <div>
        <img
          style="
            padding-bottom: 10px;
            padding-left: 150px;
            width: 150px;
            height: 150px;
          "
          alt=""
          :src="user.head"
        />
        <el-upload
          style="padding-left: 500px; letter-spacing: 1px"
          class="upload-demo"
          accept=".png,.jpg"
          :headers="header"
          :action="uploadAction"
          :on-success="handleUploadSuccess"
          :limit="1"
        >
          <el-button style="width: 150px" size="small" type="primary">
            <i class="el-icon-upload2"></i> 点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </div>
      <!-- 修改密码的对话框 -->
      <el-dialog
        title="修改密码"
        :visible.sync="resetPassDialogVisible"
        width="50%"
        @close="resetPassDialogClosed"
      >
        <!-- 修改密码的表单 -->
        <el-form
          ref="resetPassForm"
          :model="resetPassForm"
          :rules="resetPassFormRules"
          label-width="100px"
        >
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input
              type="password"
              v-model="resetPassForm.oldPassword"
              style="width: 80%"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              type="password"
              v-model="resetPassForm.newPassword"
              style="width: 80%"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              type="password"
              v-model="resetPassForm.confirmPassword"
              style="width: 80%"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetPassDialogClosed">取 消</el-button>
          <el-button type="primary" @click="resetPass">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改邮箱对话框 -->
      <el-dialog
        title="修改邮箱"
        :visible.sync="resetEmailDialogVisible"
        width="50%"
        @close="resetEmailDialogClosed"
      >
        <!-- 修改密码的表单 -->
        <el-form
          ref="resetPassForm"
          :model="reseEmailForm"
          :rules="reseEmailFormRules"
          label-width="100px"
        >
          <el-form-item label="新邮箱" prop="email">
            <el-input
              type="text"
              v-model="reseEmailForm.email"
              style="width: 80%"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetEmailDialogClosed">取 消</el-button>
          <el-button type="primary" @click="resetEmail">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { findById, updateUser, updateEmail, updatePass, sendActivationEmail } from "@/api/user";
import config from "@/config";
import { getId } from "@/utils/auth";
import { getToken } from "@/utils/auth";
import header from "@/components/layout/Header";

export default {
  data() {
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
    let validatePsw = (rule, value, callback) => {
      if (value !== this.resetPassForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      header: {
        Authentication: getToken(),
      },
      uploadAction: config.API_URL + "/upload/changeHead",
      user: {
        id: "",
        username: "",
        email: "",
        birthday: "",
        gender: "",
        info: "",
        head: "",
        lastLoginTime: "",
        status: "",
      },
      resetPassDialogVisible: false,
      resetEmailDialogVisible: false,
      resetPassForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      reseEmailForm: {
        email: "",
      },
      resetPassFormRules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePsw, trigger: "blur" },
        ],
      },
      reseEmailFormRules: {
        email: [{ required: true, trigger: "blur", validator: validateEmail }],
      },
    };
  },

  mounted() {
    if (getId() !== null) {
      findById(getId()).then((res) => {
        const { obj } = res;
        console.log(obj)
        this.user = obj;
      });
    }
  },

  methods: {
    updateInfo() {
      updateUser(this.user).then((res) => {
        if (res.code !== 200) {
          this.$message.error(res.message);
        } else {
          this.$message.success("更新信息成功");
          console.log(res.obj)
          this.user = res.obj;
        }
      });
    },
    async showResetPass() {
      // 再展示对话框
      this.resetPassDialogVisible = true;
    },
    async showResetEmail() {
      this.resetEmailDialogVisible = true;
    },
    // 监听添加分类对话框的关闭事件，重置表单数据
    resetPassDialogClosed() {
      this.$refs.resetPassForm.resetFields();
      this.resetPassDialogVisible = false;
    },
    // 监听添加分类对话框的关闭事件，重置表单数据
    resetEmailDialogClosed() {
      this.$refs.resetPassForm.resetFields();
      this.resetEmailDialogVisible = false;
    },

    resetEmail() {
      this.$refs.reseEmailForm.validate(async (valid) => {
        if (!valid) {
          return 0;
        } else {
          await updateEmail(this.reseEmailForm).then((res) => {
            if (res.code === 200) {
              this.$message.success("修改成功！");
              this.email = this.reseEmailForm.email;
              this.resetPassDialogVisible = false;
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    resetPass() {
      this.$refs.resetPassForm.validate(async (valid) => {
        if (!valid) {
          return 0;
        } else {
          await updatePass(this.resetPassForm).then((res) => {
            if (res.code === 200) {
              this.$message.success("修改成功！");
              this.resetPassDialogVisible = false;
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },

    activationEmail() {
      sendActivationEmail().then((res) => {
        if (res.code !== 200) {
          this.$message.error(res.message);
        } else {
          this.$message.success("激活邮件已发送，请注意查收！");
        }
      });
    },

    handleUploadSuccess(res) {
      if (res.code === 200) {
        this.user.head = res.obj;
        header.methods.setHead();
        this.$store.dispatch("user/setHead", res.obj);
        this.$message({
          type: "success",
          message: "头像上传成功!",
        });
      } else {
        this.$message({
          type: "error",
          message: res.message,
        });
      }
    },
  },
};
</script>

<style scoped>
.el-form--label-top .el-form-item__label {
  padding: 0;
}

.el-form-item {
  margin-bottom: 5px;
}
</style>