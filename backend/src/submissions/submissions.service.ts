import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Submission, SubmissionDocument } from './schemas/submission.schema';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<SubmissionDocument>,
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto): Promise<Submission> {
    const existing = await this.submissionModel.findOne({ doi: createSubmissionDto.doi });
    if (existing) {
      throw new ConflictException('该DOI已提交过');
    }
    const createdSubmission = new this.submissionModel(createSubmissionDto);
    return createdSubmission.save();
  }

  async findPending(): Promise<Submission[]> {
    return this.submissionModel.find({ status: 'pending' }).sort({ createdAt: -1 }).exec();
  }
}