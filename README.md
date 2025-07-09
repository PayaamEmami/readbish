# 📖 Readbish

**Readbish** is a voice-powered reading assistant that transforms written content into lifelike spoken audio. It supports longform documents such as PDFs, making it easy to listen and interact with complex material across desktop and mobile devices.

---

## 🚀 Core Features (MVP)

- 🎧 **Text-to-Speech (TTS)**
  Convert written content into natural-sounding audio using OpenAI’s TTS API.

- 🗣️ **Interactive Voice Assistant (LLM Integration)**
  Interrupt playback with a wake phrase to ask contextual questions, request definitions, or clarify concepts — then seamlessly return to the original reading.

- 🔦 **Text Highlighting**
  Real-time highlighting of text as it is read aloud to support focus and accessibility.

- 🗃️ **Document Import**
  Open and extract readable text from supported documents with accurate parsing and formatting cleanup.

- 🎛️ **Voice Selection**
  Choose from multiple AI-generated voices for a personalized listening experience.

- 💾 **Auto-Save & Resume**
  Save your place automatically and continue listening where you left off across sessions.

- 🎵 **Background Audio Support**
  Listen with the screen off or while multitasking on supported platforms.

- ☁️ **Cross-Device Sync**
  Sync playback progress and preferences across multiple devices using a cloud backend.

---

## 🛠 Tech Stack

| Layer              | Technology                  | Purpose                                                      |
| ------------------ | --------------------------- | ------------------------------------------------------------ |
| **Frontend**       | React (Next.js)             | Web interface for listening, uploading, and interacting      |
| **Mobile**         | React Native                | Native app for iOS and Android                               |
| **Styling**        | Tailwind CSS                | Utility-first styling for fast and responsive design         |
| **Backend**        | Node.js + TypeScript + tRPC | Type-safe API server shared across frontend and mobile       |
| **Database**       | PostgreSQL                  | Relational data storage for users, documents, progress, etc. |
| **Auth**           | Custom JWT-based auth       | User authentication and session handling                     |
| **File Storage**   | AWS S3                      | Secure storage for uploaded documents and audio              |
| **AI Services**    | OpenAI TTS & APIs           | For text-to-speech and interactive assistant features        |
| **Infrastructure** | AWS + Pulumi                | Self-managed cloud infrastructure using TypeScript-based IaC |
| **Languages**      | TypeScript (everywhere)     | Full-stack type safety and consistency                       |

---

## 📁 Folder Structure

This project uses a modular monorepo structure organized by domain and platform. It separates the mobile and web clients, backend API, shared packages, infrastructure code, and supporting utilities.

Below is a high-level overview of the project layout:

```python
readbish/
├── apps/                         # Entry points for client apps
│   └── mobile/                   # React Native app
│   ├── web/                      # Next.js app (web interface)
│
├── backend/                      # Backend API server
│   ├── src/
│   │   ├── auth/                 # JWT auth logic
│   │   ├── db/                   # Database setup and queries
│   │   ├── llm/                  # OpenAI GPT integration
│   │   ├── routes/               # tRPC routers
│   │   ├── services/             # Business logic (e.g., TTS, doc parsing)
│   │   ├── storage/              # AWS S3 integrations
│   │   ├── utils/                # Shared helpers
│   │   └── index.ts              # Entry point for tRPC server
│   ├── package.json
│   └── tsconfig.json
│
├── packages/                     # Shared code across apps
│   ├── hooks/                    # Shared React hooks
│   ├── types/                    # Global TypeScript types
│   ├── ui/                       # Shared UI components (if using across web/mobile)
│   └── utils/                    # Shared utilities
│
├── infra/                        # Infrastructure as Code (Pulumi)
│   ├── aws/                      # AWS-specific setup
│   │   ├── index.ts              # Entry point for Pulumi stack
│   │   └── s3.ts / rds.ts etc.   # Resources like S3 buckets, RDS instances
│   └── Pulumi.yaml
│
├── scripts/                      # CLI scripts or dev tooling
│   └── generate-audio.ts         # Audio preprocessing, file ops, etc.
│
├── .env                          # Local environment variables
├── package.json                  # Root workspace config
├── tsconfig.json                 # Root TS config
├── README.md
└── LICENSE
```

---

## 🛠️ Development Setup

### Web (Next.js)

1. Navigate to the web app:
   ```bash
   cd apps/web
   npm install
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Mobile (React Native with Expo)

1. Navigate to the mobile app:
   ```bash
   cd apps/mobile
   npm install
   npx expo start
   ```
2. Scan the QR code with the Expo Go app on your phone.

---

## 📘 License

Copyright (c) 2025 Payaam Emami

This code is provided for reference purposes only.

All rights are reserved. You may not use, copy, modify, distribute, or reproduce any part of this code without explicit written permission from the author.

For licensing inquiries or commercial interest, please contact [contact@payaame.com](mailto:contact@payaame.com).

---
