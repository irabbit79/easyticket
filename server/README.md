

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
```
#### Create User
- **Endpoint**: `POST /users`
- **Description**: Creates a new user
- **Request Body**:
```json
{
  "name": string
}
```

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
```

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
```

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
