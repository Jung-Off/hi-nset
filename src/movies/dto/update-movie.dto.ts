import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

// export class UpdateMovieDto{

//     @IsString()
//     readonly title?: string;
//     @IsNumber()
//     readonly year?: number;

//     @IsString({ each:true })
//     readonly genres?: string[];
//     // 질문 이 물음표는 뭘까?
//     // 필수 사항이 아니다
// }

// 위와 같이 하는 대신! 부분 타입

export class UpdateMovieDto extends PartialType(CreateMovieDto) {

}