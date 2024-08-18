import * as Sentry from '@sentry/react';

interface RequestProps {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  errorMessage?: string;
  //TODO: errorMessage 제거
  body?: string;
  headers?: Record<string, string>;
}

type FetchProps = Omit<RequestProps, 'method'>;

const fetcher = {
  async request({ url, method, body, headers }: RequestProps): Promise<Response> {
    try {
      const response = await fetch(url, {
        method,
        headers: headers && headers,
        body: body && body,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '알 수 없는 오류가 발생했습니다.');
      }

      return response;
    } catch (error) {
      if (!(error instanceof Error)) (error as { message: string }).message;

      Sentry.captureException(error);
      throw error;
    }
  },

  get(props: FetchProps) {
    return this.request({ ...props, method: 'GET' });
  },
  post(props: FetchProps) {
    return this.request({
      ...props,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  },
  delete(props: FetchProps) {
    return this.request({ ...props, method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
  },
  patch(props: FetchProps) {
    return this.request({ ...props, method: 'PATCH', headers: { 'Content-Type': 'application/json' } });
  },
  put(props: FetchProps) {
    return this.request({ ...props, method: 'PUT' });
  },
};

export default fetcher;
