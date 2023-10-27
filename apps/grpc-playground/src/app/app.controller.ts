import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { AppService, User } from './app.service';
import { ClientGrpc } from '@nestjs/microservices';

interface HeroService {
  FindOne(payload: { id: number }): Promise<{ message: string }>;
}

@Controller()
export class AppController implements OnModuleInit {
  private heroService: HeroService;

  constructor(
    private readonly appService: AppService,
    @Inject('HERO_PACKAGE') private heroClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.heroService = this.heroClient.getService<HeroService>('HeroesService');
  }

  @Get('/test-grpc')
  getGreetingFromGrpc() {
    return this.heroService.FindOne({ id: 1 });
  }

  @Post('/user')
  createUser(@Body() userData: User) {
    return this.appService.create(userData);
  }
}
