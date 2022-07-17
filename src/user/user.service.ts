import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserErrors } from './user.entity';
import { db } from '../data/db';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { validateUuid } from 'src/utils';

@Injectable()
export class UserService {
  async createUser(createDto: CreateUserDto): Promise<User> {
    if (!createDto.login || !createDto.password) {
      throw new BadRequestException(UserErrors.INCORRECT_BODY);
    }

    const newUser: User = {
      id: uuidv4(),
      ...createDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    db.users.push(newUser);

    const responce: User = { ...newUser };
    delete responce.password;

    return responce;
  }

  async getUserById(id: string): Promise<User> {
    if (!validateUuid(id)) {
      throw new BadRequestException(UserErrors.INVALID_ID);
    }

    const condidate = db.users.find((user) => user.id === id);

    if (!condidate) {
      throw new NotFoundException(UserErrors.NOT_FOUND);
    }

    const responce: User = { ...condidate };
    delete responce.password;

    return responce;
  }

  async getAllUsers(): Promise<User[]> {
    return db.users;
  }

  async updateUser(dto: UpdatePasswordDto, id: string): Promise<User> {
    if (
      dto.newPassword === dto.oldPassword ||
      !dto.newPassword ||
      !dto.oldPassword
    ) {
      throw new BadRequestException(UserErrors.INCORRECT_BODY);
    }

    if (!validateUuid(id)) {
      throw new BadRequestException(UserErrors.INVALID_ID);
    }

    const condidateIndex = db.users.findIndex((user) => user.id === id);

    if (condidateIndex !== -1) {
      if (db.users[condidateIndex].password === dto.oldPassword) {
        db.users[condidateIndex].password = dto.newPassword;
        db.users[condidateIndex].version += 1;
        db.users[condidateIndex].updatedAt = Date.now();
      } else {
        throw new ForbiddenException(UserErrors.WRONG_OLD_PASSWORD);
      }
    } else {
      throw new NotFoundException(UserErrors.NOT_FOUND);
    }

    const responce: User = { ...db.users[condidateIndex] };
    delete responce.password;

    return responce;
  }

  async deleteUser(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException(UserErrors.INVALID_ID);
    }

    const condidateIndex = db.users.findIndex((user) => user.id === id);

    if (condidateIndex !== -1) {
      db.users.splice(condidateIndex, 1);
    } else {
      throw new NotFoundException(UserErrors.NOT_FOUND);
    }
  }
}
