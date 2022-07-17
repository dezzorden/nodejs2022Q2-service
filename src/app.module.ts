import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({})
export class AppModule {
  public static initialize(): DynamicModule {
    const Modules = [UserModule, InMemoryDBModule.forRoot({})];
    return {
      module: AppModule,
      imports: [ConfigModule.forRoot(), ...Modules],
      controllers: [],
      providers: [],
    };
  }
}
