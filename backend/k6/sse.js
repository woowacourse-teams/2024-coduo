import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from "./config.js";

export function connect(accessCode) {
    const url = `${BASE_URL}${accessCode}/connect`;
    const res = http.get(url);
    check(res, {
        'SSE connection status was 200': (r) => r.body.includes("connect"),
    });
}

export function disconnect(accessCode) {
    const url = `${BASE_URL}${accessCode}/connect`

    const res = http.del(url);

    check(res, {
        'SSE disconnect status was 204': (r) => r.status === 204,
    });
}
