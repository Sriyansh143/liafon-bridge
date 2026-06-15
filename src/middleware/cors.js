import config from '../config/index.js';

const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  
  if (config.allowedOrigins.includes('*') || config.allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
};

export default corsMiddleware;
