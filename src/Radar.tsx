import { useState, useEffect } from 'react';
import { Radar } from '@ant-design/plots';

const DemoRadar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('http://localhost:3000/api/v2/job-boards/f8e27753-122f-47b7-be0d-c3d46f25a403/soft-skills/charts')
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'name',
    yField: 'proficiency',
    seriesField: 'owner',
    meta: {
      score: {
        alias: '分数',
        min: 0,
        max: 80,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    },
    area: {},
    point: {
      size: 2,
    },
  };

  return <Radar {...config} />;
};

export default DemoRadar