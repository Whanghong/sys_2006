import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/style/base.css";
import "@/assets/style/el-reset.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//引入iconfont
import "./assets/iconfont/iconfont.css";
Vue.use(ElementUI);
//按需引入
// import { Carousel, CarouselItem } from "element-ui";
//注册到全局
// Vue.component("el-carousel", Carousel);
// Vue.component("el-carousel-item", CarouselItem);
// Vue.config.productionTip = false;

//路由前置钩子(导航守卫)
router.beforeEach((to, from, next) => {
  //用户登录之后localstorage中有token
  let token = localStorage.getItem("qf2006-token");
  if (token) {
    //如果是注册页面或者是登录页面直接放行
    next();
  } else {
    console.log(to);
    if (to.path === "/login") {
      next();
    } else {
      //访问的不是登录页跳转登录页
      next({ path: "/login" });
    }
  }
});

import "./utils/recursionRoutes";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
