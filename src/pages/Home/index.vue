<template>
  <div class="home-page">
    <el-container>
      <el-aside width="200">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        </el-radio-group>
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          :router="true"
        >
          <el-submenu index="1">
            <!-- 侧边栏 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">学院管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/student">学员信息</el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <i
                  class="iconfont icon-shouqi"
                  @click="isCollapse = !isCollapse"
                ></i>
                图标
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">千峰管理系统</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-avatar class="tx" :size="40" fit="fit" src="#"></el-avatar>
                <span>欢迎您：</span>
                <b class="nikeName">{{ userInfo.nickname }}</b>
                <span class="quit" @click="quit">退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- 主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
.icon-shouqi {
  color: hotpink;
  font-size: 20px;
  cursor: pointer;
}
.quit {
  color: hotpink;
  cursor: pointer;
  font-size: 18px;
  margin-left: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.tx {
  vertical-align: middle;
}
</style>

<script>
import { getLoginLog } from "@/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    getLoginLog().then(res => {
      console.log(res);
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    quit() {
      //退出登入
      // 清除token和userInfo
      // 跳转登入页
      localStorage.removeItem("qf-token"),
        localStorage.removeItem("qf-userInfo"),
        this.$router.push("/login");
    }
  }
};
</script>
