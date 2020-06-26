import { DeepPartial } from './partial/deepPartial';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createMockList<T extends object>(quantity: number, iterator?: (index: number) => DeepPartial<T>): T[] {
  throw new Error(`
    ts-auto-mock is not been configured as a transformer. Please follow the instructions in https://typescript-tdd.github.io/ts-auto-mock/installation
    If help is required you can find us on https://typescript-tdd.github.io
  `);
}
