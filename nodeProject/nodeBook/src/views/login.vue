<template>
  <div class="login">
    <div class="inbox">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            autofocus="true"
            v-model="ruleForm.username"
            placeholder="请输入账号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            @keydown.enter.native="submitForm('ruleForm', 0)"
            v-model.number="ruleForm.password"
            placeholder="请输入密码"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm', 0)"
            >登录</el-button
          >
          <el-button @click="submitForm('ruleForm', 1)">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        password: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.$store.commit("usernameFunc", "");
  },
  methods: {
    submitForm(formName, i) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            username: this.ruleForm.username,
            password: this.ruleForm.password
          };
          let url = "/login";
          // 如果i等于0 就是登录 反则注册
          if (i === 1) url = "/register";
          this.axios
            .post(url, params)
            .then(res => {
              console.log(res);

              if (res.errcode === 0) {
                this.$message.success(res.message);
                this.$store.commit("usernameFunc", this.ruleForm.username);
                this.$store.commit("countChange", res.count);
                this.$store.commit("changeTotal", res.totalUser);
                this.$router.push({
                  path: "/books",
                  query: {
                    user: this.ruleForm.username
                  }
                });
              } else {
                this.$message.error(res.message);
                console.log(res.message);
              }
            })
            .catch(err => {
              this.$message.error("请求失败！请稍后重试！");
              console.log(err);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  .inbox {
    width: 450px;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
  .demo-ruleForm {
    width: 100%;
  }
}
</style>
