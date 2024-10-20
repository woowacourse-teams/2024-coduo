import http from 'k6/http';
import { check } from 'k6';
import {makeTodo} from "./todo.js";
import {BASE_URL, CODUO_WHO_AM_I} from "./config.js";



export const options = {
    vus: 10,
    duration: '10s',
}

export function createPairRoom() {
    const url =  BASE_URL+'pair-room';
    const payload = JSON.stringify({
        "navigator": "hello",
        "driver": "world",
        "timerDuration": 100000,
        "timerRemainingTime": 10000,
        "missionUrl": "https://api-test.coduo.site/api/some-url"
    });

    const param = {
        headers: {
            'Content-Type' : 'application/json',
        },
    }

    const res = http.post(url, payload, param);
    const body = JSON.parse(res.body);

    check(res, {
        'Create room status was 201': (r) => r.status === 201,
    });

    return body;
}

export function changePairRoomStatus(accessCode) {
    const url = `${BASE_URL}pair-room/${accessCode}/status`;
    const payload = JSON.stringify({
        "status": "IN_PROGRESS",
    });

    const param = {
        headers: {
            'Content-Type' : 'application/json',
        },
    }

    const res = http.patch(url,payload,param);

    check(res, {
        'Change status of room status was 204': (r) => r.status === 204,
    });
}

export function swapNavAndDriver(accessCode) {
    const url = `${BASE_URL}pair-room/${accessCode}/pair-swap`;
    const res = http.patch(url);

    check(res, {
        'Swap Pair Role status was 204': (r) => r.status === 204,
    });
}

export function deletePairRoom(accessCode) {
    const url = BASE_URL+ 'pair-room/' + accessCode;
    const res = http.del(url);

    check(res, {
        'Delete room status was 204': (r) => r.status === 204,
    });
}

export function getPairRoomInfo(accessCode) {
    const url = `${BASE_URL}pair-room/${accessCode}`;
    const payload = JSON.stringify({
        "accessCode": accessCode,
    });

    const param = {
        headers: {
            'Content-Type' : 'application/json',
        },
    }

    const res = http.get(url, payload, param);

    check(res, {
        'Get room info status was 204': (r) => r.status === 200,
    });
}

export function checkRoomExist(accessCode) {
    const url = `${BASE_URL}pair-room/exists?access_code=${accessCode}`;
    const res = http.get(url);

    check(res, {
        'Check room exist status was 204': (r) => r.status === 200,
    });
}

export function getMyRooms(token) {
    const url = `${BASE_URL}my-pair-rooms`;
    const res = http.get(url, {
        cookies: {
            coduo_whoami: token,
        },
    });

    check(res, {
        'Get My rooms status was 204': (r) => r.status === 200,
    });

    return JSON.parse(res.body);
}
