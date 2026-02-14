import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
  scenarios: {
    hundred_users: {
      executor: 'constant-vus',
      vus: 100,          // 100 concurrent users
      duration: '5m',    // test duration
    },
  },
  thresholds: {
    http_req_duration: [
      {
        threshold: 'p(90) < 15000',
        abortOnFail: true,
        delayAbortEval: '10s',
      },
    ],
  },
}

export default function () {
  const start = Date.now()
    // read API key from environment
  const API_KEY = __ENV.API_KEY
  const res = http.get('https://reqres.in/api/users?page=1', {
    headers: {
      'x-api-key': API_KEY
    },
  })

check(res, {
  'status is 2xx': (r) => r.status >= 200 && r.status < 300,
  'status is not 2xx': (r) => r.status < 200 || r.status >= 300,
})

  // Ensure exactly 1 iteration per second per VU
  const iterationDuration = (Date.now() - start) / 1000
  const sleepTime = 1 - iterationDuration

  if (sleepTime > 0) {
    sleep(sleepTime)
  }
}