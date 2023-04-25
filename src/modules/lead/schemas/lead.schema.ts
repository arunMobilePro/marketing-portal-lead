import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { LeadFile, leadFileSchema } from './leadFile.schema';
export type LeadDocument = Lead & Document;

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
export class Lead {

  @Prop({ required: true })
  sourceType: mongooseSchema.Types.String;

  @Prop({ required: true })
  sourceUrl: mongooseSchema.Types.String;

  @Prop({ required: true })
  companyName: mongooseSchema.Types.String;

  @Prop({ required: true, unique:true })
  industryType: mongooseSchema.Types.String;

  @Prop({ default: null, ref: 'User' })
  crm: mongooseSchema.Types.ObjectId;

  @Prop({ default: null, ref: 'User' })
  leadGenerator: mongooseSchema.Types.ObjectId;

  @Prop({ default: null, ref: 'User' })
  teamManager: mongooseSchema.Types.ObjectId;

  @Prop({ default: null, type: [leadFileSchema] })
  files: [LeadFile]
  
  @Prop({ default: false })
  active: mongooseSchema.Types.Boolean;

  @Prop({ default: 0 })
  status: mongooseSchema.Types.Number;

}

const leadSchema = SchemaFactory.createForClass(Lead);
leadSchema.virtual('id').get(function (this: LeadDocument) {
  return this._id;
});
export { leadSchema };