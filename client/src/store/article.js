import * as ArticleAPI from "@/service/article";

const state = () => ({
    articles: [],
    articleSize: 0,
});

const getters = {};
const mutations = {
    setArticles(state, payload) {
        const { articles, articleSize } = payload;
        state.articles = [...state.articles, ...articles];
        state.articleSize = articleSize;
    },
};
const actions = {
    getArticles: async ({ state, commit }, params) => {
        try {
            const response = await ArticleAPI.getArticles(params);
            const { posts, postSize } = response;
            const payload = {
                articles: posts,
                articleSize: postSize,
            };
            commit("setArticles", payload);
        } catch (e) {
            throw new Error("무언가 잘못 됐습니다");
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
