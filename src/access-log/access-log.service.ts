import { Injectable } from '@nestjs/common';
import { CreateAccessLogDto } from './dto/create-access-log.dto';
import { UpdateAccessLogDto } from './dto/update-access-log.dto';

@Injectable()
export class AccessLogService {
  create(createAccessLogDto: CreateAccessLogDto) {
    return 'This action adds a new accessLog';
  }

  findAll() {
    return `This action returns all accessLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accessLog`;
  }

  update(id: number, updateAccessLogDto: UpdateAccessLogDto) {
    return `This action updates a #${id} accessLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessLog`;
  }
}
