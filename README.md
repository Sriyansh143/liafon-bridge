# Liafon Bridge

Lightweight bridge server for the Liafon smartwatch companion app ecosystem.

## Overview

Liafon Bridge acts as the central gateway for your smartwatch companion app, providing unified access to:

- **Cloud Services** (`/api/cloud/*`) - liafon-cloud integration
- **Voice Services** (`/api/voice/*`) - liafon-voice integration  
- **OCR Services** (`/api/ocr/*`) - liafon-ocr integration
- **AI Chat Services** (`/api/ai-chat/*`) - liafon-ai-chat integration

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## Configuration

Configure via environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | `*` |
| `CLOUD_URL` | Cloud service URL | `http://localhost:3001` |
| `VOICE_URL` | Voice service URL | `http://localhost:3002` |
| `OCR_URL` | OCR service URL | `http://localhost:3003` |
| `AI_CHAT_URL` | AI Chat service URL | `http://localhost:3004` |

Example `.env`:

```env
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
CLOUD_URL=https://cloud.liafon.com
VOICE_URL=https://voice.liafon.com
OCR_URL=https://ocr.liafon.com
AI_CHAT_URL=https://ai.liafon.com
```

## API Endpoints

### Root
- `GET /` - Welcome page with endpoint info
- `GET /health` - Health check
- `GET /api` - API documentation

### Service Proxies
- `/api/cloud/*` - Proxies to cloud service
- `/api/voice/*` - Proxies to voice service
- `/api/ocr/*` - Proxies to OCR service
- `/api/ai-chat/*` - Proxies to AI chat service

## Architecture

```
┌─────────────┐
│ Smartwatch  │
│   App       │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Liafon Bridge  │◄── Main Entry Point (Port 3000)
│   (This Repo)   │
└────────┬────────┘
         │
    ┌────┴────┬──────────┬──────────┐
    ▼         ▼          ▼          ▼
┌───────┐ ┌───────┐ ┌───────┐ ┌─────────┐
│ Cloud │ │ Voice │ │  OCR  │ │ AI Chat │
│Service│ │Service│ │Service│ │ Service │
└───────┘ └───────┘ └───────┘ └─────────┘
```

## Related Repositories

- [liafon-cloud](https://github.com/Sriyansh143/liafon-cloud)
- [liafon-voice](https://github.com/Sriyansh143/liafon-voice)
- [liafon-ocr](https://github.com/Sriyansh143/liafon-ocr)
- [liafon-ai-chat](https://github.com/Sriyansh143/liafon-ai-chat)

## License

MIT