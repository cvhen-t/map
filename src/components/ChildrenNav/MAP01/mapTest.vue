<template>
    <div style="height:700px;width:100%;">
        <div class="felxBox">
            <div class="maginten">
                <el-button size="mini"
                           @click="fltToOrientation">重置 </el-button>
            </div>

            <div style="    margin: 0;"
                 class="maginten felxBox">
                <span class="fontSize">绘制开关：</span>
                <el-switch v-model="openDrawLine"
                           @change="drawLinechange"
                           active-color="#13ce66"
                           inactive-color="#909399">
                </el-switch>
                <div @click=" cleaLayerAndSourceToregex([/^draw|^source/, /^sours|^source/, /^text|^source/]) ,drawLine=[],drawLayerList = [];"
                     v-show="openDrawLine"> <i style="font-size: 17px;color: red; margin: 0 10px; "
                       class="el-icon-delete"></i></div>

                <div @cleaLayerAndSourceToregex=" cleaLayerAndSourceToregex;"
                     v-if="openDrawLine">
                    <setLayerToDraw :drawLayerList=drawLayerList></setLayerToDraw>
                </div>

            </div>

            <div class="maginten">
                <span class="fontSize">选择省份：</span>
                <el-select size="mini"
                           v-model="provinceValue"
                           @change="provinceChange"
                           placeholder="请选择">
                    <el-option v-for="item in provincelist"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <el-popover placement="bottom"
                        title="地图操作"
                        width="400"
                        trigger="click">
                <div class="felxBox">
                    <!-- <el-button size="mini"
                               @click="drawLine">绘制路线 </el-button> -->
                    <el-button size="mini"
                               @click="toHome">老家 </el-button>

                    <el-button size="mini"
                               @click="expotMap">导出地图 </el-button>

                    <el-input size="mini"
                              @blur="tocenterList"
                              v-model="centerList"
                              placeholder="请输入内容"></el-input>

                    <el-button size="mini"
                               @click=" isOpenGetLineDistance=!isOpenGetLineDistance,drawLinechange(isOpenGetLineDistance)">{{ `${!isOpenGetLineDistance?'开启':'关闭'}测量工具` }}</el-button>

                    <!-- <el-button size="mini"
                               @click="toHome">角度测量工具</el-button> -->

                </div>
                <el-button size="mini"
                           slot="reference">工具</el-button>
            </el-popover>

            <div class="maginten">
                <el-button size="mini"
                           @click="lineToPlan">导航 </el-button>
            </div>

            <div class="maginten">
                <el-button size="mini"
                           @click="lineToPlanTudong">运动 </el-button>
            </div>

            <div class="maginten">
                <el-button size="mini"
                           @click="addmak">创建mak </el-button>
            </div>

            <div class="maginten">
                <el-button size="mini"
                           @click="addrlLayer">添加热力图层 </el-button>
            </div>
        </div>

        <div style="height:80%;width:100%;text-align:left;">
            <div style="height: 100%; width: 100%;"
                 ref="basicMapbox"></div>
        </div>

    </div>

</template>
<script>
import { jsPDF } from 'jspdf';
import style from './comm/style/index.json';
import { zginit } from './comm/json/zgint';
import { linePlan, oldHome } from './comm/json/geoJson';
// import mapboxgl from 'mapbox-gl';
import mapBoxApi from './comm/mapApi';
import componentsApi from './components/component.js';

