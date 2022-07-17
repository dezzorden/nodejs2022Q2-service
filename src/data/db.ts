import { User } from 'src/user/user.entity';
import { Artist } from 'src/artist/artist.entity';
import { Track } from 'src/track/track.entity';

interface Db {
  users: User[];
  artists: Artist[];
  tracks: Track[];
}

export const db: Db = {
  users: [],
  artists: [],
  tracks: [],
};
