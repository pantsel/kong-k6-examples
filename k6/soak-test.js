import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 100,               // Constant 100 virtual users
    duration: '12h',        // Run the test for 12 hours
    thresholds: {
        'http_req_duration': ['p(95)<600'],  // 95% of requests should be below 600ms
        'http_req_failed': ['rate<0.01'],    // Error rate should be below 1%
    },
};

export default function () {
    http.get('http://localhost:8000/mock');
    let params = {
        headers: {
            'apikey': 'k6test',
        },
    };
    let res = http.get('http://localhost:8000/test', params);
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}