import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from "./config.js";

export function createReferenceLink(accessCode) {
    const url = `${BASE_URL}${accessCode}/reference-link`;
    const payload = JSON.stringify({
        "url": "https://test.coduo.site"
    });
    const param = {
        headers: {
            'Content-Type' : 'application/json',
        },
    }

    const res = http.post(url, payload, param);
    const body = JSON.parse(res.body);

    check(res, {
        'Create reference link status was 201': (r) => r.status === 201,
    });
}

export function getReferenceLink(accessCode) {
    const url = `${BASE_URL}${accessCode}/reference-link`;
    let res = http.get(url);

    check(res, {
        'Get reference link was 200': (r) => r.status === 200,
    });
}

export function deleteReferenceLink(accessCode, id) {
    const url = `${BASE_URL}${accessCode}/reference-link/${id}`;
    let res = http.del(url);
    check(res, {
        'Delete reference link status was 204': (r) => r.status === 204,
    });
}
