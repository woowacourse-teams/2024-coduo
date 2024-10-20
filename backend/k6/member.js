import http from 'k6/http';
import { sleep, check } from 'k6';
import {BASE_URL} from "./config.js";

export function getMember(token) {
    const url = `${BASE_URL}member`;

    const res = http.get(url, {
        cookies: {
            coduo_whoami: token,
        },
    });

    check(res, {
        'Get Member status was 200': (r) => r.status === 200,
    });

    return JSON.parse(res.body);
}


export function deleteMember(token) {
    const url = `${BASE_URL}member`;
    const res = http.del(url, {
        cookies: {
            coduo_whoami: token,
        },
    });

    check(res, {
        'Delete Member status was 204': (r) => r.status === 204,
    });
}
