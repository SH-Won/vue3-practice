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
        const params = ref({
            skip: 0,
            limit: 4,
        });
        const pageLoading = ref(true);

        const store = useStore();
        const { title, handleChangeTitle } = useForm();
        const articles = computed(() => store.state.article.articles);
        const hasMore = computed(() => store.state.article.hasMore);
        const loading = computed(() => store.state.article.loading);
        const getArticles = () => {
            store.dispatch("article/getArticles", params.value);
            params.value = {
                skip: params.value.skip + params.value.limit,
                limit: params.value.limit,
            };
        };

        const { targetRef } = useInfinityScroll(loading, hasMore, getArticles);
        onMounted(() => {
            pageLoading.value = true;
            console.log(params.value);
            getArticles();
            pageLoading.value = false;
        });
        return {
            loading,
            params,
            title,
            handleChangeTitle,
            articles,
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
