const config = {
  port: process.env.PORT || 3000,
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['*'],
  subdomains: {
    cloud: process.env.CLOUD_URL || 'http://localhost:3001',
    voice: process.env.VOICE_URL || 'http://localhost:3002',
    ocr: process.env.OCR_URL || 'http://localhost:3003',
    aiChat: process.env.AI_CHAT_URL || 'http://localhost:3004'
  }
};

export default config;
