import React, { Component } from 'react';
import axios from '../../utils/axios';
import { METRICS, METRIC_TITLES } from '../../utils/enums';
import Chart from '../chart/Chart';

import './app.css';

class App extends Component{
  constructor (props) {
    super(props);
    this.state = {
      chartData: {
        [METRICS.TTFB]: [],
        [METRICS.FCP]: [],
        [METRICS.DOM_LOAD]: [],
        [METRICS.WINDOW_LOAD]: [],
      },
      host: '127.0.0.1',
      loading: false
    };
  }

  async componentDidMount () {
    await this.fetchAll();
  }

  async fetch (metric) {
    const { chartData, host } = this.state;
    const { data } = await axios.post('/stats/_query?limit=10', { host, metric });
    this.setState({
      chartData: {
        ...chartData,
        [metric]: data.items.map(item => ({ value: item.value, date: item.created_at }))
      }
    });
  }

  fetchAll() {
    return Promise.all([
      this.fetch(METRICS.TTFB),
      this.fetch(METRICS.FCP),
      this.fetch(METRICS.DOM_LOAD),
      this.fetch(METRICS.WINDOW_LOAD),
    ]);
  }

  async submit() {
    this.setState({loading: true});
    await this.fetchAll();
    this.setState({loading: false});
  }

  render () {
    const {chartData, host, loading} = this.state;
    return (
      <div className="App">
        <div className="container">
          <div style={{marginBottom: 50, marginTop: 50}}>
            <label htmlFor="host">Enter a hostname:</label>
            <input type="text" name="host" value={host} onChange={event => this.setState({host: event.target.value})} style={{marginLeft: 10}}/>
            <input type="button" value="Submit" onClick={() => this.submit()} disabled={loading} style={{marginLeft: 10}}/>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <Chart title={METRIC_TITLES[METRICS.TTFB]} data={chartData[METRICS.TTFB]} hTitle="Time of Day" vTitle="Values"/>
            </div>
            <div className="col-md-12 col-lg-6">
              <Chart title={METRIC_TITLES[METRICS.FCP]} data={chartData[METRICS.FCP]} hTitle="Time of Day" vTitle="Values"/>
            </div>
            <div className="col-md-12 col-lg-6">
              <Chart title={METRIC_TITLES[METRICS.DOM_LOAD]} data={chartData[METRICS.DOM_LOAD]} hTitle="Time of Day" vTitle="Values"/>
            </div>
            <div className="col-md-12 col-lg-6">
              <Chart title={METRIC_TITLES[METRICS.WINDOW_LOAD]} data={chartData[METRICS.WINDOW_LOAD]} hTitle="Time of Day" vTitle="Values"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
