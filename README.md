# Ts Auto Mock
[![CircleCI](https://circleci.com/gh/uittorio/ts-auto-mock/tree/master.svg?style=svg)](https://circleci.com/gh/uittorio/ts-auto-mock/tree/master) [![Greenkeeper badge](https://badges.greenkeeper.io/uittorio/ts-auto-mock.svg)](https://greenkeeper.io/)

A Typescript transformer that will allow you to create mock for any types (Interfaces, Classes, ...) without need to create manual fakes/mocks.

Let's have a look.

* If you are interested to use it with jasmine please go to [jasmine-ts-auto-mock](https://github.com/uittorio/jasmine-ts-auto-mock)
* If you are interested to use it with jest please go to [jest-ts-auto-mock](https://github.com/uittorio/jest-ts-auto-mock)

## Requirements
`
typescript@^3.2.2
`

## Installation
A Transformer needs to be provided at compile time. There are different ways to do it.
[Please read the following guide to find your configuration](docs/TRANSFORMER.md)

## Usage
#### Create mock
```ts
import { createMock } from 'ts-auto-mock';

interface Person {
  id: string;
  getName(): string;
  details: {
      phone: number
  }
}
const mock = createMock<Person>();
mock.id // ""
mock.getName() // ""
mock.details // "{phone: 0} "
```

#### Create mock list
createMock list it will create a list of mocks automatically
```ts
import { createMockList } from 'ts-auto-mock';

interface Person {
  id: string;
}
const mockList = createMockList<Person>(2);
mockList.length // 2
```

## Type Examples
The library try to convert the type given to createMock so you dont need to create concrete mock manually.
[Open this link to see more examples](docs/DETAILS.md)

## Extension
The library allows you to extends some functionality to work nicely with framework like jasmine or jest
[Open this link to see more examples](docs/EXTENSION.md)

## [Changelog](CHANGELOG.md)

## Authors

* **Vittorio Guerriero**
* **Giulio Caprino** 

## License

This project is licensed under the MIT License
