import http from 'k6/http';
import { sleep, check } from 'k6';
import {BASE_URL} from "./config.js";

export function getTimer(accessCode) {
    const url = `${BASE_URL}${accessCode}/timer`;

    const res = http.get(url);

    check(res, {
        'Get timer status was 200': (r) => r.status === 200,
    });

    return JSON.parse(res.body);
}

export function changeTimer(accessCode) {
    const url = `${BASE_URL}${accessCode}/timer`

    const payload = JSON.stringify({
        "duration": 900000,
        "remainingTime": 900000
    });

    const param = {
        headers: {
            'Content-Type' : 'application/json',
        },
    }

    const res = http.patch(url, payload, param);

    check(res, {
        'update timer status was 204': (r) => r.status === 204,
    });
}


export function stopTimer(accessCode) {
    const url = `${BASE_URL}${accessCode}/timer/stop`;
    const res = http.patch(url);

    check(res, {
        'stop timer status was 204': (r) => r.status === 204,
    });
}

export function startTimer(accessCode) {
    const url = `${BASE_URL}${accessCode}/timer/start`;
    const res = http.patch(url);

    check(res, {
        'start timer status was 204': (r) => r.status === 204,
    });
}
