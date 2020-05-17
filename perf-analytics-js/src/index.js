import { getTTFB, getFCP } from 'web-vitals';

const API_BASE_URL = 'http://localhost:3002';

const METRICS = {
  TTFB: 'ttfb',
  FCP: 'fcp',
  DOM_LOAD: 'dom_load',
  WINDOW_LOAD: 'window_load'
};

class PerfAnalytics {
  constructor () {
    this.sendTTFB();
    this.sendFCP();
    document.addEventListener('DOMContentLoaded', this.sendDOMLoad.bind(this), false);
    window.addEventListener('load', this.sendWindowLoad.bind(this), false);
  }

  sendToAnalytics (metric, value) {
    fetch(`${API_BASE_URL}/collect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        host: location.host || 'localhost',
        metric,
        value
      })
    });
  }

  toFixed (value, digit) {
    return parseFloat(Number(value).toFixed(digit));
  }

  sendTTFB () {
    getTTFB((metric) => {
      const { requestStart, responseStart } = metric.entries[0];
      const value = responseStart - requestStart;
      this.sendToAnalytics(METRICS.TTFB, this.toFixed(value, 2));
    });
  }

  sendFCP () {
    getFCP((metric) => {
      this.sendToAnalytics(METRICS.FCP, this.toFixed(metric.value, 2));
    });
  }

  sendDOMLoad () {
    const value = performance.now();
    this.sendToAnalytics(METRICS.DOM_LOAD, this.toFixed(value, 2));
  }

  sendWindowLoad () {
    const value = performance.now();
    this.sendToAnalytics(METRICS.WINDOW_LOAD, this.toFixed(value, 2));
  }
}

const instance = new PerfAnalytics();

export default instance;
