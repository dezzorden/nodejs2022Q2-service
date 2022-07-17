import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../data/db';
import { validateUuid } from 'src/utils';
import { AlbumErrors, Album } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor() {}

  async createAlbum(createDto: CreateAlbumDto): Promise<Album> {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createDto,
    };

    db.albums.push(newAlbum);

    return newAlbum;
  }

  checkAlbum(id): Album {
    return db.albums.find((album) => album.id === id);
  }

  async getAlbumById(id: string): Promise<Album> {
    if (!validateUuid(id)) {
      throw new BadRequestException(AlbumErrors.INVALID_ID);
    }

    const condidate = this.checkAlbum(id);

    if (!condidate) {
      throw new NotFoundException(AlbumErrors.NOT_FOUND);
    }

    return condidate;
  }

  async getAllAlbums(): Promise<Album[]> {
    return db.albums;
  }

  async updateAlbum(dto: UpdateAlbumDto, id: string): Promise<Album> {
    if (typeof dto.year !== 'number' || typeof dto.name !== 'string') {
      throw new BadRequestException(AlbumErrors.INCORRECT_BODY);
    }

    if (!validateUuid(id)) {
      throw new BadRequestException(AlbumErrors.INVALID_ID);
    }

    const condidateIndex = db.albums.findIndex((album) => album.id === id);

    if (condidateIndex !== -1) {
      const oldData = db.albums[condidateIndex];
      db.albums[condidateIndex] = { ...oldData, ...dto };
    } else {
      throw new NotFoundException(AlbumErrors.NOT_FOUND);
    }

    return db.albums[condidateIndex];
  }

  async deleteRef(id: string): Promise<void> {
    db.albums.map((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }

  async deleteAlbum(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException(AlbumErrors.INVALID_ID);
    }

    const condidateIndex = db.albums.findIndex((album) => album.id === id);

    if (condidateIndex !== -1) {
      db.albums.splice(condidateIndex, 1);
    } else {
      throw new NotFoundException(AlbumErrors.NOT_FOUND);
    }
  }
}
