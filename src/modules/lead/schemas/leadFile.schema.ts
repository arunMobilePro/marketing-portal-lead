import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class LeadFile {
  @Prop({ type: String, required:true })
  name: string;

  @Prop({ type: String, required:true })
  type: string;

  @Prop({ type: String, required:true })
  size: string;

}
export const leadFileSchema = SchemaFactory.createForClass(LeadFile);