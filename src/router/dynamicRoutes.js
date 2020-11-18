const dynamicRoutes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: []
  },
  {
    path: "*",
    component: () => import(/**webPackChunkName:"page404" */ "../pages/Page404")
  }
];
