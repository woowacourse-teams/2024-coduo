import { setupWorker } from 'msw/browser';

import { handlers } from '@/mock/handler';

export const worker = setupWorker(...handlers);
