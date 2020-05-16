import React, { Component } from 'react';
import Chart from '../chart/Chart';

import './app.css';
const chartData = require('../../statics/data.json');

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            {
              chartData.map(item => (
                <div className="col-md-12 col-lg-6">
                  <Chart title={item.title} data={item.results} hTitle="Time of Day" vTitle="Values"/>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
