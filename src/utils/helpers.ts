/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
export type Indexed<T = any> = {
  [key in string]: T;
};

export type PlainObject<T = any> = {
  [k in string]: T;
};

export function trim(string: string, chars?: string): string {
  if (string && !chars) {
    return string.trim();
  }

  const reg = new RegExp(`[${chars}]`, 'gi');
  return string.replace(reg, '');
}

export function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export function merge(
  lhs: Indexed<unknown>,
  rhs: Indexed<unknown>,
): Indexed<unknown> {
  const result: Indexed<unknown> = { ...lhs };

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(rhs)) {
    if (typeof value === 'object' && value !== null && key in result) {
      result[key] = merge(
        result[key] as Indexed<unknown>,
        value as Indexed<unknown>,
      );
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any,
  );
  return merge(object as Indexed, result);
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

export function queryString(data: PlainObject) {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data)
    .map((arr) => arr.join('='))
    .join('&');
}
