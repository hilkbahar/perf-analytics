import React, { Component } from 'react';
import Chart from '../chart/Chart';

import './app.css';
const chartData = require('../../statics/data.json');

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-6">Logo</div>
              <div className="col-6">Profile</div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="row">
            {
              chartData.map(item => (
                <div className="col-6">
                  <Chart title={item.title} data={item.results} hTitle="Values" vTitle="Minutes"/>
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
