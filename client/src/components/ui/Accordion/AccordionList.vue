<template>
    <div class="accordion">
        <button
            class="accordion__btn"
            :class="{ act: isOpen }"
            @click="handleToggleList"
        >
            {{ title }}
        </button>
        <ul
            ref="list"
            class="accordion__list"
            :class="{ act: isOpen }"
            :style="
                isOpen && {
                    'max-height': `${listHeight}`,
                }
            "
        >
            <li v-for="(item, index) in items" :key="index">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { ref } from "vue";

export default {
    props: {
        title: {
            type: String,
            default: "정보 없음",
        },
        items: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    setup(props) {
        const isOpen = ref(false);
        const list = ref();

        const handleToggleList = () => {
            isOpen.value = !isOpen.value;
            console.dir(list.value);
        };
        const listHeight = computed(
            () => `${list.value.children[0].offsetHeight * 5 + 10}px`,
        );
        console.log(listHeight);
        return {
            isOpen,
            list,
            listHeight,
            handleToggleList,
        };
    },
};
</script>

<style scoped>
.accordion {
    margin: 0 auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
}
.accordion__btn {
    padding: 1rem 0.5rem;
    text-align: start;
    border: 0.5px solid #c6c2c2;
    border-radius: 6px;
    background-color: #fff;
    transition: box-shadow 0.3s linear;
    z-index: 5;
}
.accordion__list {
    /* visibility: hidden; */
    margin: 0;
    padding: 0;
    max-height: 0;
    overflow: hidden;
    transition: all 0.4s ease;
    border: 0.5px solid #c6c2c2;
    border-radius: 4px;
    transform: translate3d(0, -30px, 0);
    z-index: 1;
}
.accordion__btn.act {
    box-shadow: 0 8px 8px -4px #d7d3d3;
}
.accordion__list.act {
    transform: translate3d(0, 0.5rem, 0);
}
.accordion__list > li {
    padding: 0.5rem;
    text-align: start;
    cursor: pointer;
}
.accordion__list > li:hover {
    background-color: aliceblue;
}
</style>
