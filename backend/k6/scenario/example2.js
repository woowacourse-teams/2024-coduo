import { sleep, check } from 'k6';
import {connect, disconnect} from "../api/sse.js";
import {changePairRoomStatus, createPairRoom, getPairRoomInfo, swapNavAndDriver} from "../api/pair-room.js";
import {completeTodo, getTodos, makeTodo} from "../api/todo.js";
import {createReferenceLink, getReferenceLink} from "../api/reference-link.js";

export const options = {
    stages: [
        { duration: '2m', target: 50 },
        { duration: '2m', target: 100 },
        { duration: '2m', target: 150 },
        { duration: '2m', target: 200 },
    ],
    systemTags: ['status', 'http_req_duration'],
};

export default function () {
    const accessCode = createPairRoom().accessCode;
    sleep(1);
    createReferenceLink(accessCode);
    sleep(1);
    getReferenceLink(accessCode);

}


// export default async function () {
//     /*const accessCode = "IAN4c4d3661-";
//     connect(accessCode).then(r => console.log(r))
//     sleep(5);
//     disconnect(accessCode);*/
//
// }

