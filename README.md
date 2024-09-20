# Kong k6 performance testing examples

## Setup up K6 and Kong for Testing

Install k6

```bash
brew install k6  # macOS
sudo apt install k6  # Ubuntu/Debian
choco install k6  # Windows
```

Spin up the local environment

```bash
docker compose up -d
```

After everything is up and running:

- Kong dbless gateway will be available at `http://localhost:8000` (Configured with the services and plugins defined in `./kong.yaml`)
- Grafana with Kong and Node exporter dashboards will be available at `http://localhost:3000` (Login using admin/admin)
- Prometheus will be up and running at `http://localhost:9090`

## Basic K6 Test Scripts

### Load Testing with SLO-based Thresholds

Example code:

```javascript
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
```

Explanation:

- **vus**: The number of virtual users simulating requests.
- **duration**: The test will run for 1 minute.
- **Thresholds**:
    - 95% of requests should be completed within 500ms.
    - Less than 1% of requests should fail.

Run the test:

```bash
k6 run ./k6/load-test.js
```

### Stress Testing with SLO-based Thresholds

Example code:

```javascript
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
```

Explanation:

**Stages**:
- Ramp up traffic from 0 to 100 users in 30 seconds.
- Spike traffic to 500 users for 1 minute.
- Scale back down.

**Thresholds**:
- Ensure 95% of requests respond within 1000ms even under heavy load.
- Maintain less than a 1% failure rate.

Run the test:

```bash
k6 run ./k6/stress-test.js
```

### Spike Testing with SLO-based Thresholds

Example code:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 0 },    // Start with 0 users
        { duration: '10s', target: 1000 }, // Spike to 1000 users in 10 seconds
        { duration: '30s', target: 1000 }, // Hold at 1000 users for 30 seconds
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
```

Explanation:

- Simulates a sudden spike in users (up to 1000).
- Thresholds allow for a higher response time (1200ms) and failure rate (5%) during the spike.

Run the test:

```bash
k6 run ./k6/spike-test.js
```

### Soak Testing with SLO-based Thresholds

Example code:

```javascript
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
```

**Explanation:**

- Sustains a constant load of 100 users for 12 hours.
- Ensures system stability over time, detecting any performance degradation (e.g., memory leaks).
- Thresholds enforce that 95% of requests complete in under 600ms with minimal failures.

Run the test:

```bash
k6 run ./k6/soak-test.js
```

## Analyzing Performance Test Results

### Key Metrics to Analyze

- **Response Time (p(95), p(99))**: Focus on the 95th percentile response times for realistic performance insights.
- **Error Rates**: Monitor the error rate, particularly under stress or spike conditions.
- **Throughput**: Requests per second to measure system capacity.
- **System Resource Usage**: Use external monitoring tools (e.g., Prometheus) to observe CPU, memory, and network usage during tests.

## Useful links

- [Kong performance testing benchmarks](https://docs.konghq.com/gateway/latest/production/performance/performance-testing/)
- [Kong Public test suite](https://github.com/Kong/kong-gateway-performance-benchmark/tree/main)
- [Establish a Kong Gateway performance benchmark](https://docs.konghq.com/gateway/3.8.x/production/performance/benchmark/)




