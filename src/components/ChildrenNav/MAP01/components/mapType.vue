<template>
    <div class="mapTypeBox">

        <img @click="setStyle(1)"
             style="width: 100px;height: 100px;"
             src="../assets/imgs/type1.png"
             alt="">
        <img @click="setStyle(2)"
             style="width: 100px;height: 100px;margin: 0 10px;"
             src="../assets/imgs/type2.png"
             alt="">

        <img @click="setStyle(3)"
             style="width: 100px;height: 100px;"
             src="../assets/imgs/type3.png"
             alt="">
    </div>
</template>

<script>
import style from '../comm/style/index.json';
export default {
    data() {
        return {
            type1: 'mapbox://sprites/mapbox/standard',
            type2: 'mapbox://styles/mapbox/satellite-v9'
        };
    },
    methods: {
        setStyle(type) {
            if (type === 1) {
                map.setStyle('mapbox://sprites/mapbox/standard');
            }
            if (type === 2) {
                map.setStyle('mapbox://styles/mapbox/satellite-v9');
            }
            if (type === 3) {
                map.setStyle(style);
            }
        }
    }
};
</script>

<style scoped>
.mapTypeBox {
    position: fixed;
    bottom: 10%;
    right: 20px;
    /* background: white; */
    padding: 10px;
}
</style>