import drawingTool from './comm/feature/drawingTool';
import * as turf from '@turf/turf';
import { togeoJson, putStrNowDate, copyText } from './comm/util.js';
import setLayerToDraw from './components/setLayerToDraw.vue';
let mapBoxApiClass = null;
let drawingToolClass = null;
let isuseLocation = true;
let componentClass = null;
export default {
    props: {
        mapWidth: {
            type: String
        },
        mapHeight: {
            type: String
        }
    },
    components: { setLayerToDraw },
    data() {
        return {
            styleUrl: 'mapbox://styles/wuyangwen/ckqfzjrds36ch18prcds22idm',
            style3d: 'mapbox://styles/mapbox/mapbox-gl-3d-buildings',
            defstyle: 'mapbox://styles/mapbox/streets-v11',
            centerList: '',
            provincelist: [],
            provinceValue: '',
            previousPro: '',
            routeGeoJson: zginit,
            activeCoror: '#ec1877',
            openDrawLine: false,
            //绘制保持的数据
            drawLine: [],
            //当前坐标
            clickPoint: [],
            //预绘制图层递增id
            sourIndex: 1,
            // 是否开启测量
            isOpenGetLineDistance: false,
            drawLayerList: []
        };
    },
    mounted() {
        this.init();
        this.initprovinceList();
    },
    methods: {
        // 初始化
        init() {
            let that = this;
            mapboxgl.accessToken = 'pk.eyJ1Ijoid3V5YW5nd2VuIiwiYSI6ImNrcWZ5MmhwcDE5eTkyeG56ZXVyY3VsZ3EifQ.90L3IQF1bIUc1qTShDlq-A';
            // window.map = new mapboxgl.Map({
            //     container: this.$refs.basicMapbox,
            //     style: isuseLocation ? style : this.defstyle, //
            //     center: [106.02806614743885, 33.26824423858698],
            //     zoom: 3
            // });
            window.map = new mapboxgl.Map({
                container: this.$refs.basicMapbox, // container ID
                style: isuseLocation ? style : this.defstyle,
                center: [106.02806614743885, 33.26824423858698], // starting position [lng, lat]. Note that lat must be set between -90 and 90
                zoom: 3 // starting zoom
            });

            map.on('load', (e) => {
                that.initClass();
            });
        },
        initClass() {
            mapBoxApiClass = new mapBoxApi(map);
            drawingToolClass = new drawingTool(map);
            componentClass = new componentsApi(map, this);
            // console.log(componentClass, '1');
            componentClass.createMapType();
        },
        tocenterList() {
            let data = this.centerList.split(',');
            console.log(data);
            mapBoxApiClass.flyToCenten('', 16, data);
        },
        //初始化下拉省份
        initprovinceList() {
            this.provincelist = this.routeGeoJson.features.map((item) => {
                return {
                    label: item.properties.name,
                    value: item.properties.adcode,
                    ...item
                };
            });
        },
        //切换省份
        provinceChange(e) {
            let obj = this.provincelist.find((item) => item.value == e);

            if (obj) {
                if (map.getLayer(`${this.previousPro}`)) {
                    map.removeLayer(`${this.previousPro}`);
                    map.removeSource(`${this.previousPro}`);
                    mapBoxApiClass.addRoutelayer(`${e}`, 'line', obj, {
                        'line-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#0b4975', `${this.activeCoror}`],
                        'line-width': 1,
                        'line-opacity': 1
                    });
                    mapBoxApiClass.flyToCenten(obj, 7.5, obj.properties.center);
                } else {
                    mapBoxApiClass.addRoutelayer(`${e}`, 'line', obj, {
                        'line-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#0b4975', `${this.activeCoror}`],
                        'line-width': 1,
                        'line-opacity': 1
                    });
                    mapBoxApiClass.fitBoundsTomap(obj);
                }
                this.previousPro = e;
            }
        },
        //取点--点击鼠标获取坐标
        clickGetlngLat(e) {
            this.clickPoint = [[e.lngLat.lng, e.lngLat.lat]];
            this.drawLine.push([e.lngLat.lng, e.lngLat.lat]);

            mapBoxApiClass.onSetMapEvent(this.mousemoveGetlngLat, 'mousemove');
            if (map.getSource(`sours${this.sourIndex}`)) {
                mapBoxApiClass.addRoutelayer(`sours${this.sourIndex}`, 'line', `sours${this.sourIndex}`, {
                    'line-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#0b4975', '#077692'],
                    'line-width': 1,
                    'line-opacity': [2, 2]
                });
                this.sourIndex = this.sourIndex + 1;
            }
        },
        //预绘制，根据鼠标移动画虚线
        mousemoveGetlngLat(e) {
            // 获取鼠标的坐标
            var coords = e.lngLat;
            // 创建虚线路径
            var lineCoordinates = [this.clickPoint[0]];
            lineCoordinates.push([coords.lng, coords.lat]);
            let res = togeoJson(lineCoordinates);
            // 清除之前的虚线图层（如果存在）
            if (map.getSource(`sours${this.sourIndex}`)) {
                map.getSource(`sours${this.sourIndex}`).setData(res);
                if (map.getSource(`text${this.sourIndex}`)) {
                    let datas = map.getSource(`sours${this.sourIndex}`)._data;
                    const centerCoordinates = mapBoxApiClass.getCenten(datas);
                    const length = mapBoxApiClass.getLineDistance(datas);
                    map.getSource(`text${this.sourIndex}`).setData(togeoJson(centerCoordinates, 'Point', `${length.toFixed(2)}Km`));
                }
            } else {
                mapBoxApiClass.addRoutelayer(`sours${this.sourIndex}`, 'line', res, {
                    'line-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#0b4975', 'red'],
                    'line-width': 1,
                    'line-opacity': 1,
                    'line-dasharray': [2, 2]
                });

                mapBoxApiClass.addRoutelayer(`text${this.sourIndex}`, 'symbol', togeoJson([], 'Point', ``), {
                    'text-field': ['get', 'title'], // 正确的属性名称是 'text-field'
                    'text-size': 16,
                    'text-anchor': 'top'
                });
            }
        },
        //绘制--根据鼠标右键点击获取的坐标绘制线路
        drawLineToclickGetlngLat(e) {
            if (this.isOpenGetLineDistance) {
                this.cleaLayerAndSourceToregex([/^sours|^source/, /^text|^source/]);
                mapBoxApiClass.offSetMapEvent(this.mousemoveGetlngLat, 'mousemove');
                this.drawLine = [];
                this.sourIndex = 1;
                return;
            }
            if (!this.drawLine.length > 0) return;
            let res = togeoJson(this.drawLine);
            copyText(JSON.stringify(res), '路线geoJson数据复制成功');
            this.drawLayerList.push(res);
            mapBoxApiClass.addRoutelayer(`draw${putStrNowDate()}`, 'line', res, {
                'line-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#0b4975', '#077692'],
                'line-width': 1,
                'line-opacity': 1
            });
            mapBoxApiClass.offSetMapEvent(this.mousemoveGetlngLat, 'mousemove');
            this.cleaLayerAndSourceToregex([/^sours|^source/, /^text|^source/]);
            this.drawLine = [];
            this.sourIndex = 1;
        },
        // 绘制开关
        drawLinechange(value) {
            if (!value) {
                mapBoxApiClass.offSetMapEvent(this.clickGetlngLat, 'click');
                mapBoxApiClass.offSetMapEvent(this.drawLineToclickGetlngLat, 'contextmenu');
                this.drawLine = [];
                this.cleaLayerAndSourceToregex([/^draw|^source/, /^sours|^source/, /^text|^source/]);
                map.getCanvas().style.cursor = 'pointer';
                this.sourIndex = 1;
            } else {
                map.getCanvas().style.cursor = 'crosshair';
                mapBoxApiClass.onSetMapEvent(this.clickGetlngLat, 'click');
                mapBoxApiClass.onSetMapEvent(this.drawLineToclickGetlngLat, 'contextmenu');
            }
        },

        //重置
        fltToOrientation() {
            this.drawLayerList = [];
            this.initVueData();
            this.drawLinechange();
            this.cleaLayerAndSourceToregex([/^draw|^source/, /^sours|^source/, /^text|^source/]);
            this.cleacarLayers();
            mapBoxApiClass.flyToCenten(this.routeGeoJson, 3);
        },
        toHome() {
            if (map.getLayer('oldHome')) {
                mapBoxApiClass.flyToCenten(oldHome, 17);
                return;
            }
            mapBoxApiClass.addRoutelayer(`oldHome`, 'line', oldHome, {
                'line-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#0b4975', `${this.activeCoror}`],
                'line-width': 2,
                'line-opacity': 1
            });
            mapBoxApiClass.addRoutelayer(`oldHome-fill`, 'fill', oldHome, {
                'fill-color': '#8abdbd',
                'fill-opacity': 0.4
            });
            mapBoxApiClass.flyToCenten(oldHome, 17);
        },
        expotMap() {
            this.poMap(window['map']).then((e) => {
                const pdf = new jsPDF();
                pdf.addImage(e, 'JPEG', 10, 10, 90, 90, '', 0.2);
                pdf.save('canvas-export.pdf');
            });
        },
        poMap(map) {
            return new Promise((r, j) => {
                map.once('render', () => {
                    r(map.getCanvas().toDataURL('image/png'));
                });
                map.triggerRepaint();
            });
        },

        //运动
        lineToPlanTudong() {
            let lineCoordinates = [];
            // lineCoordinates = this.interpolatePoints(coordinates[0], coordinates[1], 10);
            // console.log(lineCoordinates);
            const allLayers = map.getStyle().layers;
            // 过滤出所有 ID 包含 'draw' 的图层
            const drawLayers = allLayers.filter((layer) => layer.id.includes('draw'));
            let coordinates = [];
            drawLayers.forEach((layer) => {
                const layerId = layer.id;
                // 获取图层的 source 和 sourceLayer
                const sourceId = layer.source;
                const sourceLayer = layer['source-layer'];
                // 获取对应的 source 数据
                const sourceData = map.getSource(sourceId)._data;
                if (sourceData && sourceData.features) {
                    sourceData.features.forEach((feature) => {
                        if (feature.properties && feature.properties['source-layer'] === sourceLayer) {
                            coordinates.push(feature.geometry.coordinates);
                            map.addSource(`point${layer.id}`, {
                                type: 'geojson',
                                data: {
                                    type: 'FeatureCollection',
                                    features: [
                                        {
                                            type: 'Feature',
                                            geometry: {
                                                type: 'Point',
                                                coordinates: feature.geometry.coordinates[0]
                                            }
                                        }
                                    ]
                                }
                            });
                            map.addLayer({
                                id: `point${layer.id}`,
                                type: 'circle',
                                source: `point${layer.id}`,
                                paint: {
                                    'circle-radius': 3,
                                    'circle-color': '#f00'
                                }
                            });
                            requestAnimationFrame(this.animatePoint(10, feature.geometry.coordinates, `point${layer.id}`));
                        }
                    });
                }
            });
            console.log(coordinates);
            requestAnimationFrame(this.animatePoint(10, item));
            return;
            const lines = [];
            const points = [];
            let animationId;

            function addLine(coords) {
                const id = `line-${lines.length}`;
                map.addLayer({
                    id: id,
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: coords
                            }
                        }
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#888',
                        'line-width': 8
                    }
                });
            }
            lines.push(id);

            const pointId = `point-${points.length}`;
            map.addLayer({
                id: pointId,
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Point',
                            coordinates: coords[0]
                        }
                    }
                },
                paint: {
                    'circle-radius': 5,
                    'circle-color': '#f00'
                }
            });
            points.push({ id: pointId, coords, t: 0 });

            map.on('click', (e) => {
                if (lines.length > 0) {
                    const lastLineCoords = map.getSource(lines[lines.length - 1])._data.geometry.coordinates;
                    addLine([lastLineCoords[lastLineCoords.length - 1], [e.lngLat.lng, e.lngLat.lat]]);
                } else {
                    addLine([
                        [e.lngLat.lng, e.lngLat.lat],
                        [e.lngLat.lng, e.lngLat.lat]
                    ]);
                }
            });
        },
        // 创建标签
        addmak(e) {
            console.log(e);
            // console.log(this.provincelist[0]);
            let markerId = mapBoxApiClass.addMarker(this.provincelist, this.addmak);
        },
        // 创建热力图层
        addrlLayer() {
            // 添加热力图图层
            map.addSource('heatmap-data', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            properties: { weight: 10 },
                            geometry: { type: 'Point', coordinates: [116.4, 39.9] }
                        },
                        {
                            type: 'Feature',
                            properties: { weight: 40 },
                            geometry: { type: 'Point', coordinates: [116.41, 39.91] }
                        }
                        // 更多点数据...
                    ]
                }
            });
            map.addLayer({
                id: 'heatmap-layer',
                type: 'heatmap',
                source: 'heatmap-data',
                paint: {
                    'heatmap-weight': ['interpolate', ['linear'], ['get', 'weight'], 0, 0, 10, 1],
                    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
                    'heatmap-color': [
                        'interpolate',
                        ['linear'],
                        ['heatmap-density'],
                        0,
                        'rgba(0, 0, 255, 0)',
                        0.2,
                        'rgb(0, 0, 255)',
                        0.4,
                        'rgb(0, 255, 0)',
                        0.6,
                        'rgb(255, 255, 0)',
                        0.8,
                        'rgb(255, 165, 0)',
                        1,
                        'rgb(255, 0, 0)'
                    ],
                    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 7, 9, 40],
                    'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0.3, 9, 0]
                }
            });
        },

        animatePoint() {
            points.forEach((point) => {
                point.t += 0.01;
                if (point.t > 1) {
                    point.t = 0;
                }
                const [start, end] = point.coords;
                const lng = (1 - point.t) * start[0] + point.t * end[0];
                const lat = (1 - point.t) * start[1] + point.t * end[1];
                map.getSource(point.id).setData({
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    }
                });
            });
            animationId = requestAnimationFrame(animate);
        },

        interpolatePoints(start, end, numPoints) {
            const points = [];
            const [x1, y1] = start;
            const [x2, y2] = end;

            for (let i = 0; i <= numPoints; i++) {
                const t = i / numPoints; // 插值参数 t 的范围是 0 到 1
                const x = (1 - t) * x1 + t * x2;
                const y = (1 - t) * y1 + t * y2;
                points.push([x, y]);
            }

            return points;
        },

        //组装导航路线数据
        lineToPlan() {
            let res = {
                type: 'FeatureCollection',
                features: []
            };
            for (const key in linePlan) {
                if (Object.hasOwnProperty.call(linePlan, key)) {
                    const feature = linePlan[key].features[0];
                    feature.id = feature.properties.id;
                    res.features.push(feature);
                }
            }
            if (map.getLayer('lineToPlan')) {
                this.cleacarLayers();
                return;
            }
            mapBoxApiClass.addRoutelayer('lineToPlan', 'line', res, {
                'line-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#0b4975', '#077692'],
                'line-width': 14,
                'line-opacity': 0.5
            });
            this.changeLinePlan('lineToPlan');
        },
        //导航点击切换逻辑
        changeLinePlan(hoveredStateIds) {
            let hoveredStateId = null;
            let oldhoveredStateId = null;
            mapBoxApiClass.onSetMapEvent(
                (e) => {
                    map.getCanvas().style.cursor = 'pointer';
                    if (e.features.length > 0) {
                        hoveredStateId = e.features[0].properties.id;
                        if (hoveredStateId) {
                            map.setFeatureState({ source: hoveredStateIds, id: hoveredStateId }, { hover: true });
                            if (oldhoveredStateId) {
                                map.setFeatureState({ source: hoveredStateIds, id: oldhoveredStateId }, { hover: false });
                            }
                            oldhoveredStateId = hoveredStateId;
                        }
                    }
                },
                'click',
                hoveredStateIds
            );
        },
        //清除绘制路线
        cleaLayerAndSourceToregex(regex = []) {
            regex.forEach((reg) => {
                // 获取地图中所有图层和源
                const allLayersAndSources = map.getStyle().layers.concat(map.getStyle().sources);
                // 遍历图层和源并移除匹配的项
                allLayersAndSources.forEach((layerOrSource) => {
                    if (layerOrSource && layerOrSource.id && layerOrSource.id.match(reg)) {
                        // 移除匹配的图层或源
                        map.removeLayer(layerOrSource.id);
                        map.removeSource(layerOrSource.id);
                    }
                });
            });
        },
        //清除图层
        cleacarLayers() {
            if (map.getLayer('lineToPlan')) {
                map.removeLayer('lineToPlan');
                map.removeSource('lineToPlan');
            }
            if (map.getLayer(`${this.previousPro}`)) {
                map.removeLayer(`${this.previousPro}`);
                map.removeSource(`${this.previousPro}`);
                this.previousPro = '';
            }
        },
        //初始化vue数据
        initVueData() {
            this.openDrawLine = false;
            //绘制保持的数;
            this.drawLine = [];
            //当前坐;
            this.clickPoint = [];
            //预绘制图层递增i;
            this.sourIndex = 1;
        }
    },
    computed: {
        mapSize() {
            let styleObj = {
                width: this.mapWidth,
                height: this.mapHeight
            };
            return styleObj;
        }
    }
};
</script>
<style>
.maginten {
    margin: 0 10px;
}
.fontSize {
    font-size: 13px;
}
.felxBox {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}
/* @import './comm/style/map.css'; */
</style>

