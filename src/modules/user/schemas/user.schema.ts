import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
export type UserDocument = User & Document;
const RoleENUM = {
    CRM: 'CRM',
    MANAGER: 'MANAGER',
    LEAD_GENERATOR: 'LEAD_GENERATOR',
    ADMIN: 'ADMIN',
  };

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  toJSON: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class User {

  @Prop({ required: true })
  firstName: mongooseSchema.Types.String;

  @Prop({ required: true })
  lastName: mongooseSchema.Types.String;

  @Prop({ required: true, unique:true })
  email: mongooseSchema.Types.String;

  @Prop({ default: null })
  mobile: mongooseSchema.Types.Number;

  @Prop({default: RoleENUM.MANAGER, enum: RoleENUM })
  role: mongooseSchema.Types.String;

  @Prop({default: true})
  active: mongooseSchema.Types.Boolean
}

const userSchema = SchemaFactory.createForClass(User);
userSchema.virtual('id').get(function (this: UserDocument) {
  return this._id;
});
export { userSchema };