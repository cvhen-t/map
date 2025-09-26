import events from 'events';
import Vue from 'vue';
import mapType from './mapType.vue';
class componentsApi {
    map = null;
    mainEl = null;

    constructor(map, mainEl) {
        // super();
        console.log(map, mainEl, '1');
        this.map = map;
        this.mainEl = mainEl;
    }
    createMapType() {
        let mapTypeConstructor = Vue.extend(mapType);
        this.mapTypeMain = new mapTypeConstructor({
            el: document.createElement('div')
        });
        console.log(1213);
        this.mainEl.$el.appendChild(this.mapTypeMain.$el);
    }
}
export default componentsApi;
