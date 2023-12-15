import { useState, useEffect } from 'react';
import { RadialBar } from '@ant-design/plots';

const DemoRadialBar = () => {
  const [data, setData] = useState([]);
   
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('http://localhost:3000/api/v2/job-boards/f8e27753-122f-47b7-be0d-c3d46f25a403/fit-skills/charts')
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    width: 400,
    height: 244,
    autoFit: false,
    appendPadding: [50, 0, 50, 0],
    data,
    xField: 'name',
    yField: 'percent',
    radius: 0.8,
    innerRadius: 0.2,
    xAxis: false,
    theme: 'dark',
    barBackground: {
      style: {
        fill: 'rgba(255,255,255,0.45)',
      },
    },
    barStyle: {
      lineCap: 'round',
    },
    minBarWidth: 16,
    maxBarWidth: 16,
    colorField: 'name',
   color: ({ name }) => {
      return data.find((d) => d.name === name).color;
    },
    annotations: data.map((d) => ({
      type: 'html',
      position: [d.name, 0],
      html: `<div style="width:11px;height:11px;transform:translate(-50%, -50%)">
      <img
        style="width:11px;height:11px;display: block;"
        src="${d.icon}"
        alt=""
      />
    </div>`,
    })),
  };
  return <RadialBar {...config} />;
};

export default DemoRadialBar