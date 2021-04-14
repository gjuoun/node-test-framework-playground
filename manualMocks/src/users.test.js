// users.test.js
const axios = require('axios');
const Users = require('./users');

jest.mock('axios');

test('should fetch users', () => {
  const users = [{ name: 'Bob' }];
  const resp = { data: users };
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});

test('should return true', () => {
  const myMockFn = jest.fn(cb => cb(null, true))
    .mockImplementationOnce(cb => cb(null, true))
    .mockImplementationOnce(cb => cb(null, false))

  myMockFn((err, val) => console.log(val));
  myMockFn((err, val) => console.log(val));
  myMockFn((err, val) => console.log(val));
  myMockFn((err, val) => console.log(val));
  // > true
})

test('should return this', () => {
  const myObj = {
    myMethod: jest.fn().mockReturnThis(),
  };

  // is the same as
  const otherObj = {
    myMethod: jest.fn(function () {
      return this;
    }),
  };

  console.log(otherObj.myMethod());
})

test("should display name", () => {
  const myMockFn = jest
    .fn()
    .mockReturnValue('default')
    .mockImplementation(scalar => 42 + scalar)
    .mockName('add42');

  const value = myMockFn(123)

  console.log(value);
})