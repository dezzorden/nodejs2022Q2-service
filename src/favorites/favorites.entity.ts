import { Artist } from '../artist/artist.entity';
import { Track } from '../track/track.entity';
import { Album } from '../album/album.entity';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export enum FavoriteErrors {
  NOT_FOUND = 'Объект с этим идентификатором не является избранным',
  INVALID_ID = 'Идентификатор недействителен (не uuid)',
  UNPROCESSABLE_ID = 'Объект с таким идентификатором не существует',
}
