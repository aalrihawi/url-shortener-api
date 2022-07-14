import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateUrlVisitDto } from '../dto/create-url-visit.dto';
import { UrlVisitsService } from '../services/url-visits.service';

@Injectable()
export class UrlVisitInterceptor implements NestInterceptor {
  constructor(private urlVisitsService: UrlVisitsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((res) => {
        if (res.data) {
          const req = context.switchToHttp().getRequest();

          const createUrlVisitDto = new CreateUrlVisitDto();
          createUrlVisitDto.ip = req.socket.remoteAddress;
          createUrlVisitDto.urlId = res.data.id;

          this.urlVisitsService.create(createUrlVisitDto);
        }
      }),
    );
  }
}
