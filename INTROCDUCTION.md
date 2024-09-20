# Performance Testing with Kong using K6

## Objectives

- Understand performance testing theory.
- Learn how to configure K6 for testing Kong.
- Execute different types of performance tests (load, stress, spike, soak).
- Analyze results to identify performance bottlenecks.

## What is Performance Testing?

**Performance Testing:** Measure how Kong performs under different workloads.

**Why It’s Important:**

- Ensure that the Gateway can handle expected traffic.
- Identify bottlenecks before they impact users.

**Goals:**

- **Throughput:** API requests per second.
- **Response Time:** Time for the system to respond.
- **Scalability:** Ability to increase capacity.
- **Stability:** Behavior under load over time.

## Types of Performance Tests

- **Load Testing:** Tests under normal/peak load.
- **Stress Testing:** Pushes system beyond limits.
- **Spike Testing:** Simulates sudden surges in traffic.
- **Soak Testing:** Sustains load for an extended time to find degradation.

## Performance Testing Terminology and Concepts

### 1. Percentiles in Performance Testing

- **Percentile:** A value below which a given percentage of data points fall.

**Why Percentiles?**

- They provide a more accurate reflection of performance across users, ignoring skew caused by outliers.

**Common Percentiles:**

- **p(95) (95th Percentile):** 95% of all requests are faster than this value, reflecting typical user experience.
- **p(90) (90th Percentile):** 90% of requests are faster than this value.
- **p(99) (99th Percentile):** 99% of requests are faster than this value, providing insight into the worst-case scenarios.

**Example:**

- A p(95) response time of 500ms means that 95% of requests are served in under 500ms.

### 2. SLI (Service Level Indicator)

- **SLI:** A specific, measurable value that represents how a system is performing against a service-level objective.

**Example SLI:**

- "The average response time for requests over the last 24 hours is 450ms."

### 3. SLO (Service Level Objective)

- **SLO:** An internal performance target that specifies the desired service levels for a system.

**Example SLO:**

- "95% of requests must have a response time below 500ms."

### 4. SLA (Service Level Agreement)

- **SLA:** A formal agreement between a service provider and a customer that outlines expected service performance levels and penalties if they are not met.

**Example SLA:**

- "We guarantee 99.9% uptime for our API. If this is not met, we will compensate customers."

**Relationship between SLOs and SLAs:**

- SLOs are internal goals set to ensure compliance with SLAs.
- Meeting SLOs consistently ensures SLA obligations are met.

### Defining SLAs and SLOs: Technical Considerations

When defining SLAs and SLOs at a system or component level, there are several technical factors that must be carefully considered. These considerations directly affect performance, scalability, and the feasibility of meeting the defined targets.

#### 1. Component Capacity and Scalability

- **Understand the Limits of the System Components:** Evaluate the limits of API gateways, databases, load balancers, and other critical components in your infrastructure.
    - **Example:** Determine how many API requests per second the Kong Gateway can handle before performance starts to degrade.
- **Horizontal/Vertical Scaling:** Decide if the system can scale horizontally (adding more instances) or vertically (more powerful instances) to meet demand spikes.
    - Consider whether autoscaling policies are set to ensure the system can dynamically adjust capacity based on traffic.

#### 2. Infrastructure Performance Under Load

- **Benchmarking System Components:** Conduct performance benchmarking for each system component (e.g., LBS, WAFs, Gateways, databases). This helps identify bottlenecks that could prevent meeting the SLOs.
    - **Example:** An overloaded database might cause API response times to increase significantly, affecting the p(95) response time target.
- **Network Latency and Bandwidth:** Latency between different components (e.g., Kong API Gateway and backend services) can affect overall response times. Ensure that network performance is optimized and tested under various load scenarios.

#### 3. Response Time Variability

- **Dynamic Workloads:** Variability in response times may be due to factors like caching, database query complexity, or the nature of external dependencies.
    - Monitor and account for these when defining SLOs. If the API heavily relies on third-party services, their performance must also be considered in the SLOs.
- **Caching Mechanisms:** Ensure caching strategies (e.g., Redis, Kong caching plugins) are in place and tuned to reduce response time and backend load.

#### 4. Error Rate Tolerance

- **Identify Error Sources:** Errors might occur due to system overload, timeouts, or external dependencies failing (e.g., third-party APIs). Define error rate SLOs (e.g., < 0.5% error rate) based on historical performance data.
- **Graceful Degradation:** Implement strategies to handle failures, such as fallback responses or retry mechanisms, to prevent cascading failures and improve the user experience even when errors occur.

#### 5. Concurrency Handling

- **Connection Pooling:** Ensure connection pooling is properly configured for backend services, databases, or external APIs. Incorrect connection pool sizes can lead to resource exhaustion and higher response times under load.
- **Rate Limiting:** Implement rate limiting at the Kong Gateway or application level to prevent system overload from an unexpected spike in requests. Rate limiting should be part of SLO definitions when protecting backend services from excessive load.

#### 6. Monitoring and Observability

- **Metrics Collection:** Ensure that real-time monitoring tools are in place to capture key performance indicators (KPIs) like response time, throughput, error rate, and CPU/memory usage.
    - **Example:** Use tools like Prometheus and Grafana to monitor Kong’s performance in real-time.
- **Alerting Systems:** Set up alerting mechanisms to notify the team when an SLO threshold (e.g., p(95) > 500ms) is breached or if the error rate increases beyond the acceptable limit.

#### 7. Historical Data and Trends

- **Use Past Performance as a Baseline:** Analyze past performance data to set realistic SLOs. For instance, if 95% of requests were served within 400ms during load tests, a reasonable SLO would target a p(95) of 500ms or less.
- **Capacity Planning Based on Historical Peaks:** Plan for expected traffic spikes (e.g., during sales events or new feature launches) using historical data, and set SLOs that the system can handle during these periods.

#### 8. Latency in Distributed Systems

- **Component Communication Overhead:** In microservice architectures, services communicate over the network, adding latency. Account for these latencies when defining response-time SLOs.
- **Asynchronous Processing:** If your system uses asynchronous processing (e.g., message queues), ensure that these non-blocking requests are accounted for when setting SLOs, particularly for workflows that require near-real-time responses.

**Example Scenario:**

- **Component:** Kong Gateway routing requests to a microservices backend.
- **SLO:** 95% of requests must have a response time below 500ms, considering that the backend service processing time is 350ms on average.
- **Error Rate Tolerance:** Less than 0.2% of requests are allowed to fail due to backend timeouts or connectivity issues.

## Best Practices for Performance Testing

- Run tests in a production-like environment: Ensure the test environment mirrors the production setup as closely as possible.
- Test with realistic data: Use data that closely simulates real user traffic patterns.
- Monitor Kong's performance: Use metrics (e.g., latency, memory, CPU) from monitoring tools like Prometheus and Grafana.
- Gradual Scaling: When scaling Kong, gradually increase the load to test its behavior under stress.


