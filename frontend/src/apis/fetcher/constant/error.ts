import { ErrorName } from '@/apis/fetcher/type';

export const DEFAULT_ERROR_MESSAGES: Record<ErrorName, string> = {
  AUTHORIZED_ERROR: '인증에 실패했습니다.',
  NOT_FOUND_ERROR: '요청한 리소스를 찾을 수 없습니다.',
  BAD_REQUEST_ERROR: '잘못된 요청입니다.',

  SERVER_ERROR: '서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.',
  NETWORK_ERROR: '네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.',

  TIMEOUT: '요청 시간이 초과되었습니다. 나중에 다시 시도해주세요.',
  UNKNOWN_ERROR: '알 수 없는 에러가 발생했습니다.',
};
