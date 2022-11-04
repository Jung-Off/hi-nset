import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //unit-test
  describe("getAll", () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array); // 배열을 리턴하는지 안 하는지 테스트
    });
  });
  describe("getOne", () => {
    
    it("should return a movie", () =>{
      // movie가 create가 되어있지 않다면 문제! moive생성!
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1); // id가 1인 movie로 getOne을 호출!
      expect(movie).toBeDefined();
      // expect(movie.id).toEqual(1);
    });

    it("should throw a NotFoundException", () => {
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        // expect(e.message).toEqual("Movie with 999 not Found");
      }
    });
  });

  describe("deleteOne", () => {
    it("deletes a movie", () => {
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it("should return a 404 ", () => {
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll.length
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {
    it("should update a movie", () => {
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });
      service.update(1, {title: 'Updated Test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
    it("should throw a NotFoundException", () => {
      try{
        service.update(999, {});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

});


//beforeEach, afterEach, beforeAll, afterAll
//afterAll db를 깨끗하게 정리해주는 function을 넣을 수 있어!

// beforeEach(fn, timeout) 전역 상태!
// 각각의 테스트가 실행되기 전에 매번 함수를 실행합니다.

// 각각의 테스트 전에 각 테스트에서 사용할 전역 상태를 재설정하려는 경우에 유용합니다.
// 함수가 promise을 반환하거나 generator인 경우 Jest는 테스트를 실행하기 전에 해당 promise가 해결될 때까지 기다립니다.
// 밀리초로 대기할 시간을 지정할 수 있습니다. (기본 시간 5초)
// https://jestjs.io/docs/api#beforeeachfn-timeout

// beforeAll(fn, timeout)
// 모든 테스트가 실행되기 전에 딱 한 번 함수를 실행합니다.

// afterEach(fn, timeout)
// 각각의 테스트가 완료된 후 함수를 실행합니다.

// afterAll(fn, timeout)
// 모든 테스트가 완료된 후 함수 (딱 한번) 실행합니다.