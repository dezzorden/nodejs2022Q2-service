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
import { Artist } from './artist.entity';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Artist> {
    return this.artistService.getArtistById(id);
  }

  @Get()
  async getAll(): Promise<Artist[]> {
    return this.artistService.getAllArtists();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.updateArtist(updateDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
