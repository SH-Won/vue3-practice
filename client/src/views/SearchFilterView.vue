<template>
    <section class="search">
        <div class="search__flex">
            <SearchFilterBox
                :data="searchDatas[0]"
                :handleFilter="handleCheckBoxFilter"
            />
            <SearchFilterInput
                v-for="data in searchInputData"
                :key="data.class"
                :data="data"
                :handleFilter="handleSingleFilter"
            />
        </div>
        <div class="search__flexwrap">
            <SearchFilterBox
                v-for="data in searchDatas.slice(1)"
                :key="data.class"
                :data="data"
                :handleFilter="handleSingleFilter"
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

// 필터창이 아닌 곳을 눌렀을때는 필터창이 닫혀야함
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

        const handleCheckBoxFilter = e => {
            const { value, name } = e.target;
            const index = filter.value[name].indexOf(value);
            if (index < 0) {
                filter.value[name].push(value);
            } else {
                filter.value[name].splice(index, 1);
            }
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
    width: 80%;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.search__flexwrap > .search__form {
    margin: 1rem 0;
    flex: 0 0 47%;
}
@media screen and (min-width: 775px) {
    .search__flex {
        width: 90%;
        flex-direction: row;
    }
    .search__flex > .search__form {
        flex: 0 0 30%;
        margin: 1rem 0;
    }
    .search__flexwrap {
        width: 90%;
    }
    .search__flexwrap > .search__form {
        flex: 0 0 18%;
    }
}
</style>
