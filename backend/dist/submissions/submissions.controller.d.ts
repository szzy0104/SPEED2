import { HttpStatus } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
export declare class SubmissionsController {
    private readonly submissionsService;
    constructor(submissionsService: SubmissionsService);
    create(createSubmissionDto: CreateSubmissionDto): Promise<{
        status: HttpStatus;
        data: import("./schemas/submission.schema").Submission;
    }>;
    findPending(): Promise<{
        status: HttpStatus;
        data: import("./schemas/submission.schema").Submission[];
    }>;
}
