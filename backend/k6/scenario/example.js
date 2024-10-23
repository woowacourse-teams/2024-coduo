import { sleep, check } from 'k6';
import {connect, disconnect, sseStart} from "../api/sse.js";
import {changePairRoomStatus, createPairRoom, getPairRoomInfo, swapNavAndDriver} from "../api/pair-room.js";
import {getTodos, makeTodo} from "../api/todo.js";
import {createReferenceLink, getReferenceLink} from "../api/reference-link.js";
import {getTimer, stopTimer} from "../api/timer.js";
import {createCategory} from "../api/category.js";

export const options = {
    stages: [
        { duration: '4m', target: 100 },
        { duration: '4m', target: 100 },
        { duration: '4m', target: 150 },
        { duration: '4m', target: 200 },
    ],
    systemTags: ['status', 'http_req_duration'],
};

export default async function () {
    const accessCode = createPairRoom().accessCode;
    sleep(1);
    sseStart(accessCode,60).then();
    getTodos(accessCode);
    getReferenceLink(accessCode);
    getTimer(accessCode);

    sleep(1);
    createReferenceLink(accessCode);
    sleep(1);
    for (let i = 0; i < 10; i++) {
        makeTodo(accessCode);
        sleep(1);
    }
    sleep(1);
    for (let i = 0; i < 3; i++) {
        createCategory(accessCode);
        sleep(1);
    }
    sleep(1);
    for (let i = 0; i < 5; i++) {
        createReferenceLink(accessCode);
        sleep(1);
    }
    sleep(60);
    swapNavAndDriver(accessCode);
    changePairRoomStatus(accessCode);
    sleep(1);
    stopTimer(accessCode);
}


// export default async function () {
//     /*const accessCode = "IAN4c4d3661-";
//     connect(accessCode).then(r => console.log(r))
//     sleep(5);
//     disconnect(accessCode);*/
//
// }

