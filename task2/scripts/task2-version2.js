import http from 'k6/http'
import { check } from 'k6'

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 100,               // 100 requests per second
      timeUnit: '1s',          // per second
      duration: '5m',          // test duration
      preAllocatedVUs: 150,    // initial pool of VUs
      maxVUs: 300,             // maximum allowed if needed
    },
  },
  thresholds: {
    // throws error if more than 90% of the requests takes more than 2 seconds to be completed
    http_req_duration: [
      {
        http_req_failed: ['rate<0.01'],
        threshold: 'p(90) < 15000',
        abortOnFail: true,
        delayAbortEval: 100
      }
    ]
  }
}

export default function() {
    const API_KEY = __ENV.API_KEY
    const res = http.get('https://reqres.in/api/users?page=1', {
        headers: {
            'x-api-key': API_KEY
        }
    })
    console.log('Status Code:', res.status)
    check(res, {
        'status is 200': (r) => r.status === 200,
    })
}