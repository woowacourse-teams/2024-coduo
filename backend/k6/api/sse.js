import http from 'k6/http';
import { sleep, check } from 'k6';
import {BASE_URL} from "./config.js";

export function connect(accessCode) {
    const url = `${BASE_URL}${accessCode}/connect`;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const res = http.get(url);
            check(res, {
                'SSE connect status was 200': (r) => r.status === 200,
            });
        })
    })
}

export function disconnect(accessCode) {
    const url = `${BASE_URL}${accessCode}/connect`

    const res = http.del(url);

    check(res, {
        'SSE disconnect status was 204': (r) => r.status === 204,
    });
}


export async function sseStart(accessCode, duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            connect(accessCode).then(r => console.log(r))
            sleep(duration);
            disconnect(accessCode);
        })
    })
}
