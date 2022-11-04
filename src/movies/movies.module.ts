import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    controllers: [MoviesController],
    providers: [MoviesService],
})
export class MoviesModule {}

// Controller의 this.moviesService.getAll(); 이게 작동하는 이유는
// moviesService라 불리는 property를 만들고! 
// 타입을 지정 typescript가 아니라면 작동하지 않았을 뭔가를 import 해줘야 작동
// type만 import

// movies.module.ts controller provider를 import
// providers가 controllers에 있는 모든 것들을
// import해서 타입을 추가하는 것만으로도 잘 작동!

// 여기에 providers를 두면 
// nestjs가 moviesService를 import하고 controller에 inject할거야!

///////////////////////////////////////////////////

// MoviesService에 Injectable decorator
// dependency injection >> NestJs가 알아서 import해줌!

// module에 없으면!
// MoviesService가 없으면 에러가 생길거임
// MoviesController가 MoviesService이게 필요하다고 함
// dependency injection

//nestjs가 알아서 import
// https://choidr.tistory.com/entry/NestJS-%EC%9D%98%EC%A1%B4%EC%84%B1-%EC%A3%BC%EC%9E%85