import express from 'express';
import corsMiddleware from './middleware/cors.js';
import config from './config/index.js';
import apiRoutes from './routes/api.js';
import cloudRoutes from './routes/cloud.js';
import voiceRoutes from './routes/voice.js';
import ocrRoutes from './routes/ocr.js';
import aiChatRoutes from './routes/aiChat.js';

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (lightweight)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes - specific routes first, then catch-all
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'liafon-bridge',
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.json({
    name: 'Liafon Bridge API',
    version: '1.0.0',
    description: 'Lightweight bridge server for Liafon smartwatch companion app',
    endpoints: {
      health: '/health',
      api: '/api',
      cloud: '/api/cloud/*',
      voice: '/api/voice/*',
      ocr: '/api/ocr/*',
      aiChat: '/api/ai-chat/*'
    },
    subdomains: {
      cloud: config.subdomains.cloud,
      voice: config.subdomains.voice,
      ocr: config.subdomains.ocr,
      aiChat: config.subdomains.aiChat
    }
  });
});

app.use('/api/cloud', cloudRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/ocr', ocrRoutes);
app.use('/api/ai-chat', aiChatRoutes);

// Serve static files from public directory
app.use(express.static('public'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Liafon Bridge',
    description: 'Lightweight bridge server for Liafon smartwatch companion app',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      cloud: '/api/cloud/*',
      voice: '/api/voice/*',
      ocr: '/api/ocr/*',
      aiChat: '/api/ai-chat/*'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(config.port, () => {
  console.log(`Liafon Bridge server running on port ${config.port}`);
  console.log(`Subdomain services configured:`);
  console.log(`  - Cloud: ${config.subdomains.cloud}`);
  console.log(`  - Voice: ${config.subdomains.voice}`);
  console.log(`  - OCR: ${config.subdomains.ocr}`);
  console.log(`  - AI Chat: ${config.subdomains.aiChat}`);
});

export default app;
