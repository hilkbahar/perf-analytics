class PerfAnalytics {
  constructor () {
    this.performanceTiming = window.performance.timing;
    this.firstHiddenTime = document.visibilityState === 'hidden' ? 0 : Infinity;
    document.addEventListener('visibilitychange', this.handlerVisibilityChange, { once: true });
    this.init();
  }

  handlerVisibilityChange (event) {
    this.firstHiddenTime = Math.min(this.firstHiddenTime, event.timeStamp);
  }

  get timeToFirstByte () {
    return this.performanceTiming.responseStart - this.performanceTiming.requestStart;
  }

  fetchFirstContentfulPaint () {
    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach(entry => {
        if (entry.name === 'first-contentful-paint' && entry.startTime < this.firstHiddenTime) {
          console.log('*** fcp (first contentful paint', entry.startTime);
        }
      });
    }).observe({
      type: 'paint',
      buffered: true
    });
  }

  init () {
    console.log('*** ttfb (time to first byte)', this.timeToFirstByte);
    this.fetchFirstContentfulPaint();
  }
}

const instance = new PerfAnalytics();

export default instance;
