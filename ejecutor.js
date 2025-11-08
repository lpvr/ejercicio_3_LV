import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const credenciales = new SharedArray('credenciales', function () {
    return papaparse.parse(open('./credenciales.csv'), { header: true }).data;
});

export const options = {
    scenarios: {
    login_test: {
      executor: 'constant-arrival-rate',
      rate: 20,           // 20 iteraciones por segundo 
      timeUnit: '1s',
      duration: '1m',     // duración del test
      preAllocatedVUs: 10,
      maxVUs: 50,
        },
    },
    thresholds: {
        http_req_duration: ['p(95)<1500'],       // 95% ≤ 1,5 s
        http_req_failed: ['rate<0.03'],          // < 3% errores
    },
};

export default function () {
    const c = credenciales[Math.floor(Math.random() * credenciales.length)];
    const payload = JSON.stringify({
        username: c.user,
        password: c.passwd,
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const res = http.post('https://fakestoreapi.com/auth/login', payload, params);

    check(res, {
        'status is 201': (r) => r.status === 201,
        'response time ≤ 1500ms': (r) => r.timings.duration <= 1500,
    });
}
