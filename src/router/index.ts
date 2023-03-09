import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

// @ts-ignore
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../components/HelloWorld.vue"),
  },
  {
    path: "/article",
    name: "article",
    component: () => import("../views/BlogHome/article.vue"),
  },
  {
    path: "/tag",
    name: "tag",
    component: () => import("../views/BlogHome/tags.vue"),
  },
  {
    path: "/articleTag",
    name: "articleTag",
    component: () => import("../views/BlogHome/articleTag.vue"),
  },
  {
    path: "/backstage/login",
    name: "backstage",
    component: () => import("../views/backstage/login.vue"),
  },
  {
    path: "/backstage/home",
    name: "backstage_home",
    component: () => import("../views/backstage/home.vue"),
    children: [
      {
        path: "/backstage/User_setting",
        name: "个人信息管理",
        component: () => import("../views/backstage/UserSetting.vue"),
      },
      {
        path: "/backstage/article_setting",
        name: "文章管理",
        component: () => import("../views/backstage/article_setting.vue"),
      },
      {
        path: "/backstage/Publish_article",
        name: "文章发布",
        component: () => import("../views/backstage/Publish_article.vue"),
      },
      {
        path: "/backstage/File_setting",
        name: "文件管理",
        component: () => import("../views/backstage/File_setting.vue"),
      },
    ],
  },
  {
    path: "/m_home",
    name: "m_home",
    component: () => import("../components/m_home.vue"),
  },
  {
    path: "/m_article",
    name: "m_article",
    component: () => import("../views/Mobile/m_article.vue"),
  },
  {
    path: "/m_tags",
    name: "m_tags",
    component: () => import("../views/Mobile/m_tags.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, form, next) => {
  let token = localStorage.token;
  if (to.path == "/backstage" || to.path == "/backstage/") {
    next({ path: "/backstage/login" });
  }
  if (token) {
    if (to.path == "/backstage" || to.path == "/backstage/login") {
      next({ path: "/backstage/home" });
    }
  }
  next();
});

export default router;
