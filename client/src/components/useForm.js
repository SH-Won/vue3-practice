import { ref } from "vue";
export default function useForm() {
    const title = ref("");
    const handleChangeTitle = e => {
        title.value = e.target.value;
    };
    return { title, handleChangeTitle };
}
