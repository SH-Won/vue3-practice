export const useInfinityScroll = (loading, hasMore, callback) => {
    console.log(loading.value, "scroll params");

    const handleScroll = (entries, ob) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                ob.unobserve(entry.target);
            }
        });
    };
    const targetRef = el => {
        // console.log(el);
        if (!el || loading.value || !hasMore.value) return;
        // console.log(hasMore.value, "hasMore");
        const observer = new IntersectionObserver(handleScroll, {
            threshold: 0.7,
        });
        // observer.observe(el.$el);
        observer.observe(el);
    };
    return {
        targetRef,
    };
};

export default useInfinityScroll;
