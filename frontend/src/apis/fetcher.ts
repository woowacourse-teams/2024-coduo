interface RequestProps {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  errorMessage: string;
  body?: Record<string | number, string | number>;
  headers?: Record<string, string>;
}

type FetchProps = Omit<RequestProps, 'method'>;

const fetcher = {
  async request({ url, method, errorMessage, body, headers }: RequestProps): Promise<Response> {
    try {
      const response = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers: headers && headers,
      });

      return response;
    } catch (error) {
      if (!(error instanceof Error)) {
        throw new Error(errorMessage);
      }

      throw error;
    }
  },

  get({ url, headers, errorMessage }: FetchProps) {
    return this.request({ url, method: 'GET', headers, errorMessage });
  },
  post({ url, body, headers, errorMessage }: FetchProps) {
    return this.request({ url, method: 'POST', body, headers, errorMessage });
  },
  delete({ url, headers, errorMessage }: FetchProps) {
    return this.request({ url, method: 'DELETE', headers, errorMessage });
  },
  patch({ url, headers, errorMessage, body }: FetchProps) {
    return this.request({ url, method: 'PATCH', headers, errorMessage, body });
  },
  put({ url, headers, errorMessage }: FetchProps) {
    return this.request({ url, method: 'PUT', headers, errorMessage });
  },
};

export default fetcher;
