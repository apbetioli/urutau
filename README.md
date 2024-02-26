# Urutau

My son loves listening to bedtime stories. We have a player with some recorded stories, but he always asks for one story from my imagination. I'm not so creative in imagining stories, so that was the sparkle of this project.

This is a bedtime stories generator that uses AI for:

- generating the story with llms
- generating the audio with TTS
- generating the cover image

All stories, audio and images are kept in a database so that I can read and play it again, again, and again...

It is designed to support stories generated in many languages.

Why Urutau? The first name that came to my mind is a bird from South America that sings at night.

## Screenshots

![image](https://github.com/apbetioli/urutau/assets/2829329/708de9ed-50bb-43ca-b0f1-21ce35b57e7a)

![image](https://github.com/apbetioli/urutau/assets/2829329/fd425dc0-8bcb-4a9c-995c-05055ac698d7)

![image](https://github.com/apbetioli/urutau/assets/2829329/471e5f0d-a184-4cea-8309-e19d962cf4bd)


## Technologies

This project was built with:

- Next.js - pure magic
- Typescript - let's make it harder
- TailwindCSS - a bit of color
- Prisma - no SQL
- Clerk - identify yourself
- Langchain - talk to the AI

Currently, it supports only OpenAI. More to come...

## Getting Started

```bash
npm install
npx prisma generate
npm run dev
```

Follow the instructions on the terminal.
