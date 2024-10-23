import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from "./config.js";

export function createCategory(accessCode) {
    const url = `${BASE_URL}${accessCode}/category`;

    let category = Math.random().toString().substring(2, 12);
    const payload = JSON.stringify({
        "value": category
    });
    const param = {
        headers: {
            'Content-Type' : 'application/json',
        },
    }

    const res = http.post(url, payload, param);
    const body = JSON.parse(res.body);

    check(res, {
        'Create category status was 201': (r) => r.status === 201,
    });

    return body;
}

export function getCategory(accessCode) {
    const url = `${BASE_URL}/${accessCode}/category`;

    let res = http.get(url);

    check(res, {
        'Get category was 200': (r) => r.status === 200,
    });

    return JSON.parse(res.body);
}

export function patchCategory(accessCode) {
    const url = `${BASE_URL}/${accessCode}/category`;
    const payload = JSON.stringify({
        "categoryId": 0,
        "updatedCategoryName": "카테고리2"
    });
    const param = {
        headers: {
            'Content-Type' : 'application/json',
        },
    }

    let res = http.patch(url, payload, param);
    check(res, {
        'Patch category status was 200': (r) => r.status === 200,
    });
}

export function deleteCategory(accessCode, categoryId) {
    const url = `${BASE_URL}/${accessCode}/category/${categoryId}`;
    let res = http.del(url);
    check(res, {
        'Delete category status was 204': (r) => r.status === 204,
    });
}
