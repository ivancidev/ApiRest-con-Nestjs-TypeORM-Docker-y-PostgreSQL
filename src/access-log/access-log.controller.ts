import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessLogService } from './access-log.service';
import { CreateAccessLogDto } from './dto/create-access-log.dto';
import { UpdateAccessLogDto } from './dto/update-access-log.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AccessLog')
@Controller('access-log')
export class AccessLogController {
  constructor(private readonly accessLogService: AccessLogService) {}

  @Post()
  create(@Body() createAccessLogDto: CreateAccessLogDto) {
    return this.accessLogService.create(createAccessLogDto);
  }

  @Get()
  findAll() {
    return this.accessLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessLogDto: UpdateAccessLogDto) {
    return this.accessLogService.update(+id, updateAccessLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessLogService.remove(+id);
  }
}
