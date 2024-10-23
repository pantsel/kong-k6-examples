import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 0 },    // Start with 0 users
        { duration: '10s', target: 500 }, // Spike to 500 users in 10 seconds
        { duration: '30s', target: 500 }, // Hold at 500 users for 30 seconds
        { duration: '10s', target: 0 },    // Drop back to 0 users
    ],
    thresholds: {
        'http_req_duration': ['p(95)<1200'], // 95% of requests should be below 1200ms during spike
        'http_req_failed': ['rate<0.05'],    // Error rate should be below 5%
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