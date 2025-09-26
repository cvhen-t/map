let bjToZtPlanA = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            id: 1,
            properties: { id: 1 },
            geometry: {
                coordinates: [
                    [116.36663290676319, 39.902845282438136],
                    [108.95793928268256, 34.36336802107151],
                    [103.71550057317057, 27.332146937222717]
                ],
                type: 'LineString'
            }
        }
    ]
};

let bjToZtPlanB = {
    type: 'FeatureCollection',
    features: [
        {
            id: 2,
            type: 'Feature',
            properties: {
                id: 2
            },
            geometry: {
                coordinates: [
                    [116.36663290676319, 39.902845282438136],
                    [103.9280034356326, 36.02247609176638],
                    [103.71480709037507, 27.374441322797608]
                ],
                type: 'LineString'
            }
        }
    ]
};

let bjToZtPlanC = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            id: 3,
            properties: {
                id: 3
            },
            geometry: {
                coordinates: [
                    [116.31360578974648, 39.90687584614031],
                    [112.19688370806671, 31.947145160344775],
                    [111.78592929762516, 28.93691272603479],
                    [103.62488635942265, 27.328882146323792]
                ],
                type: 'LineString'
            }
        }
    ]
};
let linePlan = {
    bjToZtPlanA,
    bjToZtPlanB,
    bjToZtPlanC
};
let oldHome = {
    type: 'FeatureCollection',
    features: [
        {
            id: 2,
            type: 'Feature',
            properties: { id: 2 },
            geometry: {
                coordinates: [
                    [116.37713674240064, 28.68259721758372],
                    [116.37770972911903, 28.681307006221928],
                    [116.38087388910805, 28.68265865582353],
                    [116.38045369884776, 28.68352995789023],
                    [116.37715584195774, 28.682574876396856],
                    [116.37769699608094, 28.681323762315287]
                ],
                type: 'LineString'
            }
        }
    ]
};

export { linePlan, oldHome };

// "circle-color": [
//     "case",
//     ["boolean", ["feature-state", "hover"], false],
//     "#ccdeff",
//     "#ffffff"
//   ],
