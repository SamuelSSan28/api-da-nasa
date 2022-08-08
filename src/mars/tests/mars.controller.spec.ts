import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { MarsController } from '../mars.controller';
import { MarsService } from '../mars.service';

describe('MarsController', () => {
  let controller: MarsController;
  let app: INestApplication;
  let bodyResponse:any;
  let server: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarsController],
      providers: [MarsService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
    server.close();
  });

  it('Cenarios corretos', async () => {
    const request1 = await request(server).post('/mars/MMRMMRMM').expect(200);
    bodyResponse = JSON.parse(request1.text);
    expect(bodyResponse).toStrictEqual([2, 0, 'S']);

    const request2 = await request(server).post('/mars/MMRMMRML').expect(200);
    bodyResponse = JSON.parse(request2.text);
    expect(bodyResponse).toStrictEqual([2, 1, 'W']);

    const request3 = await request(server).post('/mars/MMRMMRML').expect(200);
    bodyResponse = JSON.parse(request3.text);
    expect(bodyResponse).toStrictEqual([2, 1, 'W']);
  });

  it('Cenarios que ultrapassam os limites do Terreno', async () => {
    await request(server).post('/mars/MMMMMMM').expect(400);

    await request(server).post('/mars/MMMMMMMMMMMMM').expect(400);

    await request(server).post('/mars/RRMMM').expect(400);
  });


  it('Comando inválido', async () => {
    await request(server).post('/mars/MMMMMMMA').expect(400);

    await request(server).post('/mars/AAAA').expect(400);

    await request(server).post('/mars/RBRMMMA').expect(400);
  });
});
