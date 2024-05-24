import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { AccessLogService } from './access-log.service';
import { CreateAccessLogDto } from './dto/create-access-log.dto';
import { UpdateAccessLogDto } from './dto/update-access-log.dto';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

@ApiTags('AccessLog')
@Controller('access-log')
export class AccessLogController {
  constructor(private readonly accessLogService: AccessLogService) {}

  @Post()
  async create(@Body() createAccessLogDto: CreateAccessLogDto) {
    return this.accessLogService.create(createAccessLogDto);
  }

  @Get()
  async findAll() {
    return this.accessLogService.findAll();
  }

  // @Get()
  // async findAll(@Query('userId') userId: UUID) {
  //   return this.accessLogService.findAll({ userId: userId});
  // }

  @Get(':id')
  async findOne(@Param('id') id: UUID) {
    return this.accessLogService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: UUID, @Body() updateAccessLogDto: UpdateAccessLogDto) {
    return this.accessLogService.update(id, updateAccessLogDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: UUID) {
    return this.accessLogService.remove(id);
  }
}
