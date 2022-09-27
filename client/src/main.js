import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import LazyImageLoad from "@/components/LazyImageLoad";

createApp(App)
    .directive("lazyload", LazyImageLoad)
    .use(store)
    .use(router)
    .mount("#app");
