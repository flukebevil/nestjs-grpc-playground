import { Module } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    HeroModule,
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: process.env.DB_HOST,
          dbName: process.env.DB_NAME,
          user: process.env.DB_USERNAME,
          pass: process.env.DB_PASSWORD,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
