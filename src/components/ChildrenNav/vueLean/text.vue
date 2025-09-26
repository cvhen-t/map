const barOption = {
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        rotate: 30
      },
      data: data.map(function (item) {
        return item.name;
      })
    },
    animationDurationUpdate: 3000,
    series: {
      type: 'bar',
      id: 'population',
      data: data.map(function (item) {
        return item.value;
      }),
      universalTransition: true
    }
  };

  const mapOption = {
    visualMap: {
      left: 'right',
      min: 500000,
      max: 38000000,
      inRange: {
        // prettier-ignore
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      },
      text: ['High', 'Low'],
      calculable: true
    },
    series: [
      {
        id: 'population',
        type: 'map',
        roam: true,
        map: 'USA',
        animationDurationUpdate: 1000,
        universalTransition: true,
        data: data
      }
    ]
  };

  let currentOption = mapOption;
  myChart.setOption(mapOption);
  setInterval(function () {
    currentOption = currentOption === mapOption ? barOption : mapOption;
    myChart.setOption(currentOption, true);
  }, 3000);