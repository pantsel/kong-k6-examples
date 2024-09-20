import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 100,
    duration: '10s',
    thresholds: {
        'http_req_duration': ['p(95)<500'],  // SLO: 95% of requests should be below 500ms
        'http_req_failed': ['rate<0.01'],    // SLO: Error rate should be less than 1%
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