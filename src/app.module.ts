import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [MoviesModule],
  // 여기에 여러가지를 import하고 nestjs가 앱을 구동하면!
  // main.ts의 const app = await NestFactory.create(AppModule);
  // 여기에서 하나의 모듈로 생성해 줄거여!
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

// appcontroller와 appmodule만 있어야 된다!
// moives co, s는 moviesmodule로

// app.module가 MoviesModule를 import

// 앱을 만들 때 모듈로 분리해야 좋다고 한다
// 그래서 app.module.ts가 이것들을 import하게!

// 언제 app.module을 쓰고, controller provider를 만들어?

// mysqld 서버!