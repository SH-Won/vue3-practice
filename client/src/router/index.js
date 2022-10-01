import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import MainView from "../views/MainView";

const routes = [
    {
        path: "/",
        name: "home",
        component: MainView,
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/ArticleView.vue"),
    },
    {
        path: "/search",
        name: "search",
        component: () => import("../views/SearchFilterView.vue"),
    },
    {
        path: "/ui",
        name: "ui",
        component: () => import("../views/UserInterfaceView"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
