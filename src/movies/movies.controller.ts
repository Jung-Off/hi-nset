import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { create } from 'domain';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';


// 여기서는 브라우저에서 못찾아! 이 컨트롤러가 movies 컨트롤러여서!
// 컨트롤러의 이름이 뭐냐고 물었을 떄 입력한 이름의 값이
// 특별하게 취급이 되어서!
@Controller('movies')
// 이 부분이 컨트롤러를 위한 url
// 우리 url의 entry point를 컨트롤
export class MoviesController {

    //서비스에 접근할 수 있는 방법이 없다! 수동 import하는 것이 아님
    // nestjs에서는 우리는 요청을 한다!
    constructor(private readonly moviesService: MoviesService) {}
    //생성자는 moviesService라는 클래스를 가져!

    // 비어있는 get 이건 라우터
    @Get()
    getAll() : Movie[] {
        // @Req() req, @Res() res
        // res.json()
        // 이렇게 express에서 req, res 객체 사용방식
        // 프레임워크 바꾸면 문제! Express나 Fastify 사용한다면 이런식으로 사용x
        // express Fastify사이에 전환하고 싶을 때 Nestjs가 알아서 전환!
        // 비추!
        return this.moviesService.getAll();
    }

    // search를 id로 판단해서 위로 올렸어
    // @Get("search")
    // search(@Query("year") searchingYear:string){
    //     return `We are searching for a movie made after : ${searchingYear}`;  
    // }

    // id별 movie
    // url에 있는 id를 알고 싶어! >> 무언가가 필요하면 요청해야 해!
    @Get(':id')
    // 여기서 요청하는 방법은 parameter를 요청하는 것!
    // 이 경우에 우리는 url에 있는 id라는 parameter로 get하길 원함
    getOne(@Param('id') movieId: number) : Movie {
        // id라는 parameter를 id라는 argument에 저장하고 싶어 string!
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }
    // parameter의 decorator를 사용하면 nestjs는 너가 url에 있는 id parameter
    // 를 원하는 걸 알거야

    //request의 body를 가져오고 싶다!
    @Post()
    create(@Body() movieData: CreateMovieDto){
        // console.log(movieData);
        return this.moviesService.create(movieData);
    }
    
    @Delete(':id')
    remove(@Param('id') movieId: number){
        return this.moviesService.deleteOne(movieId);
    }
    
    //Put 전체 업데이트, Patch 일부 업데이트

    @Patch(':id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto){
        return this.moviesService.update(movieId, updateData);
    }


}
