export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export enum TrackErrors {
  INCORRECT_BODY = 'Тело запроса не содержит обязательных полей',
  NOT_FOUND = 'Трек не найден',
  INVALID_ID = 'Недопустимый идентификатор дорожки (не uuid)',
}
