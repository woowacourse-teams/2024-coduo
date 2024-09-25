import CustomError from '@/apis/fetcher/customError';

export const throwCustomErrorByStatus = (status: number, errorMessage?: string) => {
  switch (status) {
    case 400:
      throw new CustomError('BAD_REQUEST_ERROR', errorMessage);
    case 401:
      throw new CustomError('AUTHORIZED_ERROR', errorMessage);
    case 404:
      throw new CustomError('NOT_FOUND_ERROR', errorMessage);
    case 500:
      throw new CustomError('SERVER_ERROR', errorMessage);
  }
};
