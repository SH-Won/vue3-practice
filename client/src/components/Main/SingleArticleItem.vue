<template>
    <article class="item" :ref="targetRef">
        <figure class="item__img-wrapper">
            <img v-lazyload :data-url="item.imageUrls[0]" />
        </figure>
        <h2>{{ item.title }}</h2>
    </article>
</template>

<script>
// import { ref } from "vue";

export default {
    props: {
        item: Object,
        targetRef: Function,
    },
};
</script>

<style scoped>
.item {
    display: flex;
    flex-direction: column;
    flex: 0 0 calc((100% - 8rem) / 4);
    margin: 1rem;
}

.item__img-wrapper {
    margin: 0;
    position: relative;
    padding-top: 72.5%;
    width: 100%;
}

.item__img-wrapper > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

@media screen and (max-width: 900px) {
    .item {
        flex: 0 0 calc((100% - 6rem) / 3);
    }
}

@media screen and (max-width: 750px) {
    .item {
        flex: 0 0 calc((100% - 4rem) / 2);
    }
}

@media screen and (max-width: 500px) {
    .item {
        flex: 0 0 calc((100% - 2rem));
    }
}

/* @media screen and (min-width: 501px) and (max-width: 750px) {
    .item {
        flex: 0 0 calc((100% - 4rem) / 2);
    }
} */
/* @media screen and (min-width) */
</style>
