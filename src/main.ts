import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 하나의 모듈에서 어플리케이션을 생성
// Appmodule 모든 것의 루트 모듈

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, //true는 아무 decorator도 없는 property의 object 거릅
    forbidNonWhitelisted:true,//누군가가 이상한 걸 보내면 리퀘스트 자체를 막아버릴 수도 있다!
    
    //movie를 하나 가져올 땐 하나의 parameter를 가져와id 문제가 string
    // url은 string 이걸 number로 바꿔!
    // entity를 보면 number여야 하는 걸 알 수 있어
    // 이걸 위해서 추가
    transform:true
    // 우리가 원하는 실제 타입으로 변환해줘!
  }),
  );
  await app.listen(3000);
}
bootstrap();
