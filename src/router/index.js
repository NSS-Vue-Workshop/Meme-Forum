import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Feed from "../views/Feed.vue";
import Details from "../views/Details.vue";
import { auth } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/create",
    name: "Create",
    component: () =>
      import(/* webpackChunkName: "userPages" */ "../views/Create.vue"),
    beforeEnter: (to, from, next) => {
      if (!auth.currentUser) {
        return next({
          path: "/",
          query: { unauthorized: true }
        });
      }
      return next();
    }
  },
  {
    path: "/meme/:memeId",
    name: "Details",
    component: Details
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed
  },
  {
    path: "/my-memes",
    name: "MyMemes",
    component: () =>
      import(/* webpackChunkName: "userPages" */ "../views/MyMemes.vue"),
    beforeEnter: (to, from, next) => {
      if (!auth.currentUser) {
        return next("/");
      }
      return next();
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
