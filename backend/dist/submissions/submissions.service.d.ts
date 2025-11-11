import { Model } from 'mongoose';
import { Submission, SubmissionDocument } from './schemas/submission.schema';
import { CreateSubmissionDto } from './dto/create-submission.dto';
export declare class SubmissionsService {
    private submissionModel;
    constructor(submissionModel: Model<SubmissionDocument>);
    create(createSubmissionDto: CreateSubmissionDto): Promise<Submission>;
    findPending(): Promise<Submission[]>;
}
