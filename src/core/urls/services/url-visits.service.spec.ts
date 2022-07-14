import { Test, TestingModule } from '@nestjs/testing';
import { UrlVisitsService } from './url-visits.service';

describe('UrlVisitsService', () => {
  let service: UrlVisitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlVisitsService],
    }).compile();

    service = module.get<UrlVisitsService>(UrlVisitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
