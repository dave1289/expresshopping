process.env.NODE_ENV = 'test'

const request = require('supertest')

const app = require('../app')
const list = require('../fakeDb')

let beans = { name: 'Beans', price: 1.99}

beforeEach(() => {
   list.push(beans)
})

afterEach(() => {
   list.length = 0;
})

describe('GET /item', () => {
   test('Gets shopping list', async function(){
      const resp = await request(app).get('/item');
      expect(resp.statusCode).toBe(200);

      expect(resp.body).toEqual({ list: [beans]})
   })
})

describe('GET /item/:name', function(){
   test('Gets specific item', async function(){
      const resp = await request(app).get(`/item/${beans.name}`)
      expect(resp.statusCode).toBe(200);

      expect(resp.body).toEqual({ item: beans})
   })

   test('Error handling item not found', async function(){
      const resp = await request(app).get(`/item/flimpers`)
      expect(resp.statusCode).toBe(404);
   })
})

describe('PATCH /item/:name', function(){
   test('Edits specific item', async function(){
      const resp = await request(app)
      .patch(`/item/${beans.name}`)
      .send({
         name: 'Carrots',
         price: 1.23
      })
      expect(resp.statusCode).toBe(404);

      expect(resp.body).toEqual({
         name: 'Carrots',
         price: 1.23
      })
   })
})