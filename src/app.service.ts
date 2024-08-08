import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  initApiMessage(): Object {
    return { status: 'API is listening' };
  }
}
