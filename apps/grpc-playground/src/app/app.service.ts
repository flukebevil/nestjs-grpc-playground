import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

interface UserServiceRepository {
  save(payload: {
    name: string;
    surname: string;
  }): Promise<{ id: string; name: string }>;
}

export type User = {
  name: string;
  surname: string;
};

@Injectable()
export class AppService implements OnModuleInit {
  private userService: UserServiceRepository;

  constructor(@Inject('USER_PACKAGE') private userClient: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.userClient.getService<UserServiceRepository>('UserService');
  }

  create(payload: User) {
    return this.userService.save(payload);
  }
}
