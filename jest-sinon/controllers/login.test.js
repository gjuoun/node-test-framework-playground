const {login} = require('./login')

/* ------------------- prepare request and response object ------------------ */

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res)
  return res
}

/* ------------------------------ start testing ----------------------------- */

describe('login', () => {
  test('should 400 if username is missing from body', async () => {
    const req = mockRequest(
      {},
      { password: 'boss' }
    );
    const res = mockResponse();
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'username and password are required'
    });
  });
  test('should 400 if password is missing from body', async () => {
    const req = mockRequest(
      {},
      { username: 'hugo' }
    );
    const res = mockResponse();
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'username and password are required'
    });
  });
  test('should 401 with message if user with passed username does not exist', async () => {
    const req = mockRequest(
      {},
      {
        username: 'nonexist',
        password: '12345'
      }
    );
    const res = mockResponse();
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'No user with matching username'
    });
  });
  test('should 401 with message if passed password does not match stored password', async () => {
    const req = mockRequest(
      {},
      {
        username: 'wrong',
        password: '12345'
      }
    );
    const res = mockResponse();
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Wrong password'
    });
  });
  test('should 201 and set session.data with username if user exists and right password provided', async () => {
    const req = mockRequest(
      {},
      {
        username: 'correct',
        password: '12345'
      }
    );
    const res = mockResponse();
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
    expect(req.session.data).toEqual({
      username: 'correct',
    });
  });
});