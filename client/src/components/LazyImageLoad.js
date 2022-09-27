const LazyImageLoad = {
    created: el => {
        function loadImage() {
            if (el.tagName === "IMG") {
                el.src = el.dataset.url;
            }
        }

        const handleInterSection = (entries, ob) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage();
                    ob.unobserve(el);
                }
            });
        };

        function observe() {
            const observer = new IntersectionObserver(handleInterSection, {
                threshold: 0.3,
            });
            observer.observe(el);
        }
        window["IntersectionObserver"] ? observe() : loadImage();
    },
};
export default LazyImageLoad;
