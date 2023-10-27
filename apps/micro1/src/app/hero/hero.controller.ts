import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

interface HeroById {
  id: number;
}

interface Hero {
  id: number;
  name: string;
}

@Controller('hero')
export class HeroController {
  private items = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  @GrpcMethod('HeroesService', 'FindOne')
  findOne(
    data: HeroById,
    metaData: Metadata,
    call: ServerUnaryCall<any, any>
  ): Hero {
    return this.items.find((item) => item.id === data.id);
  }
}
