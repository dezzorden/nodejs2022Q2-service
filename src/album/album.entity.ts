export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export enum AlbumErrors {
  INCORRECT_BODY = 'Тело запроса не содержит обязательных полей',
  NOT_FOUND = 'Альбом не найден',
  INVALID_ID = 'Идентификатор альбома недействителен (не uuid)',
}
