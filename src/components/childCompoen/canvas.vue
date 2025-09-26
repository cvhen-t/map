<template>
    <div style="width:500px;height:150px">
        <canvas width="500"
                height="150"
                id='myCanvas'
                style='width:100%;height:100%'> </canvas>
    </div>
</template>

<script>
import { manualCheckList } from '@/api/index';
export default {
    props: {
        canVasData: {
            type: Array,
            default: () => []
        },
        canVasstyle: {
            type: Object,
            default: {
                width: 500,
                height: 150
            }
        }
    },
    created() {},
    mounted() {
        let param = {
            containerName: []
        };
        this.drawBackground();
        this.drawLineChart(this.data);
        this.drawPoints();
    },

    data() {
        return {
            canvasctx: null,
            data: [
                { value: 73, color: 'blue' },
                { value: 79, color: 'yellow' },
                { value: 76, color: 'blue' },
                { value: 71, color: 'blue' },
                { value: 68, color: 'blue' },
                { value: 77, color: 'black' },
                { value: 91, color: 'blue' },
                { value: 82, color: 'yellow' },
                { value: 72, color: 'blue' },
                { value: 73, color: 'blue' }
            ],
            maxValue: 230,
            minValue: 0
        };
    },
    methods: {
        //绘制背景
        drawBackground() {
            const dpr = window.devicePixelRatio || 1;
            const canvas = document.getElementById('myCanvas');
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height - 10;
            const segmentWidth = width / 11;

            // canvas.width = width * dpr; // 物理像素宽度
            // canvas.height = height * dpr; // 物理像素高度
            // ctx.scale(dpr, dpr); // 缩放绘图上下文

            ctx.fillStyle = '#394042';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#e0e0e0';
            // 竖线
            // for (let i = 1; i < this.data.length + 1; i++) {
            //     ctx.setLineDash([3, 2]);
            //     ctx.beginPath();
            //     ctx.moveTo(segmentWidth * i, 10);
            //     ctx.lineTo(segmentWidth * i, height - 2);
            //     ctx.stroke();
            // }
            // 绘制数据区间 60-120 的两条线
            ctx.strokeStyle = '#808080';
            const minvaluey = height - (this.maxValue / this.maxValue) * height;
            const maxvaluey = height - (this.minValue / this.maxValue) * height;
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 2]);
            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.moveTo(10, minvaluey + 10);
            ctx.lineTo(width, minvaluey + 10);
            ctx.stroke();
            ctx.font = '10px Arial';
            ctx.fillStyle = 'blue';
            ctx.fillText('120', 5, minvaluey + 13); // 标识 120

            ctx.lineWidth = 1;
            ctx.setLineDash([3, 2]);
            ctx.strokeStyle = 'green';
            ctx.beginPath();
            ctx.moveTo(0, maxvaluey);
            ctx.lineTo(width, maxvaluey);
            ctx.stroke();
            ctx.font = '10px Arial';
            ctx.fillStyle = 'green';
            ctx.fillText('60', 5, maxvaluey + 2); // 标识 120
        },
        // 绘制折线图
        drawLineChart(data) {
            const canvas = document.getElementById('myCanvas');
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            const segmentWidth = width / 11;
            ctx.lineWidth = 1;

            // 绘制折线的渐变色
            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, 'green');
            gradient.addColorStop(1, 'yellow');
            ctx.strokeStyle = gradient;
            ctx.setLineDash([]);

            ctx.beginPath();
            const startPoint = {
                x: segmentWidth,
                y:
                    data[0].value < 60
                        ? height - (this.minValue / this.maxValue) * height
                        : height - (data[0].value / this.maxValue) * height
            };

            // ctx.moveTo(startPoint.x, startPoint.y);
            // 画贝塞尔曲线
            // 初始点的前一个控制点
            let previousControlPoint = startPoint;
            data.forEach((point, index) => {
                const x = segmentWidth * (index + 1);
                const y =
                    point.value < 60 ? height - (this.minValue / this.maxValue) * height : height - (point.value / this.maxValue) * height;
                // 使用贝塞尔曲线绘制平滑曲线
                const cp1x = (previousControlPoint.x + x) / 2;
                const cp1y = previousControlPoint.y;
                const cp2x = (previousControlPoint.x + x) / 2;
                const cp2y = y;
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
                previousControlPoint = { x, y };
            });
            ctx.stroke();
        },
        //绘制点
        drawPoints() {
            let data = this.data;
            const canvas = document.getElementById('myCanvas');
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            const segmentWidth = width / 11;
            data.forEach((point, index) => {
                const x = segmentWidth * (index + 1); // 数据点在等分线上的位置
                const y =
                    point.value < 60 ? height - (this.minValue / this.maxValue) * height : height - (point.value / this.maxValue) * height;

                ctx.beginPath();
                ctx.arc(x, y, 3, 0, 2 * Math.PI);
                ctx.fillStyle = point.color;
                ctx.fill();
                ctx.fillStyle = 'white';
                ctx.font = '9px Arial';
                ctx.fillText(point.value, x - 12, y - 8); // 在点上方显示数据
            });
        }
    }
};
</script>

<style>
</style>