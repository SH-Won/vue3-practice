import * as ArticleAPI from "@/service/article";

const state = () => ({
    articles: [],
    articleSize: 0,
    hasMore: true,
    loading: true,
});

const getters = {};
const mutations = {
    setArticles(state, payload) {
        const { articles, articleSize, hasMore } = payload;
        state.articles = [...state.articles, ...articles];
        state.articleSize = articleSize;
        state.hasMore = hasMore;
    },
    setLoading(state, payload) {
        state.loading = payload;
    },
};
const actions = {
    getArticles: async ({ state, commit }, params) => {
        commit("setLoading", true);
        try {
            const response = await ArticleAPI.getArticles(params);
            const { posts, postSize } = response;
            const payload = {
                articles: posts,
                articleSize: postSize,
                hasMore: postSize >= params.limit,
            };
            commit("setArticles", payload);
            commit("setLoading", false);
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
