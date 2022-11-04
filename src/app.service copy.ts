import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nest!';
  }
  getHi():string {
    return "Hello everyone";
  }
}

// controllers의 function을 놓는 곳이 service;
// 사실 비지니스 로직을 실행하는 역할!

// 컨트롤러에 모든 url을 다 넣고 서비스는 필요하다면 데이터 베이스에 연락!

// rest api를 만들 것이기 때문에 컨트롤러와 서비스 만들거임!