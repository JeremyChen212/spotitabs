# Spotitabs 🎸

A guitar-learning tool that turns songs you already listen to into an interactive practice experience.

Spotitabs connects a user's Spotify library with chords, tabs, lyrics, key, BPM, and playback in one interface, reducing the need to jump between different music and learning tools while practicing.

Built from initial user research and Figma prototypes through frontend implementation, API integration, and performance optimization.

---

## Preview

<!-- Replace this with your best product screenshot or GIF -->

![Spotitabs Preview](./public/spotitabs-preview.png)

---

## Why I Built It

Learning a song on guitar often means switching constantly between Spotify, chord websites, tabs, lyrics, and other tools.

That creates a fragmented practice experience:

- Spotify handles playback
- another site provides chords
- another provides tabs
- lyrics may live somewhere else
- key and BPM require another search

I wanted to explore a simpler question:

> **What if the song itself became the learning interface?**

I spoke with guitar learners across different skill levels and found similar friction around switching between tools, finding the right song information, and keeping learning content connected to playback.

Spotitabs brings that workflow into one focused experience.

---

## Core Experience

Users can:

- Connect their Spotify library
- Browse songs they already listen to
- Play music without leaving the learning interface
- View chords, tabs, and lyrics alongside playback
- See song information including key and BPM
- Move between songs while maintaining a consistent practice workflow
- Revisit previously processed songs with faster load times

---

## Product Design

I designed Spotitabs from early workflow exploration through high-fidelity implementation.

The process included:

1. Interviewing guitar learners across different skill levels
2. Mapping the existing song-learning workflow
3. Identifying friction between playback and learning resources
4. Creating **4 interactive Figma prototypes**
5. Comparing navigation, hierarchy, and playback approaches
6. Testing prototypes with potential users
7. Refining the selected experience
8. Implementing the final direction in Next.js

### Design Challenge

One of the largest design problems was balancing **information density with focus**.

A guitarist might need:

- playback controls
- chords
- tabs
- lyrics
- key
- BPM
- song metadata

Showing everything with equal visual weight made early versions feel overwhelming.

I iterated toward a hierarchy centered around:

**Song → Playback → Learning Content → Secondary Information**

Playback remains easily accessible while the content needed for active practice stays visually dominant.

---

## Technical Architecture

Spotitabs is built around a Next.js frontend that combines data from multiple music services into a single song-level experience.

```text
                       ┌──────────────────┐
                       │     Spotify      │
                       │                  │
                       │ Library          │
                       │ Playlists        │
                       │ Track Metadata   │
                       └────────┬─────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │      Spotitabs      │
                     │                     │
                     │  Next.js + React    │
                     │     TypeScript      │
                     └─────────┬───────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │ Music Analysis  │        │ Application Data│
        │                 │        │                 │
        │ Moises AI       │        │ PostgreSQL      │
        │ Song Metadata   │        │ Redis Cache     │
        └────────┬────────┘        └────────┬────────┘
                 │                          │
                 └─────────────┬────────────┘
                               ▼
                 ┌──────────────────────────┐
                 │   Guitar Learning UI     │
                 │                          │
                 │ Chords · Tabs · Lyrics   │
                 │ Key · BPM · Playback     │
                 └──────────────────────────┘
```

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- HTML / CSS

### APIs & Integrations

- Spotify API
- Moises AI

### Data & Performance

- PostgreSQL
- Redis
- API caching
- Request deduplication

### Product & Design

- Figma
- Interactive prototyping
- User interviews
- Usability testing
- Responsive interface design

---

## Performance

A major technical challenge was keeping the interface responsive while depending on multiple external services.

A song may require several pieces of information before the complete learning experience can be displayed.

Early versions could repeat expensive requests when a user returned to a song they had already opened.

I introduced caching and request deduplication so previously processed song data could be reused rather than fetched and processed again.

This reduced repeat-song load time by approximately **1.8 seconds** in testing.

More importantly, the work changed how I thought about perceived performance.

Instead of treating speed as a single API-response metric, I considered:

- what information needs to appear immediately
- what can load progressively
- what should be cached
- what work should not be repeated
- what information should persist across interactions

---

## Key Product Tradeoffs

### Information Density vs. Focus

Spotitabs can expose a large amount of useful information about a song.

The challenge was deciding what should command attention while someone is actively playing guitar.

Rather than treating every data point as equally important, I prioritized playback and learning content while keeping secondary information accessible.

---

### Automation vs. Reliability

Spotitabs depends on external music services, which means song information is not always perfectly complete or consistent.

The interface therefore needs to account for:

- incomplete song information
- unavailable resources
- delayed external responses
- differences between songs

This pushed me to think about graceful loading, fallback, and empty states rather than designing only for the ideal response.

---

### Features vs. Practice Flow

It was easy to imagine adding more music-analysis features.

But each additional feature also increased interface complexity.

The primary product goal became:

> **Reduce the number of places a guitarist needs to look while learning a song.**

That became a more useful constraint than maximizing the number of features.

---

## What I Learned

Spotitabs gave me experience across the full product-development process:

```text
User Research
      ↓
Workflow Mapping
      ↓
Interaction Design
      ↓
Figma Prototyping
      ↓
Frontend Engineering
      ↓
API Integration
      ↓
Performance Optimization
      ↓
Iteration
```

The project also changed how I think about design engineering.

A polished interface is not determined only by visual design.

The experience is also shaped by:

- loading behavior
- latency
- data availability
- information hierarchy
- interaction feedback
- technical architecture
- edge cases

Design decisions and engineering decisions are often the same product decision viewed from different sides.

---

## Current Work

I'm continuing to refine Spotitabs with a focus on:

- smoother loading states
- interaction and motion polish
- responsive behavior
- improved song-data reliability
- playback interactions
- accessibility
- perceived performance

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/JeremyChen212/spotitabs.git
cd spotitabs
```

Install dependencies:

```bash
npm install
```

Create your local environment file:

```bash
cp .env.example .env.local
```

Add the required API credentials to `.env.local`.

Then start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

> The project requires credentials for its external music services. API keys and secrets are not included in the repository.

---

## Repository Structure

```text
spotitabs/
├── app/                 # Application routes and UI
├── components/          # Reusable interface components
├── lib/                 # API and application utilities
├── public/              # Static assets
├── styles/              # Global styling
└── README.md
```

> The exact structure may evolve as the project continues to be refined.

---

## About

Spotitabs began as an exploration of how interactive software could make learning music feel less fragmented.

It combines two things I enjoy working on:

**understanding how people learn** and **building interfaces that make complex workflows feel simpler.**

---

## Author

**Jeremy Chen**

Product Designer & Full-Stack Developer

[Portfolio](https://jeremychen.framer.website/) · [GitHub](https://github.com/JeremyChen212) · [LinkedIn](https://www.linkedin.com/in/jeremytchen/)
