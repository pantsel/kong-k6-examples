import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 100 },  // Ramp up to 100 users in 30 seconds
        { duration: '1m', target: 500 },   // Spike to 500 users for 1 minute
        { duration: '30s', target: 0 },    // Scale down
    ],
    thresholds: {
        'http_req_duration': ['p(95)<1000'],  // 95% of requests should be below 1000ms under stress
        'http_req_failed': ['rate<0.01'],     // Error rate should be below 1%
    },
};

export default function () {
    let params = {
        headers: {
            'apikey': 'k6test',
        },
    };
    let res = http.get('http://localhost:8000/test', params);
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}