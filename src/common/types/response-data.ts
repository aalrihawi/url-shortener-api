import { ErrorMessages, SuccessMessages } from '../constants/messages.enum';

export class ResponseData<Type> {
  code = '';
  message = '';
  data?: Type;
  errors?: any;

  set success(code: string) {
    this.code = code;
    this.message = SuccessMessages[code];
  }

  set error(code: string) {
    this.code = code;
    this.message = ErrorMessages[code];
  }
}
