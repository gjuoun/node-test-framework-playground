const express = require('express');
const app = express();
const session = require('client-sessions');

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'my-super-secret',
  cookieName: 'session',
  duration: 60 * 60 * 1000 // 1 hour
}));

const { logout, checkAuth } = require('./middleware.js');

app.get('/session', checkAuth);
app.delete('/session', logout);



/* ------------------------------ Test section ------------------------------ */
const mockRequest = (sessionData) => {
  return {
    session: { data: sessionData },
  };
};

const mockResponse = () => {
  const res = {};
  // make res.status().json() function chain 
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};



