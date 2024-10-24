import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    scenarios: {
        normal_load: {
            executor: 'constant-vus',
            vus: 50,
            duration: '10s',
            startTime: '0s', // Starts immediately
        },
        peak_load: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '10s', target: 200 }, // ramp up to 200 users
                { duration: '10s', target: 200 }, // hold peak load
            ],
            startTime: '10s', // Start peak load after 10s
        },
    },
    thresholds: {
        'http_req_duration{scenario:load_test}': ['p(95)<400'], // SLO: 95% of requests should be below 400ms during normal load
        'http_req_duration{scenario:peak_load}': ['p(95)<1000'], // SLO: 95% of requests should be below 1000ms during peak load
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