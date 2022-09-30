import { computed, ref } from "vue";
import { useStore } from "vuex";

const useFetch = (storeName, action) => {
    const store = useStore();
    const items = computed(() => store.state[storeName].items);
    const loading = computed(() => store.state[storeName].loading);
    const hasMore = computed(() => store.state[storeName].hasMore);
    const params = ref({
        skip: items.value.length,
        limit: 4,
    });

    const getItems = () => {
        store.dispatch(action, params.value);
        params.value = {
            skip: params.value.skip + params.value.limit,
            limit: params.value.limit,
        };
    };

    console.log(params.value);
    return {
        items,
        loading,
        getItems,
        hasMore,
    };
};

export default useFetch;
