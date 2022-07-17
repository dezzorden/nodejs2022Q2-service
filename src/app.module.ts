import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';

@Module({})
export class AppModule {
  public static initialize(): DynamicModule {
    const Modules = [UserModule, ArtistModule, TrackModule];
    return {
      module: AppModule,
      imports: [ConfigModule.forRoot(), ...Modules],
      controllers: [],
      providers: [],
    };
  }
}
