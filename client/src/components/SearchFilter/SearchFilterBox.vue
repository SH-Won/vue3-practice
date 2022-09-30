<template>
    <div
        class="search__form"
        :class="data.name === 'positionTheme' && { width: '100%' }"
    >
        <button
            ref="btn"
            class="search__button"
            @click="handleToggleList($event)"
        >
            {{ data.name }}
        </button>
        <ul v-show="isOpen" class="search__list" ref="list">
            <label v-for="value in data.types" :key="value">
                <input
                    :type="data.boxType"
                    :value="value"
                    :name="data.class"
                    @change="handleFilter($event)"
                />
                {{ value }}
            </label>
        </ul>
    </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";

export default {
    props: ["data", "handleFilter"],
    setup(props) {
        const isOpen = ref(false);
        const btn = ref();
        const list = ref();

        // const model = ref([]);
        // const model = computed(() => ({
        //     get() {
        //         return this.modelValue;
        //     },
        //     set(value) {
        //         this.$emit("update", value);
        //     },
        // }));
        const handleToggleList = e => {
            isOpen.value = !isOpen.value;
        };
        const handleCloseList = e => {
            console.log("1");
            if (list.value.contains(e.target)) return;
            if (e.target !== btn.value && isOpen.value) {
                isOpen.value = !isOpen.value;
            }
        };
        onMounted(() => {
            window.addEventListener("click", handleCloseList);
        });

        onUnmounted(() => {
            window.removeEventListener("click", handleCloseList);
        });
        return {
            isOpen,
            btn,
            list,
            handleToggleList,
            handleCloseList,
            // model,
        };
    },
};
</script>

<style scoped>
.search__form {
    margin: 1rem;
    position: relative;
    width: 80%;
    box-sizing: border-box;
}
.search__button:hover {
    background-color: #d7e2eb;
    color: black;
}
.search__button {
    cursor: pointer;
    color: black;
    padding: 0.5rem 0.8rem;
    text-align: start;
    width: 100%;
    font-size: 1rem;
    background-color: #fff;
    border: 0.5px solid #ccc9c9;
    border-radius: 6px;
    /* box-sizing: border-box; */
    transition: background-color 0.3s linear;
}
.search__list {
    width: 100%;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    z-index: 100;
    position: absolute;
    top: 33px;
    left: 0;
    background-color: #fff;
    font-size: 0.8rem;
    border: 0.5px solid black;
    border-radius: 6px;
}
.search__list > label {
    width: 50%;
    text-align: start;
}
</style>
