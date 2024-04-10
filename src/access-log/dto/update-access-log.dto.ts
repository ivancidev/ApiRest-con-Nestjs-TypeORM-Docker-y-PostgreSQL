import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessLogDto } from './create-access-log.dto';

export class UpdateAccessLogDto extends PartialType(CreateAccessLogDto) {}
