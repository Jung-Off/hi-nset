import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { send } from 'process';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  // beforeEach >> beforeAll
  // 새로운 어플리케이션을 만들고 싶지 않아! 매번테스트 할 때 마다!
  // 테스팅을 시작하기 전에 새 어플리케이션을 만들자!
  // POST의 movie를 테스트를 진행하는 동안 계속 기억
  // 새로운 테스트를 진행할 때마다 어플리케이션이 새로 생성!
  //db가 텅텅
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true
    }),
    );
    await app.init();
  });

  // url에 대한 요청을 테스팅
  // Controller, Service, Pipe결과에 대해 모든 테스터 중
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  // it("/movies (GET)", () => {
    // return request(app.getHttpServer())
    // .get('/movies')
    // .expect(200)
    // .expect([]);
  // })

  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([]);
    });
    it("POST 201", () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title:"Test",
          year:2000,
          genres: ['test'],
        })
        .expect(201);
    });
    it("POST 400", () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title:"Test",
          year:2000,
          genres: ['test'],
          other: 'thing',
        })
        .expect(400);
    });
    it("DELETE", () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404);
    });
  });
  describe('/movies/:id', () => {
    // it.todo('GET');
    // it.todo('DELETE');
    // it.todo('PATCH');
    it('GET 200', () => {
      return request(app.getHttpServer())
      .get("/movies/1")
      .expect(200);
      // post 에다가 Movie를 생성해 놨는데 >> 404
      // insomnia는 테스팅 서버가 아니라 실제 어플리케이션 위에서 돌아가는 서버
      // >> 잘 찾아와 number로
      // getOne(id: number)
      // console.log(typeof id);
      // >> test에서는 string
      // 그래서 movie를 찾을 수 없었던 거야!
      // movie.is는 number고 id는 string

      // 실제 사용하는 서버에서는 id가 number,, test는 string
      // main.ts의 transform!!! >> controller에서 타입을 너가 원하는 걸로 바꿔줌!
      // url은 string e2e테스트에서는 transform이 작동 x
      // 그 이유는 app생성시 pipe를 올리지x
      // 이점을 테스트시 기억! >> 테스트에서도 실제 어플리케이션의 환경을 적용!
      //
    })
    it('GET 404', () => {
      return request(app.getHttpServer())
      .get("/movies/999")
      .expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({ title: 'Updated Test' })
      .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    });
  })
  
});

// 테스트 환경도 실제 구동 환경의 설정을 그대로 적용!