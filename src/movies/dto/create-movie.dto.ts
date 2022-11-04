import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto{

    @IsString()
    readonly title: string;
    @IsNumber()
    readonly year: number;

    @IsOptional()
    @IsString({ each:true })
    readonly genres: string[];
}

//main.ts
// app.useGlobalPipes(new ValidationPipe());
// 와 그걸로 검사하는 CreateMovieDto를 사용하고 있기 떄문에!
// 유효성 체크를 할 수 있다!