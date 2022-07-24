export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export enum ArtistErrors {
  INCORRECT_BODY = 'Тело запроса не содержит обязательных полей',
  NOT_FOUND = 'Артист не найден',
  INVALID_ID = 'Идентификатор исполнителя недействителен (не uuid)',
}
