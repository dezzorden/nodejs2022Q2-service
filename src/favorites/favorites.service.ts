import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { db } from 'src/DB/db';
import { validateUuid } from 'src/utils';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { Favorites, FavoriteErrors } from './favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  async getAllfavorite(): Promise<Favorites> {
    return db.favorite;
  }

  async addTrackTofavorite(id: string) {
    if (!validateUuid(id)) {
      throw new BadRequestException(FavoriteErrors.INVALID_ID);
    }

    const condidate = await this.trackService.checkTrack(id);

    if (condidate) {
      db.favorite.tracks.push(condidate);
    } else {
      throw new UnprocessableEntityException(FavoriteErrors.UNPROCESSABLE_ID);
    }
  }

  async addAlbumTofavorite(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException(FavoriteErrors.INVALID_ID);
    }

    const condidate = await this.albumService.checkAlbum(id);

    if (condidate) {
      db.favorite.albums.push(condidate);
    } else {
      throw new UnprocessableEntityException(FavoriteErrors.UNPROCESSABLE_ID);
    }
  }

  async addArtistTofavorite(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException(FavoriteErrors.INVALID_ID);
    }

    const condidate = await this.artistService.checkArtist(id);

    if (condidate) {
      db.favorite.artists.push(condidate);
    } else {
      throw new UnprocessableEntityException(FavoriteErrors.UNPROCESSABLE_ID);
    }
  }

  async deleteTrackFromfavorite(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException(FavoriteErrors.INVALID_ID);
    }

    const condidate = await this.trackService.getTrackById(id);

    if (condidate) {
      db.favorite.tracks = db.favorite.tracks.filter(
        (track) => track.id !== id,
      );
    } else {
      throw new NotFoundException(FavoriteErrors.NOT_FOUND);
    }
  }

  async deleteAlbumFromfavorite(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException(FavoriteErrors.INVALID_ID);
    }

    const condidate = await this.albumService.getAlbumById(id);

    if (condidate) {
      db.favorite.albums = db.favorite.albums.filter(
        (album) => album.id !== id,
      );
    } else {
      throw new NotFoundException(FavoriteErrors.NOT_FOUND);
    }
  }

  async deleteArtistFromfavorite(id: string): Promise<void> {
    if (!validateUuid(id)) {
      throw new BadRequestException(FavoriteErrors.INVALID_ID);
    }

    const condidate = await this.artistService.getArtistById(id);

    if (condidate) {
      db.favorite.artists = db.favorite.artists.filter(
        (artist) => artist.id !== id,
      );
    } else {
      throw new NotFoundException(FavoriteErrors.NOT_FOUND);
    }
  }

  async deleteRef(id: string, field: string) {
    if (field === 'artists' || field === 'albums' || field === 'tracks') {
      const ref = db.favorite[field].findIndex((entity) => entity.id === id);
      if (ref !== -1) {
        db.favorite[field].splice(ref, 1);
      }
    }
  }
}
