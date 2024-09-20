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


## Best Practices for Performance Testing

- Run tests in a production-like environment: Ensure the test environment mirrors the production setup as closely as possible.
- Test with realistic data: Use data that closely simulates real user traffic patterns.
- Monitor Kong's performance: Use metrics (e.g., latency, memory, CPU) from monitoring tools like Prometheus and Grafana.
- Gradual Scaling: When scaling Kong, gradually increase the load to test its behavior under stress.


