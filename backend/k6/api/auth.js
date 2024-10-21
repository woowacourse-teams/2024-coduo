import http from 'k6/http';
import { sleep, check } from 'k6';
import {BASE_URL} from "./config.js";

export function logout(token) {
    const url = `${BASE_URL}sign-out`;

    const res = http.get(url, {
        cookies: {
            coduo_whoami: token,
        },
    });

    check(res, {
        'Logout Member status was 200': (r) => r.status === 200,
    });
}


export function checkSignIn(token) {
    const url = `${BASE_URL}sign-in/check`;

    const res = http.get(url, {
        cookies: {
            coduo_whoami: token,
        },
    });

    check(res, {
        'Check sign in status was 200': (r) => r.status === 200,
    });

    try{
        return JSON.parse(res.body);
    }catch (err) {
        console.error("sign in check 실패");
    }
}
