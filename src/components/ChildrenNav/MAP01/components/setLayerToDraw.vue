<template>
    <div class="LayerBox">
        <div>绘制列表</div>
        <el-button size="mini"
                   @click="look">预览所有绘制</el-button>

        <!-- <el-button size="mini"
                   @click="clear">清除</el-button> -->
        <div class="imgBox">
            <img @click="toMapLayer(item,i)"
                 class="imgclass"
                 v-for="(item,i) in imgList"
                 :key="item.imgurl"
                 :src="item.imgurl"
                 alt="">
        </div>

    </div>
</template>

<script>
import * as turf from '@turf/turf';
let mapBoxApiClassLay = null;
import mapBoxApi from '../comm/mapApi';
export default {
    props: {
        drawLayerList: {
            type: Array
        }
    },
    watch: {
        drawLayerList(newdrawLayerList, olddrawLayerList) {
            this.layList = newdrawLayerList;
            console.log(newdrawLayerList.length);
            if (!newdrawLayerList.length) {
                this.clear();
            }
        }
    },
    data() {
        return {
            imgList: [],
            layList: []
        };
    },
    mounted() {
        console.log(1);
        mapBoxApiClassLay = new mapBoxApi(map);
        console.log(mapBoxApiClassLay);
    },
    methods: {
        look() {
            this.getLaywH(this.layList);
        },
        clear() {
            this.$emit('cleaLayerAndSourceToregex', [/^draw|^source/, /^sours|^source/, /^text|^source/]);
            this.imgList = [];
            this.layList = [];
        },
        toMapLayer(item, id) {
            let { geoJson } = item;
            console.log(geoJson);

            if (map.getLayer(`sours-setLayer-${id}`)) {
                mapBoxApiClassLay.fitBoundsTomap(geoJson);
                return;
            }
            mapBoxApiClassLay.addRoutelayer(`sours-setLayer-${id}`, 'fill', geoJson, {
                'fill-color': '#8abdbd',
                'fill-opacity': 0.4
            });
            mapBoxApiClassLay.fitBoundsTomap(geoJson);
        },
        async getLaywH(newdrawLayerList) {
            let res = newdrawLayerList.map((item) => {
                // 获取边界框（Bounding Box）
                const bbox = turf.bbox(item);
                // 计算左上角坐标（bounding box的左上角即为[minLng, maxLat]）
                const topLeft = [bbox[0], bbox[3]];
                // 获取图形的像素尺寸
                const leftTop = map.project(topLeft); // 将经纬度转换为像素坐标
                const rightBottom = map.project([bbox[2], bbox[1]]); // 获取右下角的像素坐标
                const width = rightBottom.x - leftTop.x;
                const height = rightBottom.y - leftTop.y;
                const x = leftTop.x;
                const y = leftTop.y;
                return { topLeft, x, y, width, height, geoJson: item };
            });
            this.imgList = await this.getBatchMapImages(res);
        },
        async getBatchMapImages(mapItems) {
            try {
                // 使用 Promise.all 批量执行异步操作
                const imagePromises = mapItems.map(async (item) => {
                    // 假设每个 item 都需要执行 getMapImageDataURL()
                    const imageDataURL = await this.getMapImageDataURL(item); // 获取每个地图的图像
                    return imageDataURL; // 返回每个图像的 Base64 编码
                });

                // 等待所有异步操作完成，并返回结果
                const allImageDataURLs = await Promise.all(imagePromises);
                return allImageDataURLs; // 返回所有图像的 Base64 编码数组
            } catch (error) {
                console.error('Error fetching map images:', error);
                throw error; // 捕获错误并抛出
            }
        },
        getMapImageDataURL(item) {
            return new Promise((resolve, reject) => {
                // 监听 Mapbox 渲染完成事件
                map.once('render', () => {
                    try {
                        // 获取地图的 Canvas 并转换为 PNG 格式的 Base64 编码
                        // const imageDataURL = map.getCanvas().toDataURL('image/png');
                        resolve(this.getMapImage(item)); // 成功时返回图像的 Base64 编码
                    } catch (error) {
                        reject(error); // 如果获取失败，返回错误
                    }
                });

                // 强制触发地图的重绘，以确保触发 'render' 事件
                try {
                    map.triggerRepaint();
                } catch (error) {
                    reject(error); // 如果触发失败，返回错误
                }
            });
        },
        getMapImage(item) {
            let { x, y, width, height, geoJson } = item;
            // 获取当前地图的 canvas 元素
            const canvas = map.getCanvas();

            // 创建一个临时 canvas 用来裁剪图像
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');

            // 设置临时 canvas 的宽高
            tempCanvas.width = width;
            tempCanvas.height = height;

            // 使用 drawImage 裁剪指定区域
            tempCtx.drawImage(canvas, x, y, width, height, 0, 0, width, height);

            // 获取裁剪后的图像的 Base64 编码字符串
            const croppedDataUrl = tempCanvas.toDataURL('image/png');

            // 返回 Base64 编码的 PNG 图像
            return { imgurl: croppedDataUrl, geoJson };
        }
    }
};
</script>

<style scoped>
.LayerBox {
    position: fixed;
    top: 160px;
    z-index: 2;
    background-color: white;
    padding: 10px;
    left: 86px;
}
.imgBox {
    max-width: 400px;
    max-height: 600px;
    overflow-y: auto;
}
.imgclass {
    width: 100px;
    height: 100px;
    margin: 10px;
}
</style>