import { expect } from 'chai';
import { useFakeXMLHttpRequest, SinonFakeXMLHttpRequest } from 'sinon';
import { HTTPTransport, Method } from './HTTPTransport';

describe('HTTPTransport class', () => {
  const originalXHR = global.XMLHttpRequest;
  const requests: SinonFakeXMLHttpRequest[] = [];
  const XHR = useFakeXMLHttpRequest();
  const instance = new HTTPTransport('/');

  before(() => {
    // @ts-ignore
    global.XMLHttpRequest = XHR;
  });

  XHR.onCreate = (req: SinonFakeXMLHttpRequest) => {
    requests.push(req);
  };

  afterEach(() => {
    requests.length = 0;
  });

  after(() => {
    global.XMLHttpRequest = originalXHR;
  });

  it('Method.get() should send GET request', () => {
    instance.get('/');
    const [request] = requests;
    expect(request.method).to.eq(Method.Get);
  });

  it('Method.post() should send POST request', () => {
    instance.post('/');
    const [request] = requests;
    expect(request.method).to.eq(Method.Post);
  });
});
