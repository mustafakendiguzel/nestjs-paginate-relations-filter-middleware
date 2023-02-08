# nestjs-paginate-relations-filter-middleware

An enhanced middleware for capturing unrelated filters in nestjs-paginate page

[![npm version](https://img.shields.io/npm/v/nestjs-paginate-relations-filter-middleware)](https://www.npmjs.com/package/nestjs-paginate-relations-filter-middleware)
[![npm download by month](https://img.shields.io/npm/dm/nestjs-paginate-relations-filter-middleware)](https://npmcharts.com/compare/nestjs-paginate-relations-filter-middleware?minimal=true)

## Description

[Nestjs file mimetype filter](https://github.com/mustafakendiguzel/nestjs-paginate-relations-filter-middleware) An enhanced middleware for capturing unrelated filters for nestjs-paginate lib.

## Install

```bash
$ npm i nestjs-paginate-relations-filter-middleware
```

## Why was this package developed?

First of all, this package was developed for [nestjs-paginate lib](https://www.npmjs.com/package/nestjs-paginate). So don't forget to install nestjs-paginate before using this package

When sending relation via Swagger, it was supposed to come as relation[] but the server was giving 500 because it came as relation, we solved this problem with decals. The other problem is that if we try to filter about that package without sending a relation, we were getting 500 because the relation was not sent. This package was developed to solve the problems here.

Example;

```bash
Wrong Use: http://localhost:3000/patient-consent?filter.consentForm.id=86190245-1246-415b-a5e8-7c5813535f25

Correct Use: http://localhost:3000/patient-consent?relations=consentForm&filter.consentForm.id=86190245-1246-415b-a5e8-7c5813535f25
```

IF YOU ARE NOT USİNG THIS PACKAGE ERROR OUTPUT

```bash
{
    "statusCode": 500,
    "error": "Internal Server Error"
}
```

ERROR OUTPUT EXAMPLE(WITH THIS PACKAGE)

```bash
{
    "statusCode": 400,
    "message": "You need to type the Relation of the Filter you type. Example; WrongLink: http://localhost:3000/patient-consent?filter.consentForm.id=86190245-1246-415b-a5e8-7c5813535f25&relations=patient, CorrectLink: http://localhost:3000/patient-consent?relations=consentForm&filter.consentForm.id=86190245-1246-415b-a5e8-7c5813535f25&relations=patient",
    "error": "Bad Request"
}
```

With this package, we are now preventing the server from pulling(500). Also you can safely send relation from swagger.

## Quick Start

```bash
# For import
$ import { RelationFilterMiddleware,RelationDecorator } from 'nestjs-paginate-relations-filter-middleware';

```

## Injecting MiddleWare

```bash
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RelationFilterMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
```

## How to Use In Controller

```bash
@Get()
  @ApiQuery({ name: 'relations', required: false, type: [String], isArray: true }) // For Swagger
  findAll(@Paginate() query: PaginateQuery, @Relations() relation: any) {
    return this.patientGdprService.findAll(query, relation);
  }
```

## Stay in touch

- Author - Mustafa Kendigüzel

## License

Nestjs-file-mimetype-filter [MIT licensed](LICENSE).
