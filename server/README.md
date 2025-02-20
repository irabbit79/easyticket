<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## API Documentation

The following REST APIs are available in this application:

### Users

#### Get All Users
- **Endpoint**: `GET /users`
- **Description**: Retrieves a list of all users
- **Response**: Array of user objects
```json
[
  {
    "id": number,
    "name": string,
    "createdAt": string,
    "orders": [
      {
        "id": number,
        "referenceNumber": string,
        "createdAt": string,
        "status": string
      }
    ],
    "reservations": [
      {
        "id": number,
        "tickets": number,
        "createdAt": string
      }
    ]
  }
]
```

#### Get User by ID
- **Endpoint**: `GET /users/:id`
- **Description**: Retrieves a specific user by their ID
- **Parameters**: 
  - `id` (path parameter): User ID
- **Response**: Single user object
```json
{
  "id": number,
  "name": string,
  "createdAt": string,
  "orders": [
    {
      "id": number,
      "referenceNumber": string,
      "createdAt": string,
      "status": string
    }
  ],
  "reservations": [
    {
      "id": number,
      "tickets": number,
      "createdAt": string
    }
  ]
}
#### Create User
- **Endpoint**: `POST /users`
- **Description**: Creates a new user
- **Request Body**:
```json
{
  "name": string
}
### Events  

#### Get All Events
- **Endpoint**: `GET /events`
- **Description**: Retrieves a list of all events
- **Response**: Array of event objects
```json
[
  {
    "id": number,
    "name": string,
    "desc": string,
    "date":string,
    "tickets":number
  }
]
### Order tickets 

#### Make an order
- **Endpoint**: `POST /orders`
- **Description**: Make an order for an event tickets
- **Request Body**:
```json
 {
   "userId": 58,
   "eventId": 31,
   "numberOfTickets":1
}



#### Reset Database
- **Endpoint**: `GET /reset-database`
- **Description**: Deletes all users from the database (for testing purposes) and add test event with 100 tickets
- **Response**: No content

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash

# e2e tests (order api test only, other tests are skipped for now )
$ npm run test:e2e

```

## Deployment


```bash
$ npm i -g @nestjs/cli
$ npm install --save @nestjs/typeorm typeorm mysql2 @nestjs/graphql
$ npm install
```
