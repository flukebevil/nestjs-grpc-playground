import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  surname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
