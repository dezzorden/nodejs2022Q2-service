export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export enum UserErrors {
  INCORRECT_BODY = 'Тело запроса не содержит обязательных полей',
  WRONG_OLD_PASSWORD = 'Новый пароль совпадает со старым',
  NOT_FOUND = 'Пользователь не найден',
  INVALID_ID = 'Идентификатор пользователя недействителен (не uuid)',
}
