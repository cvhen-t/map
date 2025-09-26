import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';
class mapBoxApi {
    map = null;
    constructor(map) {
        this.map = map;
    }

    //添加图层
    addRoutelayer(id, type = 'line', data, paintOpt = { color: '#14dbf5', width: 1, opacity: 1 }) {
        if (this.map.getLayer(id)) return;
        // let obj = {
        //     'line-width': paintOpt.width || 1,
        //     'line-opacity': paintOpt.opacity,
        //     'line-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#0b4975', paintOpt.color]
        // };
        // if (paintOpt.dasharray) obj['line-dasharray'] = paintOpt.dasharray;
        // let layout = {
        //     'text-field': ['get', 'title'], // 正确的属性名称是 'text-field'
        //     'text-size': 16,
        //     'text-anchor': 'top'
        // };
        let addLayerData = {
            id,
            type,
            source:
                typeof data === 'string'
                    ? data
                    : {
                          type: 'geojson',
                          lineMetrics: true,
                          // generateId: true,
                          data
                      }
        };

        if (type === 'symbol') addLayerData['layout'] = paintOpt;
        if (type === 'line') addLayerData['paint'] = paintOpt;
        if (type === 'fill') addLayerData['paint'] = paintOpt;

        this.map.addLayer(addLayerData);
    }

    //定位
    flyToCenten(data, zoom, centerList = []) {
        let center = [];
        if (data) {
            center = turf.centerOfMass(data).geometry.coordinates;
        }
        map.flyTo({
            center: centerList.length > 0 ? centerList : center,
            zoom,
            speed: 2,
            curve: 1
        });
    }
    fitBoundsTomap(data, padding = 10) {
        const bbox = turf.bbox(data);
        map.fitBounds(bbox, {
            padding: { top: padding, right: padding, bottom: padding, left: padding }, // 可选的边距
            maxZoom: 15, // 设置最大 zoom
            linear: true // 启用平滑过渡
        });
    }

    // 添加mak
    addMarker(data, clickFun) {
        let markerIdList = [];
        for (const marker of data) {
            // Create a DOM element for each marker.
            const el = document.createElement('div');
            const width = 100;
            const height = 40;
            el.className = 'marker';
            el.style.backgroundImage = `url(https://picsum.photos/id/${837}/${width}/${height})`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.backgroundSize = '100%';
            el.style['border-radius'] = '10px';

            el.addEventListener('click', (e) => {
                markerIdList.forEach((item) => {
                    item.remove();
                });
                // clickFun(e);
            });
            if (marker.properties.center !== undefined) {
                let markerId = new mapboxgl.Marker(el);
                markerId.setLngLat(marker.properties.center).addTo(map);
                markerIdList.push(markerId);
            }
            // Add markers to the map.
        }
        return markerIdList;
    }
    // 设置地图事件方法
    onSetMapEvent(callBack, type = 'click', LayerId = '') {
        let that = this;
        if (!LayerId) {
            that.map.on(type, callBack);
        } else {
            that.map.on(type, LayerId, callBack);
        }
    }

    // 取消设置地图事件方法
    offSetMapEvent(callBack, type = 'click', LayerId = '') {
        let that = this;
        if (!LayerId) {
            that.map.off(type, callBack);
        } else {
            that.map.off(type, LayerId, callBack);
        }
    }

    //获取线路长度
    getLineDistance(data) {
        return turf.length(data);
    }
    //获取中心点
    getCenten(data) {
        const centerObj = turf.centerOfMass(data);
        let center = centerObj.geometry.coordinates;
        return center;
    }
    animatePoint(timestamp, lineCoordinates, animatePoint) {
        var progress = (timestamp / 10000) % 1;
        var point = turf.along(turf.lineString(lineCoordinates), progress * turf.length(turf.lineString(lineCoordinates))).geometry
            .coordinates;
        map.getSource('point').setData({
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: point
                    }
                }
            ]
        });

        requestAnimationFrame(animatePoint);
    }
}
export default mapBoxApi;
