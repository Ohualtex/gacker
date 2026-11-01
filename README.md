# Gacker

A repository for the GakCoding event.

**Second place at GakCoding — November 1, 2026.**

Built by the Gacker team for the GakCoding event held in Elazığ on November 1, 2026. The event theme was **Elazığ almond candy**.

## About

A bilingual Turkish and English web experience exploring almond candy, local producers, and the cultural heritage of Elazığ.

- Interactive storytelling, a local producer directory, and an Elazığ discovery map.
- Gakkocan mascot and AI assistant, plus an almond-candy personality quiz.
- Turkish and English content, a visual gallery, regional music, and theme support.
- An admin panel for content and submissions.

> **Project status:** An event prototype, archived as a record of the Gacker team's GakCoding entry. It is not actively maintained.

Some visuals are AI-generated, and some producer images are illustrative. See the application's **AI & Attribution** page for details.

## Running locally

Requires Node.js and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Turkish: [localhost:3000/tr](http://localhost:3000/tr) · English: [localhost:3000/en](http://localhost:3000/en)

`npm ci` also generates the Prisma client automatically. Use `.env.example` as a reference for configuration:

- `DATABASE_URL`: PostgreSQL connection string. Required for the admin panel and database writes. Public content queries fall back to the repository's static data when the database is unavailable.
- `ADMIN_USER`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`: admin login and session settings.
- `LLM_API_KEY`: API key for the chat assistant. Without it, the assistant reports that it has not been configured.
- `LLM_BASE_URL`, `LLM_MODEL`: optional OpenAI-compatible service endpoint and model selection.

Do not commit real API keys or passwords.

## Database and admin panel

The project uses PostgreSQL through Prisma; the event version includes a Neon integration. After configuring `DATABASE_URL` for your own development database, prepare the schema and seed data:

```sh
npm run db:push
npm run db:seed
```

These commands modify the database. For Prisma CLI and seed commands, provide environment variables through your shell or a root `.env` file that Prisma can load. Next.js loading `.env.local` does not apply to these commands.

Admin panel: [localhost:3000/admin](http://localhost:3000/admin)

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Motion, Three.js / React Three Fiber, and Prisma.

```sh
npm run lint   # Check code
npm run build  # Create a production build
npm run start  # Run the production build
```

## Project structure

- `src/app/`: pages, API routes, and the admin panel.
- `src/components/`: UI, quiz, map, and mascot components.
- `src/content/`, `src/data/`, `src/dictionaries/`: content, static data, and translations.
- `prisma/`: database schema and seed data.
- `public/`: images, audio, and map assets. See `public/audio/ATTRIBUTION.md` for audio credits.

---

GakCoding · Gacker team · November 1, 2026
