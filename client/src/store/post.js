import * as ArticleAPI from "@/service/article";

const state = () => ({
    posts: [],
    postSize: 0,
    hasMore: true,
    loading: true,
});
const getters = {};
const mutations = {
    setPosts(state, payload) {
        const { posts, postSize, hasMore } = payload;
        state.posts = [...state.posts, ...posts];
        state.postSize = postSize;
        state.hasMore = hasMore;
    },
    setLoading(state, payload) {
        state.loading = payload;
    },
};
const actions = {
    getPosts: async ({ state, commit }, params) => {
        commit("setLoading", true);
        try {
            const response = await ArticleAPI.getPosts(params);
            const { posts, postSize } = response;
            const payload = {
                posts,
                postSize,
                hasMore: postSize >= params.limit,
            };
            commit("setPosts", payload);
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
