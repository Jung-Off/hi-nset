import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[]{
        return this.movies;
    }

    getOne(id: number):Movie {
        // movie 라는 곳에 id가 일치하는 movie를 담자!
        // const movie = this.movies.find(movie => movie.id === parseInt(id));
        const movie = this.movies.find(movie => movie.id === id);
        if (!movie) {
            throw new NotFoundException(`Movie with ${id} not Found`);
        }
        return movie;
    }

    deleteOne(id:number) {
        this.getOne(id); // 여기에 에가 없으면 그 뒤는 문제가 없지 언제든 movie를 지울 수!
        // this.movies = this.movies.filter(movie => movie.id !== +id); // 질문1. filter란?
        this.movies = this.movies.filter(movie => movie.id !== id);
        // return true;
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({ 
            id: this.movies.length + 1,
            ...movieData,
        })
    }

    update(id:number, updateData: UpdateMovieDto) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData });
        // 질문2. 이거에 동작 방식
        // 질문3. ...movie
        
    }
}
