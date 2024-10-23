import { sleep, check } from 'k6';
import {connect, disconnect} from "../api/sse.js";
import {changePairRoomStatus, createPairRoom, getPairRoomInfo, swapNavAndDriver} from "../api/pair-room.js";

export const options = {
    stages: [
        { duration: '3s', target: 1 },
    ],
    systemTags: ['status', 'http_req_duration'],
};

export default async function () {
    const accessCode = "IAN4c4d3661-";
    swapNavAndDriver(accessCode)
    sleep(1);
}


// export default async function () {
//     /*const accessCode = "IAN4c4d3661-";
//     connect(accessCode).then(r => console.log(r))
//     sleep(5);
//     disconnect(accessCode);*/
//
// }

