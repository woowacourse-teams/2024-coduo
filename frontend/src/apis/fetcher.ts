import * as Sentry from '@sentry/react';

interface RequestProps {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  errorMessage: string;
  body?: string;
  headers?: Record<string, string>;
}

type FetchProps = Omit<RequestProps, 'method'>;

const fetcher = {
  async request({ url, method, errorMessage, body, headers }: RequestProps): Promise<Response> {
    try {
      const response = await fetch(url, {
        method,
        headers: headers && headers,
        body: body && body,
        credentials: 'include',
      });

      if (!response.ok) throw new Error(errorMessage);
      return response;
    } catch (error) {
      if (!(error instanceof Error)) throw new Error(errorMessage);
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
    return this.request({ ...props, method: 'DELETE' });
  },
  patch(props: FetchProps) {
    return this.request({ ...props, method: 'PATCH' });
  },
  put(props: FetchProps) {
    return this.request({ ...props, method: 'PUT' });
  },
};

export default fetcher;
