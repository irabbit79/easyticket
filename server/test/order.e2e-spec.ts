/**
 * @description This is a test suite for the order management API.
 * NOTE: just a quick test to check basic order api works
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Orders (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Order Management', () => {
    const testOrder = {
      userId: 1,
      eventId: 1,
      numberOfTickets: 10,
    };

    describe('POST /orders', () => {
      it('should create a new order', async () => {
        //create a user first
        const user = await request(app.getHttpServer()).post('/users').send({
          name: 'John Doe',
        });

        //add an event
        const event = await request(app.getHttpServer()).post('/events').send({
          id: -1,
          name: 'New Event',
          desc: 'New Event Desc',
          numberOfTickets: 10,
        });

        return request(app.getHttpServer())
          .post('/orders')
          .send({
            userId: user.body.id,
            eventId: event.body.id,
            numberOfTickets: 2,
          })
          .expect(201)
          .expect((res) => {
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('referenceNumber');
            expect(res.body).toHaveProperty('createdAt');
            expect(res.body.status).toBe('confirmed');
          });
      });
    });


    describe('GET /users/:userId/orders', () => {
      it('should get orders for a specific user', async () => {
        // First create an order for the user
        await request(app.getHttpServer())
          .post('/orders')
          .send(testOrder);

        // Then get orders for that user
        return request(app.getHttpServer())
          .get(`/users/${testOrder.userId}/orders`)
          .expect(200)
          .expect((res) => {
            expect(Array.isArray(res.body)).toBe(true);
            const orders = res.body;
            if (orders.length > 0) {
              expect(orders[0]).toHaveProperty('id');
              expect(orders[0]).toHaveProperty('referenceNumber');
              expect(orders[0]).toHaveProperty('createdAt');
              expect(orders[0]).toHaveProperty('status');
            }
          });
      });

      it('should return empty array for user with no orders', () => {
        return request(app.getHttpServer())
          .get('/users/999/orders')
          .expect(200)
          .expect((res) => {
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBe(0);
          });
      });
    });
  });
});
