const assert = require('assert');
const parseQueryString = require('../src/parse-query-string');

describe('parseQueryString', () => {
  it('parses a string', () => {
    const res = parseQueryString('name=John%20Doe&age=20');
    assert.deepStrictEqual(res, { name: 'John Doe', age: '20' });
  });
});
