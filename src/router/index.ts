import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// @ts-ignore
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName:'HelloWorld' */ "../components/HelloWorld.vue"
      ),
  },
  {
    path: "/article",
    name: "article",
    component: () =>
      import(
        /* webpackPrefetch: true */ /* webpackChunkName:'article' */ "../views/BlogHome/article.vue"
      ),
  },
  {
    path: "/tag",
    name: "tag",
    component: () =>
      import(
        /* webpackPrefetch: true */ "../views/BlogHome/tags.vue" /* webpackChunkName:'tags' */
      ),
  },
  {
    path: "/articleTag",
    name: "articleTag",
    component: () =>
      import(
        /* webpackPrefetch: true */ "../views/BlogHome/articleTag.vue" /* webpackChunkName:'articleTag' */
      ),
  },
  {
    path: "/backstage/login",
    name: "backstage",
    component: () =>
      import(
        /* webpackPrefetch: true */ "../views/backstage/login.vue" /* webpackChunkName:'login' */
      ),
  },
  {
    path: "/404",
    name: "notDent",
    component: () =>
      import(
        /* webpackPrefetch: true */ "../components/404.vue" /* webpackChunkName:'404' */
      ),
  },

  {
    path: "/backstage",
    name: "backstage_home",
    component: () =>
      import(
        /* webpackPrefetch: true */ "../views/backstage/home.vue" /* webpackChunkName:'home' */
      ),
    redirect: "/backstage/article_setting",
    children: [
      {
        path: "/backstage/User_setting",
        name: "个人信息管理",
        component: () =>
          import(
            /* webpackPrefetch: true */ "../views/backstage/UserSetting.vue" /* webpackChunkName:'UserSetting' */
          ),
      },
      {
        path: "/backstage/article_setting",
        name: "文章管理",
        component: () =>
          import(
            /* webpackPrefetch: true */ "../views/backstage/article_setting.vue" /* webpackChunkName:'article_setting' */
          ),
      },
      {
        path: "/backstage/Publish_article",
        name: "文章发布",
        component: () =>
          import(
            /* webpackPrefetch: true */ "../views/backstage/Publish_article.vue" /* webpackChunkName:'Publish_article' */
          ),
      },
      {
        path: "/backstage/File_setting",
        name: "文件管理",
        component: () =>
          import(
            /* webpackPrefetch: true */ "../views/backstage/File_setting.vue" /* webpackChunkName:'File_setting' */
          ),
      },
      {
        path: "/backstage/tag_setting",
        name: "主页设置",
        component: () =>
          import(
            /* webpackPrefetch: true */ "../views/backstage/tag_setting.vue" /* webpackChunkName:'tag_setting' */
          ),
      },
    ],
  },
  {
    path: "/m_home",
    name: "m_home",
    component: () =>
      import(
        /* webpackPrefetch: true */ "../components/m_home.vue" /* webpackChunkName:'m_home' */
      ),
  },
  {
    path: "/m_article",
    name: "m_article",
    component: () =>
      import(
        /* webpackPrefetch: true */ "../views/Mobile/m_article.vue" /* webpackChunkName:'m_article' */
      ),
  },
  {
    path: "/m_tags",
    name: "m_tags",
    component: () =>
      import(
        /* webpackPrefetch: true */ "../views/Mobile/m_tags.vue" /* webpackChunkName:'m_tags' */
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, form, next) => {
  let token = localStorage.token;
  if (token) {
    if (to.path == "/backstage" || to.path == "/backstage/login") {
      next({ path: "/backstage" });
    }
  }
  if (token === "") {
    next({ path: "/backstage/login" });
  }
  next();
});

export default router;
