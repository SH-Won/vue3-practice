<template>
    <section :class="layout">
        <slot name="list"></slot>
        <!-- <slot></slot>
        <slot></slot>
        <slot></slot> -->
    </section>
</template>

<script>
// import { computed } from "@vue/reactivity";
// import { ref } from "vue";

export default {
    props: {
        layout: String,
    },
};
</script>

<style scoped>
.flex-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
</style>
