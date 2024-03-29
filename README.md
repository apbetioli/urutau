# Urutau

My son loves listening to bedtime stories. We have a player with some recorded stories, but he always asks for one story from my imagination. So, I built this to help me.

This is a bedtime stories generator that uses AI for:

- generating the story with gpt-3.5-turbo
- generating the audio with tts-1
- generating the cover image with dall-e-3

All stories, audio, and images are kept in a database so that I can read and play them again and again (and again...).

It is designed to support stories generated in many languages.

Why Urutau? The first name that came to my mind is a bird from South America that sings at night.

## Screenshots

![image](https://github.com/apbetioli/urutau/assets/2829329/6d3028be-7de4-4096-af6f-c954c6968b67)

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
- AWS Lambda - talk more to the AI
- AWS S3 - save your creations

Currently, it supports only OpenAI. More to come...

## Deploy

First step is deploying the serverless functions to AWS Lambda. The generation of images and audio can take more than 10 seconds, which is Vercel's hobby plan timeout, so we use AWS to reduce costs.

The serverless project is on a subfolder called `serverless`. Follow its [README](serverless/README.md) for deploying.

Next you can deploy this project to Vercel.

## Getting Started

### Configure environment variables

Copy `.env.template` to `.env.local` and fill in the variables.

### Run

```bash
npm install
npm run dev
```
