import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GoogleChart from "react-google-charts";

const Chart = (props) => {
  // useState
  const [data, setData] = useState([]);

  // useEffect
  useEffect(() => {
    const { data, hTitle, vTitle } = props;
    const chartData = data.map(item => {
      const date = new Date(item.date);
      return [[date.getHours(), date.getMinutes(), date.getSeconds()], item.value];
    });
    setData([[hTitle, vTitle], ...chartData]);
  }, [props.data]);

  const { title, hTitle, vTitle } = props;

  return (
    <GoogleChart
      width={'100%'}
      height={'400px'}
      chartType="LineChart"
      loader={<div>Loading Charts of {title}</div>}
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

Chart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired,
  hTitle: PropTypes.string,
  vTitle: PropTypes.string
};

export default Chart;
