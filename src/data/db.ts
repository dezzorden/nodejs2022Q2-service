import { User } from 'src/user/user.entity';
import { Artist } from 'src/artist/artist.entity';

interface Db {
  users: User[];
  artists: Artist[];
}

export const db: Db = {
  users: [],
  artists: [],
};
