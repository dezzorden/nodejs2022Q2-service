import { User } from 'src/user/user.entity';
import { Artist } from 'src/artist/artist.entity';
import { Track } from 'src/track/track.entity';
import { Album } from '../album/album.entity';
import { Favorites } from '../favorites/favorites.entity';

interface Db {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorite: Favorites;
}

export const db: Db = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorite: {
    artists: [],
    albums: [],
    tracks: [],
  },
};
