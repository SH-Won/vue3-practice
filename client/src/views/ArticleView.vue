<template>
    <div class="container">
        <ItemList layout="flex-wrap">
            <template v-slot:list>
                <SingleArticleItem
                    v-for="(article, index) in articles"
                    :key="article._id"
                    :item="article"
                    :targetRef="
                        articles.length - 1 === index ? targetRef : null
                    "
                />
            </template>
        </ItemList>
        <PageLoading v-if="loading" explain="로딩" />
    </div>
</template>

<script>
import useInfinityScroll from "@/utils/useInfinityScroll";
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import PageLoading from "@/components/Loading/pageLoading.vue";
import ItemList from "@/components/Main/ItemList.vue";
import SingleArticleItem from "@/components/Main/SingleArticleItem.vue";

const useFetch = () => {
    const store = useStore();
    const articles = computed(() => store.state.article.articles);
    const loading = computed(() => store.state.article.loading);
    const hasMore = computed(() => store.state.article.hasMore);
    const params = ref({
        skip: articles.value.length,
        limit: 4,
    });
    const getArticles = () => {
        store.dispatch("article/getArticles", params.value);
        params.value = {
            skip: params.value.skip + params.value.limit,
            limit: params.value.limit,
        };
    };
    const { targetRef } = useInfinityScroll(loading, hasMore, getArticles);
    console.log(params.value);
    return {
        articles,
        loading,
        getArticles,
        targetRef,
    };
};
export default {
    setup() {
        const pageLoading = ref(false);
        const { articles, loading, getArticles, targetRef } = useFetch();

        onMounted(() => {
            if (!articles.value.length) {
                pageLoading.value = true;
                getArticles();
            }

            pageLoading.value = false;
        });
        return {
            articles,
            loading,
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
