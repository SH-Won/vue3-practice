import * as ArticleAPI from "@/service/article";

const state = () => ({
    items: [],
    itemSize: 0,
    hasMore: true,
    loading: true,
});
const getters = {};
const mutations = {
    setItems(state, payload) {
        const { items, itemSize, hasMore } = payload;
        state.items = [...state.items, ...items];
        state.itemSize = itemSize;
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
                items: posts,
                itemSize: postSize,
                hasMore: postSize >= params.limit,
            };
            commit("setItems", payload);
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
