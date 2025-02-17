BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "event_entity" (
	"id"	integer NOT NULL,
	"name"	varchar NOT NULL,
	"desc"	varchar NOT NULL,
	"date"	datetime NOT NULL,
	"tickets"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "user_entity" (
	"id"	integer NOT NULL,
	"name"	varchar NOT NULL COLLATE NOCASE,
	"createdAt"	datetime NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "UQ_3fe76ecf0f0ef036ff981e9f67d" UNIQUE("name")
);
CREATE TABLE IF NOT EXISTS "reservation_entity" (
	"id"	integer NOT NULL,
	"tickets"	integer NOT NULL,
	"createdAt"	datetime NOT NULL,
	"userId"	integer,
	"eventId"	integer,
	"orderId"	integer,
	CONSTRAINT "FK_4e79ec0e365b33491cdb38f6e02" FOREIGN KEY("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT "FK_c9cd00a376825d5cd078305711e" FOREIGN KEY("eventId") REFERENCES "event_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT "FK_cb0eabc86f60b0c57d4bfb492b7" FOREIGN KEY("orderId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "order_entity" (
	"id"	integer NOT NULL,
	"referenceNumber"	varchar(10) NOT NULL,
	"createdAt"	datetime NOT NULL,
	"status"	varchar NOT NULL DEFAULT ('pending'),
	"userId"	integer,
	CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e" FOREIGN KEY("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
	PRIMARY KEY("id" AUTOINCREMENT)
);
COMMIT;
