import Vue from 'vue';
Vue.directive('resize', {
    bind(el, binding) {
        const setMaxHeight = () => {
            const offset = binding.value || 100; // 默认偏移量，如果没有传入则使用100
            const maxHeight = window.innerHeight - offset;
            el.style.maxHeight = `${maxHeight}px`;
        };

        el.__vueSetMaxHeight__ = setMaxHeight;

        window.addEventListener('resize', setMaxHeight);

        setMaxHeight();
    },
    unbind(el) {
        window.removeEventListener('resize', el.__vueSetMaxHeight__);
        delete el.__vueSetMaxHeight__;
    }
});
