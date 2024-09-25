import { DEFAULT_ERROR_MESSAGES } from '@/apis/fetcher/constant/error';
import { ErrorName } from '@/apis/fetcher/type';

class CustomError extends Error {
  constructor(
    public name: ErrorName,
    message?: string,
  ) {
    super(message || DEFAULT_ERROR_MESSAGES[name]);
    this.name = name;
  }
}

export default CustomError;
