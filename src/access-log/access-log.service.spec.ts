import { Test, TestingModule } from '@nestjs/testing';
import { AccessLogService } from './access-log.service';

describe('AccessLogService', () => {
  let service: AccessLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessLogService],
    }).compile();

    service = module.get<AccessLogService>(AccessLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
