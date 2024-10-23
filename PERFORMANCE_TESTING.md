# Performance testing

## Objectives

- Understand performance testing theory.
- Learn how to configure K6 for testing Kong and similar systems.
- Execute different types of performance tests (load, stress, spike, soak).
- Analyze results to identify performance bottlenecks.

## What is Performance Testing?

**Performance Testing:** 

Performance testing is a type of software testing that evaluates how a system behaves under various conditions to determine its speed, responsiveness, and stability.

**Why It’s Important:**

- Ensure that the system can handle expected traffic.
- Identify bottlenecks before they impact users.

**Goals:**

- **Throughput:** API requests per second.
- **Response Time:** Time for the system to respond.
- **Scalability:** Ability to increase capacity.
- **Stability:** Behavior under load over time.

## Types of Performance Tests

### Load Testing

Tests system under normal/peak load.

- **When to run**: Load testing is typically run early in the development lifecycle and continuously throughout. It helps ensure that the application can handle expected user loads.
- **Objective**: To simulate expected traffic to check if the system meets performance standards under normal and peak conditions.
- **Example**: Testing after major builds or before major releases to verify the system can handle the anticipated load.

### Stress Testing

Pushes the system beyond its limits.

- **When to run**: Stress testing is usually conducted towards the end of the development phase or before deployment to production, especially before major releases.
- **Objective**: To push the system beyond its limits to identify the breaking point, as well as to understand how the system behaves under extreme conditions and how it recovers.
- **Example**: After stress testing an e-commerce platform, the team identified the system's breaking point, enabling them to implement scaling strategies for reliable performance during peak sales events.
  
### Spike Testing

Simulates sudden surges in traffic.

- **When to run**: This is generally done as part of a stress testing cycle or before product launches, marketing campaigns, or anticipated events that will create traffic spikes.
- **Objective**: To simulate sudden, sharp increases in traffic and evaluate how the system responds.
- **Example**: Running a test simulating traffic spikes during events like Black Friday sales or product launches.

### Soak Testing

Sustains load for an extended time.

- **When to run**: Soak tests are run before production releases or during long-term stability tests, usually towards the end of the testing cycle.
- **Objective**: To test system behavior under sustained load over an extended period (e.g., 24 hours) and identify memory leaks or performance degradation over time.
- **Example**: Testing how the system performs under a normal load over a weekend to see if performance deteriorates over time.


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

**SLI examples:**

- "The average response time for requests over the last 24 hours is 450ms."
- "The error rate for requests over the last 24 hours is 2%."
- "The system throughput is 1000 requests per second."
- "The system latency is 50ms."

### 3. SLO (Service Level Objective)

- **SLO:** An internal performance target that specifies the desired service levels for a system.

**SLO examples:**

- "95% of requests must have a response time below 500ms."
- "The error rate must be below 1%."
- "The system must handle 1000 requests per second."
- "The system must have a latency of under 100ms."

### 4. SLA (Service Level Agreement)

- **SLA:** A formal agreement between a service provider and a customer that outlines expected service performance levels and penalties if they are not met.

**SLA Examples:**

- "We guarantee a response time of 500ms for 95% of requests. If this is not met, we will provide a 10% discount."
- "We guarantee an error rate of less than 1%. If this is not met, we will provide a month of free service."
- "We guarantee a system throughput of 1000 requests per second. If this is not met, we will provide a refund."

**Relationship between SLOs and SLAs:**

- SLOs are internal goals set to ensure compliance with SLAs.
- Meeting SLOs consistently ensures SLA obligations are met.


## Best Practices for Performance Testing

- Run tests in a production-like environment: Ensure the test environment mirrors the production setup as closely as possible.
- Test with realistic data: Use data that closely simulates real user traffic patterns.
- Monitor the system performance: Use metrics (e.g., latency, memory, CPU) from monitoring tools like Prometheus and Grafana.


