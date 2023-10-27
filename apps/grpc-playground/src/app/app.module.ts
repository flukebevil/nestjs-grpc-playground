import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5000',
          package: 'hero',
          protoPath: join(__dirname, '/assets/proto/micro/hero.proto'),
        },
      },
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5000',
          package: 'user',
          protoPath: join(__dirname, '/assets/proto/micro/user.proto'),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
