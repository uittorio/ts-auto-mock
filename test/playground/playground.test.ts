import { createMock } from 'ts-auto-mock';

/*
 USE THIS FILE ONLY FOR TESTING NEW IMPLEMENTATION
 1) build the module you need
 2) run test:playground to see if it pass
 3) run build:playground to see the output generated

 */

it('should work', () => {
  type WithNumber = {
    propertyName: number;
  };

  createMock<WithNumber>();
});
