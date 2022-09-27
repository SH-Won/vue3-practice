import { onMounted, ref } from "vue";

export default function useFetchArticle() {
    const articles = ref([]);
    const getArticles = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/posts/");
            if (response.ok) {
                const json = await response.json();
                const { posts } = json;
                articles.value = [...posts];
            }
        } catch (e) {
            //   throw new Error(e);
        }
    };
    onMounted(() => {
        getArticles();
    });

    return {
        articles,
        getArticles,
    };
}
