import { createRouter, createWebHistory } from "vue-router";

import axios from "axios";
axios.defaults.baseURL = "https://backendwebsekolah.rizaags.my.id/api";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/Index.vue"),
  },
  {
    path: "/post",
    name: "post",
    component: () => import("../views/post/Index.vue"),
  },
  {
    path: "/tag/:slug",
    name: "detail_tag",
    component: () => import("../views/tag/Show.vue"),
  },
  {
    path: "/category/:slug",
    name: "detail_category",
    component: () => import("../views/category/Show.vue"),
  },
  {
    path: "/event",
    name: "event",
    component: () => import("../views/event/Index.vue"),
  },
  {
    path: "/event/:slug",
    name: "detail_event",
    component: () => import("../views/event/Show.vue"),
  },
  {
    path: "/photo",
    name: "photo",
    component: () => import("../views/photo/Index.vue"),
  },
  {
    path: "/video",
    name: "video",
    component: () => import("../views/video/Index.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/contact/Index.vue"),
  },
  {
    path: "/:slug",
    name: "detail_post",
    component: () => import("../views/post/Show.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
