<template>
    <div class="main-content space-top wrapper" :style="styles">
        <div>{{ explain }}</div>
        <div class="loader loader-6"></div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    setup(props) {
        const explain = ref(props.explain);
        const styles = ref(props.styles || {});

        return {
            explain,
            styles,
        };
    },
};
</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #f5f5f5;
    height: 92vh;
    width: 100%;
    box-sizing: border-box;
    /* min-width: 290px;
    max-width: 800px; */
    padding-left: 1em;
    padding-right: 1em;
    margin-left: auto;
    margin-right: auto;
}

.loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 3em;
    display: inline-block;
    position: relative;
    vertical-align: middle;
}

.loader,
.loader:before,
.loader:after {
    animation: 1s infinite ease-in-out;
}

.loader:before,
.loader:after {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
}

.loader-6 {
    animation: loader6-1 1.5s infinite linear;
}

.loader-6:before,
.loader-6:after {
    content: "";
    margin: -25px 0 0 -25px;
    top: 50%;
    left: 50%;
    background-color: #7ae5b3;
    animation-name: loader6-2;
}

.loader-6:after {
    animation-direction: reverse;
}

@keyframes loader6-1 {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes loader6-2 {
    0% {
        transform: scale(0.2);
        left: 0%;
    }

    50% {
        transform: scale(1);
        left: 50%;
    }

    100% {
        transform: scale(0.2);
        left: 100%;
    }
}
</style>
