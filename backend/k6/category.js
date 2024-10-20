import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from "./config.js";

export function createCategory(accessCode) {
    const url = `${BASE_URL}/${accessCode}/category`;
    const payload = JSON.stringify({
        "value": "카테고리1"
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

    getCategory(body.accessCode);
    patchCategory(body.accessCode);
    deleteCategory(body.accessCode, 1);
}

export function getCategory(accessCode) {
    const url = `${BASE_URL}/${accessCode}/category`;

    let res = http.get(url);

    check(res, {
        'Get category was 200': (r) => r.status === 200,
    });
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

