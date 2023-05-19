import { queryStringify } from './helpers';

export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete',
}

type Options = {
  headers?: Record<string, string>;
  method: Method;
  data?: any;
  timeout?: number;
};

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(path = '/'): Promise<Response> {
    return this.#request<Response>(this.endpoint + path);
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.#request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    });
  }

  public put<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.#request<Response>(this.endpoint + path, {
      method: Method.Put,
      data,
    });
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.#request<Response>(this.endpoint + path, {
      method: Method.Patch,
      data,
    });
  }

  public delete<Response>(path: string, data?: unknown): Promise<Response> {
    return this.#request<Response>(this.endpoint + path, {
      method: Method.Delete,
      data,
    });
  }

  #request<Response>(
    url: string,
    options: Options = { method: Method.Get },
    timeout = 5000,
  ): Promise<Response> {
    const { headers = { 'Content-Type': 'application/json' }, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === Method.Get;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
