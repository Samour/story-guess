export { ApiErrorCode } from './ErrorCode';
import { ApiErrorCode } from './ErrorCode';

export interface ApiErrorDto {
  errorCode: ApiErrorCode;
  message?: string;
}
