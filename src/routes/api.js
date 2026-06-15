import express from 'express';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'liafon-bridge',
    timestamp: new Date().toISOString()
  });
});

// API info endpoint
router.get('/api', (req, res) => {
  res.json({
    name: 'Liafon Bridge API',
    version: '1.0.0',
    description: 'Lightweight bridge server for Liafon smartwatch companion app',
    endpoints: {
      cloud: '/api/cloud/* - Access cloud services',
      voice: '/api/voice/* - Access voice services',
      ocr: '/api/ocr/* - Access OCR services',
      aiChat: '/api/ai-chat/* - Access AI chat services'
    },
    subdomains: {
      cloud: process.env.CLOUD_URL || 'http://localhost:3001',
      voice: process.env.VOICE_URL || 'http://localhost:3002',
      ocr: process.env.OCR_URL || 'http://localhost:3003',
      aiChat: process.env.AI_CHAT_URL || 'http://localhost:3004'
    }
  });
});

export default router;
