# Serverless AWS Lambda AI client

This project deploys the functions that call AI to generate image and speech to AWS Lambda. As AI calls can take more than 10 seconds, they won't run on Vercel Hobby tier. So we run them on AWS Lambda to reduce costs.

## Usage

Copy `env.template.json` to `env.json` and fill in your environment variables.

### Install

```
$ npm i -g serverless
```

### Test local invocation

```bash
npm run testImageLocal
npm run testSpeechLocal
```

### Deployment to AWS

```
$ npm run deploy
```

### Test invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
npm run testImage
npm run testSpeech
```

Which should result in response similar to the following:

```json
{
  "statusCode": 200,
  "body": "{\"url\": \"...\"}"
}
```
