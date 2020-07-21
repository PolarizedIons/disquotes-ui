import Vue from "vue";
import VueRouter, { RouteConfig, Route, NavigationGuardNext } from "vue-router";
import Index from "@/views/Index.vue";

Vue.use(VueRouter);

const beforeEnterGuard = (
  from: Route,
  to: Route,
  next: NavigationGuardNext
) => {
  setTimeout(() => {
    // (use before declare)
    // eslint-disable-next-line
    const me = (router.app as any).me;

    next(me ? undefined : "login");
  }, 0);
};

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "index",
    component: Index
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login.vue")
  },
  {
    path: "/logout",
    name: "logout",
    component: () =>
      import(/* webpackChunkName: "logout" */ "@/views/Logout.vue")
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
    beforeEnter: beforeEnterGuard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
