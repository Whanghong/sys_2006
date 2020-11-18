import axios from "axios";
import router from "../router";
import ElementUI from "element-ui";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "/api" : "http://www.chst.vip";

axios.defaults.withCredentials = true; //允许请求携带认证

//创建拦截器 给每个请求都携带想要传递的内容
axios.interceptors.request.use(config => {
  if (config.url == "/users/login") {
    return config;
  } else {
    let token = localStorage.getItem("qf2006-token");
    //config就是每个请求对象
    config.headers["authorization"] = token;
    //放行
    return config;
  }
});

//响应拦截
axios.interceptors.response.use(config => {
  let { data } = config;
  if (data.code == "1004" || data.code == "10022") {
    //1004的code代表token失效,提示错误并且让页面跳转到登入页
    //10022表示session到期失效
    ElementUI.Message.error("登录信息失效,请重新登录");
    router.push("/login");
  }
  return config;
});

axios.create({
  timeout: 4000
});

export default axios;
