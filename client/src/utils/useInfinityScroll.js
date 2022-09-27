// import { ref } from "vue";

export const useInfinityScroll = (loading, callback) => {
    console.log(loading.value, "scroll params");

    const handleScroll = (entries, ob) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.dir(entry.target);

                callback();
                ob.unobserve(entry.target);
            }
        });
    };
    const targetRef = el => {
        console.log(loading.value, "scroll");
        if (!el || loading.value) return;
        const observer = new IntersectionObserver(handleScroll, {
            threshold: 0.7,
        });
        observer.observe(el);
    };
    return {
        targetRef,
    };
};

export default useInfinityScroll;
