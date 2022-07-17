import { User } from 'src/user/user.entity';

interface Db {
  users: User[];
}

export const db: Db = {
  users: [],
};
