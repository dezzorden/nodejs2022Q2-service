import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist, ArtistErrors } from './artist.entity';
import { db } from '../data/db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { validateUuid } from 'src/utils';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor() {}

  async createArtist(createDto: CreateArtistDto): Promise<Artist> {
    if (!createDto.name || !createDto.grammy) {
      throw new BadRequestException(ArtistErrors.INCORRECT_BODY);
    }

    const newArtist: Artist = {
      id: uuidv4(),
      ...createDto,
    };

    db.artists.push(newArtist);

    return newArtist;
  }

  checkArtist(id): Artist {
    return db.artists.find((artist) => artist.id === id);
  }

  async getArtistById(id: string): Promise<Artist> {
    if (!validateUuid(id)) {
      throw new BadRequestException(ArtistErrors.INVALID_ID);
    }

    const Artist = this.checkArtist(id);

    if (!Artist) {
      throw new NotFoundException(ArtistErrors.NOT_FOUND);
    }

    return Artist;
  }

  async getAllArtists(): Promise<Artist[]> {
    return db.artists;
  }

  async updateArtist(dto: UpdateArtistDto, id: string): Promise<Artist> {
    if (typeof dto.grammy !== 'boolean' || typeof dto.name !== 'string') {
      throw new BadRequestException(ArtistErrors.INCORRECT_BODY);
    }

    if (!validateUuid(id)) {
      throw new BadRequestException(ArtistErrors.INVALID_ID);
    }

    const artistsIndex = db.artists.findIndex((artist) => artist.id === id);

    if (artistsIndex !== -1) {
      const oldData = db.artists[artistsIndex];
      db.artists[artistsIndex] = { ...oldData, ...dto };
    } else {
      throw new NotFoundException(ArtistErrors.NOT_FOUND);
    }

    return db.artists[artistsIndex];
  }

  async deleteArtist(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException(ArtistErrors.INVALID_ID);
    }

    const artistsIndex = db.artists.findIndex((artist) => artist.id === id);

    if (artistsIndex !== -1) {
      db.artists.splice(artistsIndex, 1);
    } else {
      throw new NotFoundException(ArtistErrors.NOT_FOUND);
    }
  }
}
