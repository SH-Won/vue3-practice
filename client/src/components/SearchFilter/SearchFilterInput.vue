<template>
    <input
        class="search__input"
        :placeholder="data.placeholder"
        :name="data.class"
        @change="handleFilter"
    />
</template>

<script>
export default {
    props: ["data", "handleFilter"],
};
</script>

<style scoped>
.search__input {
    padding: 0.5rem 0.8rem;
    text-align: start;
    width: 80%;
    font-size: 1rem;
    background-color: #f5f5f5;
    border: 0.5px solid #ccc9c9;
    border-radius: 6px;
    box-sizing: border-box;
    margin: 0.5rem;
}
</style>
