<!-- <img
            v-lazyload
            v-for="(article, index) in articles"
            :key="article._id"
            :data-url="article.imageUrls[1]"
            :ref="articles.length - 1 === index ? targetRef : ''"
        /> -->
<template>
    <!-- <h2>{{ title }}</h2>
    <input @input="handleChangeTitle" /> -->
    <div class="container">
        <ItemList layout="flex-wrap">
            <template v-slot:list>
                <SingleArticleItem
                    v-for="(item, index) in items"
                    :key="item._id"
                    :item="item"
                    :targetRef="items.length - 1 === index ? targetRef : null"
                />
            </template>
        </ItemList>
        <PageLoading v-if="loading" explain="로딩" />
    </div>
</template>

<script>
import useInfinityScroll from "@/utils/useInfinityScroll";
import { onMounted, ref } from "vue";
import PageLoading from "@/components/Loading/pageLoading.vue";
import ItemList from "@/components/Main/ItemList.vue";
import SingleArticleItem from "@/components/Main/SingleArticleItem.vue";
import { GET_POST, STORE_POST } from "@/store/types/post";
import useFetch from "@/hooks/useFetch";

export default {
    setup() {
        const pageLoading = ref(false);
        const { items, loading, getItems, hasMore } = useFetch(
            STORE_POST,
            GET_POST,
        );

        const { targetRef } = useInfinityScroll(loading, hasMore, getItems);
        onMounted(() => {
            if (!items.value.length) {
                pageLoading.value = true;
                getItems();
            }
            pageLoading.value = false;
        });
        return {
            loading,
            items,
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
