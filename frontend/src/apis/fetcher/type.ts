export type STATUS = 400 | 403 | 404 | 500;
export type ErrorName =
  | 'AUTHORIZED_ERROR'
  | 'NOT_FOUND_ERROR'
  | 'BAD_REQUEST_ERROR'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR'
  | 'TIMEOUT';
