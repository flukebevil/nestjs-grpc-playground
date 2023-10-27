import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';

interface UserDTO {
  name: string;
  surname: string;
}

interface UserCreateResponse {
  id: string;
  name: string;
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod('UserService', 'save')
  async save(
    data: UserDTO,
    metaData: Metadata,
    call: ServerUnaryCall<any, any>
  ): Promise<UserCreateResponse> {
    const user = await this.userService.create(data);
    return { name: user.name, id: user._id?.toString() };
  }
}
