import React, { useState, useEffect } from 'react';
import GoogleChart from "react-google-charts";

const Chart = (props) => {
  // useState
  const [data, setData] = useState([]);

  // useEffect
  useEffect(() => {
    const { data, hTitle, vTitle } = props;
    const chartData = data.map(item => {
      return [new Date(item.date), item.value];
    });
    setData([[hTitle, vTitle], ...chartData]);
  }, [props.data]);

  const { title, hTitle, vTitle } = props;

  return (
    <GoogleChart
      width={'600px'}
      height={'400px'}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title,
        hAxis: {
          title: hTitle,
        },
        vAxis: {
          title: vTitle,
        },
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default Chart;
