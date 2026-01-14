import request from 'supertest'
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

describe('Todo route testing ', () => {

  beforeAll(async () => {
    await testServer.start()
  });

  afterAll(() => {
    testServer.close()
  })

  const todo1 = { text: 'Hola Mundo 1' };
  test('should return TODOs api/todos', async() => {
    const { body } = await request(testServer.app)
      .get('/api/todos')
      .expect(200);
    expect(body).toBeInstanceOf(Array);
    // expect(body.length).toBe(5);
    expect(typeof body[0].text).toBe('string');
    expect(body[0].completedAt).not.toBeNull();
  })

  test('should return a TODO api/todos/:id', async () => {
    const { body } = await request(testServer.app)
      .get(`/api/todos/${7}`)
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: expect.any(String),
      completedAt: null
    });
  })

  test('should return a 404 NotFound api/todos/:id', async () => {
    const todoId = 999;
    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoId}`)
      .expect(400);

    expect(body).toEqual({ err: `Todo with id ${todoId} not found` });
  })
  
  // test('should return a New Todo api/todos/:id', async () => {
  //   const { body } = await request(testServer.app)
  //     .post(`/api/todos`)
  //     .send(todo1)
  //     .expect(201);

  //   expect(body).toEqual({
  //     id: expect.any(Number),
  //     text: todo1.text,
  //     completedAt: null
  //   })
  // })
  
  test('should return an Error if text is not valid api/todos/:id', async () => {
    const { body } = await request(testServer.app)
      .post(`/api/todos`)
      .send({ text: '' })
      .expect(400);

    expect(body).toEqual( { error: 'Text property is required' })
  })


  test('should return an updated TODO api/todos/:id', async () => {
    const { body } = await request(testServer.app)
      .put(`/api/todos/${10}`)
      .send({text: 'HOLA MUNDO UPDTAE', completedAt: '2021-10-21'})
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: 'HOLA MUNDO UPDTAE',
      completedAt: '2021-10-21T00:00:00.000Z'
    });
  })
  test('should return 404 if TODO not found api/todos/:id', async () => {
    const { body } = await request(testServer.app)
      .put(`/api/todos/${40}`)
      .send({text: 'HOLA MUNDO UPDTAE', completedAt: '2021-10-21'})
      .expect(400);
    expect(body).toEqual({ err: `Todo with id ${40} not found` });
  })
  
  test('should return an updated TODO only the date api/todos/:id', async () => {
    const { body } = await request(testServer.app)
      .put(`/api/todos/${15}`)
      .send({completedAt: '2021-10-21'})
      .expect(200);
    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: '2021-10-21T00:00:00.000Z'
    });
  })
});