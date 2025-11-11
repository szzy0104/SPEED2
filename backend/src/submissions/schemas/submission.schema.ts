import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubmissionDocument = Submission & Document;

@Schema({ timestamps: true })
export class Submission {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  doi: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  author: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);