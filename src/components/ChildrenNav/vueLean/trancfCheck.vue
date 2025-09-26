<template>
    <div>
        <div v-for="(box, index) in boxes"
             :key="index"
             @contextmenu.prevent="openMenu($event, index)"
             class="context-menu-target">
            右键点击 {{ box.name }}
        </div>

        <ul v-if="menuVisible"
            :style="{ top: menuY + 'px', left: menuX + 'px' }"
            class="context-menu">
            <li v-for="(item, idx) in currentMenuItems"
                :key="idx"
                @click="doAction(item)">
                {{ item.label }}
            </li>
        </ul>
    </div>
</template>
  
  <script>
export default {
    data() {
        return {
            menuVisible: false,
            menuX: 0,
            menuY: 0,
            boxes: [
                {
                    name: 'Box 1',
                    menu: [
                        { label: '编辑', action: 'edit1' },
                        { label: '删除', action: 'delete1' }
                    ]
                },
                {
                    name: 'Box 2',
                    menu: [
                        { label: '复制', action: 'copy2' },
                        { label: '分享', action: 'share2' }
                    ]
                }
            ],
            currentMenuItems: []
        };
    },
    methods: {
        openMenu(event, index) {
            this.menuX = event.clientX;
            this.menuY = event.clientY;
            this.currentMenuItems = this.boxes[index].menu;
            this.menuVisible = true;

            document.addEventListener('click', this.closeMenu);
        },
        closeMenu() {
            this.menuVisible = false;
            document.removeEventListener('click', this.closeMenu);
        },
        doAction(item) {
            console.log('执行:', item.action);
            this.closeMenu();
        }
    }
};
</script>
  
  <style scoped>
.context-menu-target {
    width: 200px;
    height: 100px;
    margin: 10px;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
}
.context-menu {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    padding: 5px 0;
    list-style: none;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}
.context-menu li {
    padding: 8px 16px;
    cursor: pointer;
}
.context-menu li:hover {
    background-color: #f0f0f0;
}
</style>
  