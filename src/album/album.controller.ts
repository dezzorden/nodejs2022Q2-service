import {
  Controller,
  Get,
  Put,
  HttpCode,
  Param,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { Album } from './album.entity';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Album> {
    return this.albumService.getAlbumById(id);
  }

  @Get()
  async getAll(): Promise<Album[]> {
    return this.albumService.getAllAlbums();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumService.updateAlbum(updateDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
