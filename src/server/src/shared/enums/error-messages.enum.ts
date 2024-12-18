export enum ErrorMessages {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',

  FNAME_LENGTH = 'FNAME_LENGTH',
  FNAME_EMPTY = 'FNAME_EMPTY',

  SNAME_LENGTH = 'SNAME_LENGTH',
  SNAME_EMPTY = 'SNAME_EMPTY',

  EMAIL_EXISTS = 'EMAIL_EXISTS',
  EMAIL_INVALID = 'EMAIL_INVALID',
  EMAIL_LENGTH = 'EMAIL_LENGTH',
  EMAIL_EMPTY = 'EMAIL_EMPTY',

  PASSWORD_EMPTY = 'PASSWORD_EMPTY',
  PASSWORD_LENGTH = 'PASSWORD_LENGTH',
  PASSWORD_WEAK = 'PASSWORD_WEAK',

  USER_NOT_FOUND = 'USER_NOT_FOUND',

  ACCESS_TOKEN_REQUIRED = 'ACCESS_TOKEN_REQUIRED',
  ACCESS_TOKEN_INVALID = 'ACCESS_TOKEN_INVALID',
  ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_EXPIRED',
  ACCESS_TOKEN_VERIFYING_ERROR = 'ACCESS_TOKEN_VERIFYING_ERROR',

  REFRESH_TOKEN_REQUIRED = 'REFRESH_TOKEN_REQUIRED',
  REFRESH_TOKEN_INVALID = 'REFRESH_TOKEN_INVALID',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  REFRESH_TOKEN_VERIFYING_ERROR = 'REFRESH_TOKEN_VERIFYING_ERROR',

  INCORRECT_CREDENTIALS = 'INCORRECT_CREDENTIALS',
  USER_NOT_ACTIVATED = 'USER_NOT_ACTIVATED',

  SESSION_NOT_FOUND = 'SESSION_NOT_FOUND',
  SESSION_NO_RIGHTS = 'SESSION_NO_RIGHTS',

  TYPE_MUST_BE_A_NUMBER = 'TYPE_MUST_BE_A_NUMBER',
}
