import { createStore } from "vuex";
import post from "./modules/post";
import article from "./modules/article";
import user from "./modules/user";

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: { post, article, user },
});
