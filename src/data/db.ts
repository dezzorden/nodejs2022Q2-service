import { User } from 'src/user/user.entity';
import { Artist } from 'src/artist/artist.entity';
import { Track } from 'src/track/track.entity';
import { Album } from '../album/album.entity';

interface Db {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
}

export const db: Db = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
};
