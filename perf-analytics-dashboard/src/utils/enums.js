export const METRICS = {
  TTFB: 'ttfb',
  FCP: 'fcp',
  DOM_LOAD: 'dom_load',
  WINDOW_LOAD: 'window_load'
};

export const METRIC_TITLES = {
  [METRICS.TTFB]: 'Time to first byte (TTFB)',
  [METRICS.FCP]: 'First Contentful Paint (FCP)',
  [METRICS.DOM_LOAD]: 'DOM Load (ms)',
  [METRICS.WINDOW_LOAD]: 'Window Load (ms)',
};
