const express = require('express');
const app = express();
const session = require('client-sessions');

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'my-super-secret',
  cookieName: 'session',
  duration: 60 * 60 * 1000 // 1 hour
}));

const { logout, checkAuth } = require('./controllers/express-handlers.js');
const { login } = require('./controllers/login')

app.get('/session', checkAuth);
app.delete('/session', logout);
app.post('/session', login)


