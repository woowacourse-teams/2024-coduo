import { http, HttpResponse } from 'msw';

import pairRoomData from './pairRoomData.json';
const API_URL = process.env.REACT_APP_API_URL;

export const handlers = [
  http.get(`${API_URL}/pair-room/:accessCode`, () => {
    return HttpResponse.json(pairRoomData, { status: 200 });
  }),

  http.post(`${API_URL}/pair-room`, async () => {
    return HttpResponse.json(null, { status: 201 });
  }),
];
