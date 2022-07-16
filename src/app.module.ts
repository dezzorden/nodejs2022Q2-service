import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({})
export class AppModule {
  public static initialize(): DynamicModule {
    const Modules = [UserModule];
    return {
      module: AppModule,
      imports: [ConfigModule.forRoot(), ...Modules],
      controllers: [],
      providers: [],
    };
  }
}
