import * as Sentry from '@sentry/react';

import CustomError from '@/apis/fetcher/customError';
import { throwCustomErrorByStatus } from '@/apis/fetcher/util/status';

interface RequestProps {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  errorMessage?: string;
  body?: string;
  headers?: Record<string, string>;
  timeout?: number;
}

type FetchProps = Omit<RequestProps, 'method'>;

const fetcher = {
  async request({ url, method, body, headers, errorMessage }: RequestProps): Promise<Response> {
    try {
      const response = await fetch(url, {
        method,
        headers: headers && headers,
        body: body && body,
        credentials: 'include',
      });

      if (!response.ok) {
        throwCustomErrorByStatus(response.status, errorMessage);
      }

      return response;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new CustomError('NETWORK_ERROR', '네트워크 오류가 발생했습니다.');
      }
      Sentry.captureException(error);
      throw new CustomError('UNKNOWN_ERROR', '알 수 없는 오류가 발생했습니다.');
    }
  },

  get(props: FetchProps) {
    return this.request({ ...props, method: 'GET' });
  },

  post(props: FetchProps) {
    return this.request({
      ...props,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...props.headers },
    });
  },

  delete(props: FetchProps) {
    return this.request({
      ...props,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...props.headers },
    });
  },

  patch(props: FetchProps) {
    return this.request({
      ...props,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...props.headers },
    });
  },

  put(props: FetchProps) {
    return this.request({ ...props, method: 'PUT' });
  },
};

export default fetcher;
