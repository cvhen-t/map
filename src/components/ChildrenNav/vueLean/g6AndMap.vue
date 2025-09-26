<!-- <template>
    <div id="container">
        <div id="map"></div>
    </div>
</template>
  
  <script>
import mapboxgl from 'mapbox-gl';
import G6 from '@antv/g6';
export default {
    name: 'MapWithG6',
    data() {
        return {
            map: null,
            graph: null
        };
    },
    mounted() {
        // 初始化 Mapbox
        mapboxgl.accessToken = 'pk.eyJ1Ijoid3V5YW5nd2VuIiwiYSI6ImNrcWZ5MmhwcDE5eTkyeG56ZXVyY3VsZ3EifQ.90L3IQF1bIUc1qTShDlq-A';

        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [0, 0],
            zoom: 2
        });

        // 初始化 G6
        const g6Canvas = document.createElement('canvas');
        g6Canvas.style.position = 'absolute';
        g6Canvas.style.top = 0;
        g6Canvas.style.left = 0;
        g6Canvas.style.width = '100%';
        g6Canvas.style.height = '100%';
        document.getElementById('container').appendChild(g6Canvas);

        this.graph = new G6.Graph({
            container: g6Canvas,
            width: window.innerWidth,
            height: window.innerHeight,
            modes: {
                default: ['drag-node']
            },
            defaultNode: {
                size: 30,
                color: '#5B8FF9'
            },
            defaultEdge: {
                style: {
                    stroke: '#A3B1BF',
                    lineWidth: 2
                }
            },
            fitView: true
        });

        // 定义两个三角形的节点
        const nodes = [
            { id: 'node1', x: 100, y: 100, label: 'Node 1' },
            { id: 'node2', x: 400, y: 100, label: 'Node 2' }
        ];

        // 定义一个连接这两个节点的边
        const edges = [{ source: 'node1', target: 'node2' }];

        this.graph.data({
            nodes,
            edges
        });

        this.graph.render();

        // Mapbox 加载完成后，可以更新视图
        this.map.on('load', () => {
            this.map.jumpTo({ center: [0, 0], zoom: 2 });
        });
    }
};
</script>
  
  <style scoped>
#container {
    position: relative;
    height: 100vh;
}
#map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80%;
}
</style>
   -->