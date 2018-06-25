module.exports = (err, req, res, _next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('MIDDLEWARE ERROR ---> ', err);
  }

  if (err.name && err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired. Please log in again' });
  }

  return res.status(500).json({ error: 'Unexpected error. Please, try again later' });
};
