import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({})
export class AppModule {
  public static initialize(): DynamicModule {
    const Modules = [
      UserModule,
      ArtistModule,
      TrackModule,
      AlbumModule,
      FavoritesModule,
    ];
    return {
      module: AppModule,
      imports: [ConfigModule.forRoot(), ...Modules],
      controllers: [],
      providers: [],
    };
  }
}
