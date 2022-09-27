<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { ref } from "vue";

export default {
    name: "HomeView",

    setup() {
        const title = ref("");

        return {
            title,
        };
    },
    components: {
        HelloWorld,
    },
};
</script>
