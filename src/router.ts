import Vue from "vue";
import VueRouter, { RouteConfig, Route, NavigationGuardNext } from "vue-router";
import Index from "@/views/Index.vue";
import { meModule } from "@/store";

Vue.use(VueRouter);

const beforeEnterGuard = (
  from: Route,
  to: Route,
  next: NavigationGuardNext
) => {
  setTimeout(() => {
    next(meModule.me ? undefined : "logout");
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
    path: "/guilds",
    name: "guilds",
    component: () =>
      import(/* webpackChunkName: "guilds" */ "@/views/GuildsList.vue"),
    beforeEnter: beforeEnterGuard
  },
  {
    path: "/moderation-queue/:guildId?",
    name: "moderation-queue",
    component: () =>
      import(/* webpackChunkName: "guilds" */ "@/views/ModerationDashboard.vue"),
    beforeEnter: beforeEnterGuard
  },
  {
    path: "/quotes/:guildId",
    name: "guild-dashboard",
    component: () =>
      import(/* webpackChunkName: "guild-dashboard" */ "@/views/GuildDashboard.vue"),
    beforeEnter: beforeEnterGuard
  },
  {
    path: "/quotes/:guildId/new",
    name: "new-quote",
    component: () =>
      import(/* webpackChunkName: "new-quote" */ "@/views/NewQuote.vue"),
    beforeEnter: beforeEnterGuard
  },
  {
    path: "/quotes/:guildId/:quoteId",
    name: "view-quote",
    component: () =>
      import(/* webpackChunkName: "guild-dashboard" */ "@/views/ViewQuote.vue"),
    beforeEnter: beforeEnterGuard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
