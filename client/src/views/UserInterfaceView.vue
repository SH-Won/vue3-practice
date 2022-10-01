<template>
    <div class="container">
        <AccordionList title="언어" :items="items" />
    </div>
</template>

<script>
import AccordionList from "@/components/ui/Accordion/AccordionList.vue";
export default {
    setup() {
        const items = ["html", "css", "javascript", "vue", "react"];

        return {
            items,
        };
    },

    components: { AccordionList },
};
</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>
