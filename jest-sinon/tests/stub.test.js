const sinon = require('sinon');


test('jest.fn recalls what is has been called with', function () {
  const mock = jest.fn();

  mock('a', 'b', 'c');
  expect(mock).toHaveBeenCalledTimes(1)
  expect(mock).toHaveBeenCalledWith('a', 'b', 'c');
})

