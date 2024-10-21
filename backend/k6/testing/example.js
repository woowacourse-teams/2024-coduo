/** 실행 방법
 * 1. k6 설치
 * 2. 터미널에 `k6 run 파일 이름` 명령어 입력
 * 참고) 파일이 존재하는 폴더에서 실행하거나, 파일 경로를 제대로 표기해야 한다.
 * 예시) k6 run ./testing/example.js 또는 testing 폴더에서 k6 run example.js
 */
import {makeTodo} from "../todo.js"; // todo.js 파일에서 makeTodo 함수를 import

export const options = {
    stages: [
        { duration: '1m', target: 20 }, // 0 ~ 1분: 0명 ~ 20명으로 사용자 점차 증가
        { duration: '1m', target: 40 }, // 1 ~ 2분: 20명 ~ 40명으로 사용자 점차 증가
        { duration: '1m', target: 60 }, // 2 ~ 3분: 40명 ~ 60명으로 사용자 점차 증가
        { duration: '1m', target: 80 }, // 3 ~ 4분: 60명 ~ 80명으로 사용자 점차 증가
        { duration: '1m', target: 100 }, // 4 ~ 5분: 80명 ~ 100명으로 사용자 점차 증가
    ],
};

export default function () {
    let accessCode = "접근 코드 넣어주세용";
    makeTodo(accessCode);   // todo 생성 api 호출
}
