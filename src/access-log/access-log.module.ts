import { Module } from '@nestjs/common';
import { AccessLogService } from './access-log.service';
import { AccessLogController } from './access-log.controller';

@Module({
  controllers: [AccessLogController],
  providers: [AccessLogService],
})
export class AccessLogModule {}
