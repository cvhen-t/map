<template>
    <div>
        <!-- 画布 -->
        <canvas ref="canvas"
                width="500"
                height="300"
                style="border: 1px solid #000;"></canvas>

        <!-- 导出按钮 -->
        <button @click="exportPDF">导出为PDF</button>
    </div>
</template>
  
  <script>
import { jsPDF } from 'jspdf';

export default {
    methods: {
        exportPDF() {
            const canvas = this.$refs.canvas;
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);

            pdf.save('canvas-export.pdf');
        }
    },

    mounted() {
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillRect(50, 50, 100, 100);
    }
};
</script>
  <style scoped>
button {
    margin-top: 10px;
}
</style>
  