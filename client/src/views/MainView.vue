<!-- <img
            v-lazyload
            v-for="(article, index) in articles"
            :key="article._id"
            :data-url="article.imageUrls[1]"
            :ref="articles.length - 1 === index ? targetRef : ''"
        /> -->
<template>
    <h2>{{ title }}</h2>
    <input @input="handleChangeTitle" />
    <div class="container">
        <ItemList layout="flex-wrap">
            <template v-slot:list>
                <SingleArticleItem
                    v-for="(post, index) in posts"
                    :key="post._id"
                    :item="post"
                    :targetRef="posts.length - 1 === index ? targetRef : null"
                />
            </template>
        </ItemList>
        <PageLoading v-if="loading" explain="로딩" />
    </div>
</template>

<script>
import useForm from "@/components/useForm.js";
import useInfinityScroll from "@/utils/useInfinityScroll";
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import PageLoading from "@/components/Loading/pageLoading.vue";
import ItemList from "@/components/Main/ItemList.vue";
import SingleArticleItem from "@/components/Main/SingleArticleItem.vue";

export default {
    setup() {
        const pageLoading = ref(false);

        const store = useStore();
        const { title, handleChangeTitle } = useForm();
        const posts = computed(() => store.state.post.posts);
        const hasMore = computed(() => store.state.post.hasMore);
        const loading = computed(() => store.state.post.loading);
        const params = ref({
            skip: posts.value.length,
            limit: 4,
        });
        const getPosts = () => {
            store.dispatch("post/getPosts", params.value);
            // console.log(posts);
            params.value = {
                skip: params.value.skip + params.value.limit,
                limit: params.value.limit,
            };
        };

        const { targetRef } = useInfinityScroll(loading, hasMore, getPosts);
        onMounted(() => {
            if (!posts.value.length) {
                pageLoading.value = true;
                getPosts();
            }
            pageLoading.value = false;
        });
        return {
            loading,
            params,
            title,
            handleChangeTitle,
            posts,
            targetRef,
        };
    },
    components: { PageLoading, ItemList, SingleArticleItem },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

img {
    margin: 1rem;
    width: 300px;
    height: 300px;
}
</style>
