import { expect } from 'chai';
import { set } from './helpers';

describe('set function', () => {
  const path = 'a';
  const value = 'value';
  let obj: Record<string, unknown>;

  beforeEach(() => {
    obj = {};
  });

  it('should set a value by path', () => {
    set(obj, path, value);

    expect(obj).to.haveOwnProperty(path, value);
  });

  it('should mutate original object', () => {
    const result = set(obj, path, value);

    obj.b = 'b';

    expect(result).to.equal(obj);
  });

  it('should return original object parameter if it is is not an object', () => {
    const notObj = 'string';

    const result = set(notObj, path, value);

    expect(result).to.eq(notObj);
  });

  it('should throw an error if path is not a string', () => {
    const notString = 10;

    // @ts-ignore we should keep original ts checks regardless tests
    const func = () => set(obj, notString, value);

    expect(func).to.throw(Error);
  });
});
