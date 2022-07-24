import { Controller, Get, Post, HttpCode, Param, Delete } from '@nestjs/common';
import { Favorites } from './favorites.entity';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAll(): Promise<Favorites> {
    return this.favoritesService.getAllfavorite();
  }

  @Post('track/:id')
  @HttpCode(201)
  async addFavTrack(@Param('id') id: string): Promise<void> {
    return this.favoritesService.addTrackTofavorite(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  async addFavAlbum(@Param('id') id: string): Promise<void> {
    return this.favoritesService.addAlbumTofavorite(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addFavArtist(@Param('id') id: string): Promise<void> {
    return this.favoritesService.addArtistTofavorite(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteFavTrack(@Param('id') id: string): Promise<void> {
    return this.favoritesService.deleteTrackFromfavorite(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteFavAlbum(@Param('id') id: string): Promise<void> {
    return this.favoritesService.deleteAlbumFromfavorite(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteFavArtist(@Param('id') id: string): Promise<void> {
    return this.favoritesService.deleteArtistFromfavorite(id);
  }
}
