import { Module } from '@nestjs/common';
import { AccessLogService } from './access-log.service';
import { AccessLogController } from './access-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessLog } from './entities/access-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessLog])],
  controllers: [AccessLogController],
  providers: [AccessLogService],
})
export class AccessLogModule {}
