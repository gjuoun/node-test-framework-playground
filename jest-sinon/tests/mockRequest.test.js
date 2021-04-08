const mockRequest = (sessionData) => {
  return {
    session: { data: sessionData },
  };
};

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res)
  return res
}

const checkAuth = async (req, res) => {
  if (!req.session.data) {
    return res.status(401).json()
  }

  const { username } = req.session.data
  return res.status(200).json({ username })
}


describe('checkAuth', () => {
  test("should 401 if session datsa is not set", async () => {
    const req = mockRequest(undefined)
    const res = mockResponse()
    await checkAuth(req, res);
    expect(res.status).toHaveBeenCalledWith(401)
  })

  test("should 200 with username if session datsa is set", async () => {
    const req = mockRequest({ username: "jun" })
    const res = mockResponse()
    await checkAuth(req, res);
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ username: "jun" })
  })
})


/* ------------------------------- test logout ------------------------------ */

async function logout(req, res) {
  req.session.data = null;
  return res.status(200).json();
}

describe('logout', () => {
  test('should set session.data to null', async () => {
    const req = mockRequest({ username: 'hugo' });
    const res = mockResponse();
    await logout(req, res);
    expect(req.session.data).toBeNull();
  });
  test('should 200', async () => {
    const req = mockRequest({ username: 'hugo' });
    const res = mockResponse();
    await logout(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});