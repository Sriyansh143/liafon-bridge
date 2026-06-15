import express from 'express';
import config from '../config/index.js';

const router = express.Router();

// Proxy requests to voice service
router.all('/*', async (req, res) => {
  try {
    const targetUrl = `${config.subdomains.voice}${req.path}`;
    
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'],
        'Authorization': req.headers['authorization']
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined
    });
    
    const data = await response.json().catch(() => null);
    res.status(response.status).json(data || { message: 'Voice service response' });
  } catch (error) {
    res.status(503).json({ error: 'Voice service unavailable', details: error.message });
  }
});

export default router;
