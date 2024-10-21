import http from 'k6/http';
import { sleep, check } from 'k6';
import {BASE_URL} from "./config.js";

export function makeTodo(accessCode) {
    const url = BASE_URL+ accessCode + '/todos';
    const payload = JSON.stringify({
        "content": "내가 해야할 것"
    });

    const param = {
        headers: {
            'Content-Type' : 'application/json',
        },
    }
    const res = http.post(url, payload, param);

    check(res, {
        'Create todo status was 201': (r) => r.status === 201,
    });

    return JSON.parse(res);
}

export function getTodos(accessCode) {
    const url = BASE_URL + accessCode + '/todos';
    const res = http.get(url);

    check(res, {
        'Get todos status was 200': (r) => r.status === 200,
    });

    return JSON.parse(res.body);
}

export function updateTodoOrder(todoId, order) {
    const url = `${BASE_URL}todos/${todoId}/order`
    const payload = JSON.stringify({
        "order": order
    });
    const param = {
        headers: {
            'Content-Type' : 'application/json',
        },
    }

    const res = http.patch(url, payload, param);

    check(res, {
        'Update todos order status was 200': (r) => r.status === 200,
    });
}

export function changeTodo(todoId, content) {
    const url = `${BASE_URL}todos/${todoId}/contents`

    const payload = JSON.stringify({
        "content": content
    });
    const param = {
        headers: {
            'Content-Type' : 'application/json',
        },
    }

    const res = http.patch(url, payload, param);

    check(res, {
        'Update todos content status was 204': (r) => r.status === 204,
    });
}

export function completeTodo(todoId) {
    const url = `${BASE_URL}todos/${todoId}/checked`;
    const res = http.patch(url);
    check(res, {
        'Complete todo status was 204': (r) => r.status === 204,
    });
}

export function deleteTodo(todoId) {
    const url = BASE_URL+'todos/' + todoId;
    const res = http.del(url);

    check(res, {
        'Delete todo status was 204': (r) => r.status === 204,
    });
}
