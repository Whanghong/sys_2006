<template>
  <div class="login">
    <div class="right">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <h1 class="biaoti">千锋管理系统</h1>
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            class="s_btn"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <video
      muted
      src="../../assets/video/bg.mp4"
      autoplay
      loop
      preload="auto"
    ></video>
  </div>
</template>

<script>
import { login } from "@/api";
import { mapMutations } from "vuex";
export default {
  // 登入逻辑
  // 收集用户输入的信息
  // 登入成功将后端返回的token存到本地
  // 每次请求的时候携带token到请求头authorization
  // 展示正确token校验的数据
  // 校验不通过跳转到登录页
  data() {
    //jsDoc
    /**
     * @param {Object} rule 就是一个表单验证对象
     * @param {String} value 输入值
     * @param {Function} callback  校验通过不传参  通过传参
     */

    var validateUsername = (rule, value, callback) => {
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!value) {
        callback("4到6位(字母，数字，下划线，减号)");
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      // console.log(this.$refs[formName])
      this.$refs[formName].validate(valid => {
        if (valid) {
          //代表本地校验通过
          //打开登入加载动画
          const loading = this.$loading({
            lock: true,
            text: "正在登入",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          // console.log(this.loginForm.username, this.loginForm.password);
          let { username, password } = this.loginForm;
          login(username, password)
            .then(res => {
              console.log(res);
              //服务器响应关闭loading
              setTimeout(() => {
                loading.close();
              }, 2000);
              if (res.data.state) {
                //用户名正确
                localStorage.setItem("qf2006-token", res.data.token);
                localStorage.setItem(
                  "qf-userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                //更改vuex中state['userInfo']的值
                this.SET_USERINFO(res.data.userInfo);
                //跳转页面
                this.$router.push("/");
              } else {
                //用户名或者密码错误
                this.$message.error("用户名或密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
/*表单样式*/
.el-form {
  width: 400px;
}

.s_btn {
  width: 255px;
  background: linear-gradient(90deg, #1596fb, #002dff);
}

.biaoti {
  color: white;
  font-size: 35px;
  text-align: center;
  margin-top: -20px;
  margin-right: -50px;
  padding-bottom: 40px;
}
.login {
  width: 100%;
  height: 100%;
}

.demo-loginForm {
  position: absolute;
  z-index: 1;
  margin-top: 25vh;
  margin-left: 65vw;
  width: 355px;
  height: 390px;
  padding-top: 100px;
  padding-right: 75px;
  background-color: rgba(59, 52, 52, 0.3);
  border-radius: 14px;
}

html,
body {
  height: 100%;
  position: relative;
}
video {
  position: absolute;
  right: 0;
  top: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
}
</style>
