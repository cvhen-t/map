let data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
let order = [2, 3, 5]; // 指定排序顺序的 id

// 使用 Map 预处理排序优先级，O(n) 复杂度
let orderMap = new Map(order.map((id, index) => [id, index]));
console.log(orderMap, Number.MAX_VALUE);
// 排序逻辑
data.sort((a, b) => {
    let indexA = orderMap.has(a.id) ? orderMap.get(a.id) : Number.MAX_VALUE;
    let indexB = orderMap.has(b.id) ? orderMap.get(b.id) : Number.MAX_VALUE;
    return indexA - indexB;
});

console.log(data);
