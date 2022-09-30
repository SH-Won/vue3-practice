<template>
    <section class="search">
        <div class="search__flex">
            <SearchFilterBox
                :data="searchDatas.jobs"
                :handleFilter="handleCheckBoxFilter"
            />
            <SearchFilterInput
                :data="searchInputData.tech"
                :handleFilter="handleSingleFilter"
            />
            <SearchFilterInput
                :data="searchInputData.company"
                :handleFilter="handleSingleFilter"
            />
        </div>
        <div class="search__flexwrap">
            <SearchFilterBox
                :data="searchDatas.career"
                :handleFilter="handleSingleFilter"
            />
            <SearchFilterBox
                :data="searchDatas.wage"
                :handleFilter="handleSingleFilter"
            />
            <SearchFilterBox
                :data="searchDatas.people"
                :handleFilter="handleCheckBoxFilter"
            />
            <SearchFilterBox
                :data="searchDatas.place"
                :handleFilter="handleCheckBoxFilter"
            />
            <SearchFilterBox
                :data="searchDatas.positionTheme"
                :handleFilter="handleCheckBoxFilter"
            />
        </div>

        <button @click="print">출력</button>
    </section>
</template>

<script>
import SearchFilterBox from "@/components/SearchFilter/SearchFilterBox.vue";
import { searchDatas, searchInputData } from "@/components/SearchFilter/data";
import { ref } from "vue";
import SearchFilterInput from "@/components/SearchFilter/SearchFilterInput.vue";

export default {
    setup() {
        const filter = ref({
            jobs: [],
            tech: "",
            company: "",
            career: "",
            wage: "",
            people: "",
            place: "",
            positionTheme: "",
        });
        // const jobs = ref([]);

        const handleCheckBoxFilter = e => {
            const value = e.target.value;
            const name = e.target.name;
            const index = filter.value[name].indexOf(value);
            if (index < 0) {
                filter.value[name].push(value);
            } else {
                filter.value[name].splice(index, 1);
            }
            console.log(filter.value);
        };
        const handleSingleFilter = e => {
            const { value, name } = e.target;
            filter.value[name] = value;
        };

        const print = () => {
            console.log(filter.value);
        };

        return {
            filter,

            searchDatas,
            searchInputData,
            handleCheckBoxFilter,
            handleSingleFilter,
            print,
        };
    },
    components: { SearchFilterBox, SearchFilterInput },
};
</script>

<style scoped>
.search {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.search__flex {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.search__flexwrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    align-items: stretch;
}
.search__flexwrap > .search__form {
    width: 40%;
}
</style>
