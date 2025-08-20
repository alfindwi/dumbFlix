import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

// Base URL
const BASE_URL = "http://localhost:8080/api";

// Sample data for dynamic requests
const movieSlugs = [
  "the-truman-show",
  "12-angry-men",
  "interstellar",
  "the-godfather",
  "scarface",
];

const seriesSlugs = [
  "breaking-bad",
  "berlin",
  "stranger-things",
  "adolescence",
  "hyper-knife",
];

// Custom metrics
const errorRate = new Rate("errors");

// Test configuration
export const options = {
  stages: [
    { duration: "10s", target: 50 }, // Ramp up to 50 VUs in 10s
    { duration: "50s", target: 100 }, // Ramp up to 100 VUs over 50s
    { duration: "10s", target: 0 }, // Ramp down to 0 VUs in 10s
  ],
  thresholds: {
    http_req_duration: ["p(95)<200"], // 95% of requests should be below 200ms
    http_req_failed: ["rate<0.1"], // Error rate should be less than 10%
    errors: ["rate<0.1"], // Custom error rate should be less than 10%
  },
};

export default function () {
  // Test scenario: randomly choose which endpoint to test
  const scenario = Math.random();

  if (scenario < 0.3) {
    // 30% - Test category endpoint
    testCategoryEndpoint();
  } else if (scenario < 0.6) {
    // 30% - Test movies list endpoint
    testMoviesEndpoint();
  } else if (scenario < 0.9) {
    // 30% - Test series list endpoint
    testSeriesEndpoint();
  } else {
    // 10% - Test specific endpoints only if we have valid slugs
    if (movieSlugs.length > 0 && seriesSlugs.length > 0) {
      const specificTest = Math.random();
      if (specificTest < 0.5) {
        testSpecificMovieEndpoint();
      } else {
        testSpecificSeriesEndpoint();
      }
    } else {
      // Fallback to list endpoints if no slugs available
      testMoviesEndpoint();
    }
  }

}

function testCategoryEndpoint() {
  const response = http.get(`${BASE_URL}/category`);

  const success = check(response, {
    "Category - Status is 200": (r) => r.status === 200,
    "Category - Response time < 200ms": (r) => r.timings.duration < 200,
    "Category - Has content": (r) => r.body.length > 0,
  });

  errorRate.add(!success);
}

function testMoviesEndpoint() {
  const response = http.get(`${BASE_URL}/movie`);

  const success = check(response, {
    "Movies - Status is 200": (r) => r.status === 200,
    "Movies - Response time < 200ms": (r) => r.timings.duration < 200,
    "Movies - Has content": (r) => r.body.length > 0,
  });

  // Try to extract IDs or slugs from response for later use
  if (response.status === 200 && movieSlugs.length === 0) {
    try {
      const data = JSON.parse(response.body);
      if (Array.isArray(data) && data.length > 0) {
        // Check if data has slug field, if not use movieId
        if (data[0].slug) {
          movieSlugs = data
            .slice(0, 5)
            .map((item) => item.slug)
            .filter((slug) => slug);
        } else if (data[0].movieId) {
          movieSlugs = data
            .slice(0, 5)
            .map((item) => item.movieId.toString())
            .filter((id) => id);
        }
      }
    } catch (e) {
      console.log("Could not parse movies response for slugs/IDs");
    }
  }

  errorRate.add(!success);
}

function testSpecificMovieEndpoint() {
  if (movieSlugs.length === 0) {
    console.log("No movie slugs available, skipping specific movie test");
    return;
  }

  const slug = movieSlugs[Math.floor(Math.random() * movieSlugs.length)];
  const response = http.get(`${BASE_URL}/movie/slug/${slug}`); // Fix: add /slug/ prefix

  const success = check(response, {
    "Specific Movie - Status is 200": (r) => r.status === 200,
    "Specific Movie - Response time < 200ms": (r) => r.timings.duration < 200,
    "Specific Movie - Has content": (r) => r.body.length > 0,
  });

  errorRate.add(!success);
}

function testSeriesEndpoint() {
  const response = http.get(`${BASE_URL}/series`);

  const success = check(response, {
    "Series - Status is 200": (r) => r.status === 200,
    "Series - Response time < 200ms": (r) => r.timings.duration < 200,
    "Series - Has content": (r) => r.body.length > 0,
  });

  // Try to extract IDs or slugs from response for later use
  if (response.status === 200 && seriesSlugs.length === 0) {
    try {
      const data = JSON.parse(response.body);
      if (Array.isArray(data) && data.length > 0) {
        // Check if data has slug field, if not use seriesId
        if (data[0].slug) {
          seriesSlugs = data
            .slice(0, 5)
            .map((item) => item.slug)
            .filter((slug) => slug);
        } else if (data[0].seriesId) {
          seriesSlugs = data
            .slice(0, 5)
            .map((item) => item.seriesId.toString())
            .filter((id) => id);
        }
      }
    } catch (e) {
      console.log("Could not parse series response for slugs/IDs");
    }
  }

  errorRate.add(!success);
}

function testSpecificSeriesEndpoint() {
  if (seriesSlugs.length === 0) {
    console.log("No series slugs available, skipping specific series test");
    return;
  }

  const slug = seriesSlugs[Math.floor(Math.random() * seriesSlugs.length)];
  const response = http.get(`${BASE_URL}/series/${slug}`);

  const success = check(response, {
    "Specific Series - Status is 200": (r) => r.status === 200,
    "Specific Series - Response time < 200ms": (r) => r.timings.duration < 200,
    "Specific Series - Has content": (r) => r.body.length > 0,
  });

  errorRate.add(!success);
}

// Setup function (runs once before the test)
export function setup() {
  console.log("Starting performance test...");
  console.log("Target: 95th percentile response time <= 200ms");
}

// Teardown function (runs once after the test)
export function teardown(data) {
  console.log("Performance test completed!");
}
