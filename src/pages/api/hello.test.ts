declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: (value: unknown) => { toBe(expected: unknown): void; toEqual(expected: unknown): void };
import handler from './hello';

function createResponse() {
  return {
    statusCode: 0,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(body: unknown) {
      this.body = body;
      return this;
    },
  };
}

describe('GET /api/hello', () => {
  it('returns a successful JSON response', () => {
    const response = createResponse();
    handler({ method: 'GET' } as never, response as never);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: 'Sahid Rahutomo', age: 27 });
  });
});
