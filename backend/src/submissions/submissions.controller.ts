import { Controller, Post, Get, Body, HttpStatus } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Controller('api/submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  async create(@Body() createSubmissionDto: CreateSubmissionDto) {
    return {
      status: HttpStatus.CREATED,
      data: await this.submissionsService.create(createSubmissionDto),
    };
  }

  @Get('pending')
  async findPending() {
    return {
      status: HttpStatus.OK,
      data: await this.submissionsService.findPending(),
    };
  }
}