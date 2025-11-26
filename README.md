# NQBA Quantum Ecosystem

FLYFOX AI Quantum Ecosystem – QHC + QDH + Dynex + SigmaEQ v4

A production-ready Next.js 15 application featuring quantum computing, AI integration, and Web3 capabilities.

## Tech Stack

- **Next.js 15** with App Router and Turbopack
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **shadcn/ui** components
- **wagmi** and **thirdweb** for Web3
- **Vercel** deployment ready

## Features

### Pages
- **Home** - Hero section with quantum particles animation
- **Solutions** - Service grid with ROI calculator
- **Resources** - Documentation and tutorials
- **About** - Company information and team
- **Explore** - AI Agent marketplace
- **Platform** - Technology stack diagram

### Integrations
- **OpenAI** - GPT models and embeddings
- **Deepgram** - Speech-to-text processing
- **Dynex** - Neuromorphic computing
- **Web3** - Blockchain and DeFi support
- **Knowledge Base** - Vector search and semantic analysis

## Getting Started

### Installation

```bash
npm install
```

### Configuration

Copy the environment template:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API keys:

```env
OPENAI_API_KEY=your_key_here
DEEPGRAM_API_KEY=your_key_here
DYNEX_API_KEY=your_key_here
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
```

### Development

Run the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

## Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── page.tsx       # Home page
│   ├── solutions/     # Solutions page
│   ├── resources/     # Resources page
│   ├── about/         # About page
│   ├── explore/       # Agent marketplace
│   ├── platform/      # Platform architecture
│   └── layout.tsx     # Root layout
├── components/        # React components
│   └── QuantumParticles.tsx
└── lib/              # Library integrations
    ├── dynex/        # Dynex integration
    ├── openai/       # OpenAI integration
    ├── deepgram/     # Deepgram integration
    ├── web3/         # Web3 utilities
    └── kb/           # Knowledge base
```

## Deployment

This application is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/GoliathBritton/nqba-quantum-ecosystem)

### Environment Variables

Make sure to configure the following environment variables in your Vercel project:

- `OPENAI_API_KEY`
- `DEEPGRAM_API_KEY`
- `DYNEX_API_KEY`
- `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`

## Design System

- **Color Scheme**: Black text on white background
- **Typography**: Inter font family
- **Layout**: Responsive with Tailwind CSS
- **Animation**: Framer Motion for smooth transitions
- **Components**: shadcn/ui compatible

## License

See [LICENSE](LICENSE) file for details.
