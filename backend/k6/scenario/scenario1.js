import {checkSignIn, logout} from "../api/auth.js";
import {CODUO_WHO_AM_I, CODUO_WHO_AM_I_B} from "../api/config.js";
import { sleep, check } from 'k6';
import {changePairRoomStatus, createPairRoomWithLogin, swapNavAndDriver} from "../api/pair-room.js";
import {connect, disconnect} from "../api/sse.js";
import {deleteTodo, getTodos, makeTodo} from "../api/todo.js";
import {createReferenceLink, getReferenceLink} from "../api/reference-link.js";
import {createCategory, getCategory} from "../api/category.js";
import {startTimer, stopTimer} from "../api/timer.js";

export const options = {
    scenarios: {
        stress_scenario_1: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                {duration: '1m',target: 1000},
                {duration: '1m', target: 2000},
                {duration: '2m', target: 1700}
            ],
            gracefulRampDown: '10s'
        }
    },
}

export default function scenario1() {
    checkSignIn(CODUO_WHO_AM_I);
    sleep(1);
    const pairRoomCode = createPairRoomWithLogin(CODUO_WHO_AM_I).accessCode;
    joinPairRoom(CODUO_WHO_AM_I, pairRoomCode);
    sleep(1);

    checkSignIn(CODUO_WHO_AM_I_B);
    sleep(1);
    joinPairRoom(CODUO_WHO_AM_I_B, pairRoomCode);
    sleep(1);

    pairCycle1Min(pairRoomCode);

    logout(CODUO_WHO_AM_I);
    logout(CODUO_WHO_AM_I_B);
}

function pairCycle1Min(pairRoomCode) {
    startTimer(pairRoomCode);
    changePairRoomStatus(pairRoomCode);
    sleep(50);
    stopTimer(pairRoomCode);
    swapNavAndDriver(pairRoomCode);
    for (let i = 0; i < 10; i++) {
        sleep(1);
        const todoId = makeTodo(pairRoomCode).id;
        sleep(1);
        createReferenceLink(pairRoomCode);
        sleep(1);
        createCategory(pairRoomCode);
        sleep(1);
        deleteTodo(todoId);
    }
}

function joinPairRoom(token, pairRoomCode) {
    connect(pairRoomCode);
    getReferenceLink(pairRoomCode);
    getCategory(pairRoomCode);
    getTodos(pairRoomCode);
    return pairRoomCode;
}
