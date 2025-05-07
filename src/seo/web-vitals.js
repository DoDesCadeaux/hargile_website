import {onCLS, onFCP, onFID, onLCP, onTTFB} from 'web-vitals';

export function reportWebVitals(metric) {
    // You can send these metrics to your analytics platform
    // Example: Google Analytics 4, custom endpoint, etc.
    console.log(metric);

    // If you want to send to a custom endpoint:
    // const body = JSON.stringify(metric);
    // const url = 'https://example.com/analytics';

    // if (navigator.sendBeacon) {
    //   navigator.sendBeacon(url, body);
    // } else {
    //   fetch(url, { body, method: 'POST', keepalive: true });
    // }
}

export function measureWebVitals() {
    // Core Web Vitals
    onCLS(reportWebVitals);
    onFID(reportWebVitals);
    onLCP(reportWebVitals);

    // Additional metrics
    onFCP(reportWebVitals);
    onTTFB(reportWebVitals);
}
