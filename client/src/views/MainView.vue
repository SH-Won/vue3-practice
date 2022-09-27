<template>
    <h2>{{ title }}</h2>
    <input @input="handleChangeTitle" />
    <div class="container">
        <img
            v-lazyload
            v-for="(article, index) in articles"
            :key="article._id"
            :data-url="article.imageUrls[1]"
            :ref="articles.length - 1 === index ? targetRef : ''"
        />
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

export default {
    setup() {
        const params = ref({
            skip: 0,
            limit: 4,
        });
        const loading = ref(true);

        const store = useStore();
        const { title, handleChangeTitle } = useForm();
        const articles = computed(() => store.state.article.articles);
        const getArticles = async () => {
            loading.value = true;
            await store.dispatch("article/getArticles", params.value);
            params.value = {
                skip: params.value.skip + params.value.limit,
                limit: params.value.limit,
            };
            loading.value = false;
        };

        const { targetRef } = useInfinityScroll(loading, getArticles);
        onMounted(() => {
            console.log(loading.value);
            getArticles();
            console.log(loading.value);
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
    components: { PageLoading },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
}

img {
    margin: 1rem;
    width: 300px;
    height: 300px;
}
</style>
