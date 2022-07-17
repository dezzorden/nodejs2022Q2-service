import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../DB/db';
import { validateUuid } from 'src/utils';
import { Track, TrackErrors } from './track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async createTrack(createDto: CreateTrackDto): Promise<Track> {
    const newTrack: Track = {
      id: uuidv4(),
      ...createDto,
    };

    db.tracks.push(newTrack);

    return newTrack;
  }

  checkTrack(id): Track {
    return db.tracks.find((track) => track.id === id);
  }

  async getTrackById(id: string): Promise<Track> {
    if (!validateUuid(id)) {
      throw new BadRequestException(TrackErrors.INVALID_ID);
    }

    const condidate = this.checkTrack(id);

    if (!condidate) {
      throw new NotFoundException(TrackErrors.NOT_FOUND);
    }

    return condidate;
  }

  async getAllTracks(): Promise<Track[]> {
    return db.tracks;
  }

  async updateTrack(dto: UpdateTrackDto, id: string): Promise<Track> {
    if (typeof dto.duration !== 'number' || typeof dto.name !== 'string') {
      throw new BadRequestException(TrackErrors.INCORRECT_BODY);
    }

    if (!validateUuid(id)) {
      throw new BadRequestException(TrackErrors.INVALID_ID);
    }

    const tracksIndex = db.tracks.findIndex((track) => track.id === id);

    if (tracksIndex !== -1) {
      const oldData = db.tracks[tracksIndex];
      db.tracks[tracksIndex] = { ...oldData, ...dto };
    } else {
      throw new NotFoundException(TrackErrors.NOT_FOUND);
    }

    return db.tracks[tracksIndex];
  }

  async deleteRef(id: string, field: string): Promise<void> {
    if (field === 'artistId' || field === 'albumId') {
      db.tracks.map((track) => {
        if (track[field] === id) {
          track[field] = null;
        }
      });
    }
  }

  async deleteTrack(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException(TrackErrors.INVALID_ID);
    }

    await this.favoritesService.deleteRef(id, 'tracks');

    const tracksIndex = db.tracks.findIndex((track) => track.id === id);

    if (tracksIndex !== -1) {
      db.tracks.splice(tracksIndex, 1);
    } else {
      throw new NotFoundException(TrackErrors.NOT_FOUND);
    }
  }
}
