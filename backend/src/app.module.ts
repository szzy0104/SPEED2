import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './config/mongoose.config';
import { SubmissionsModule } from './submissions/submissions.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({ useFactory: () => mongooseConfig }),
    SubmissionsModule,
  ],
})
export class AppModule {}