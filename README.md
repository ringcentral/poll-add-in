
# Poll add-in for RingCentral App [experimental]

A POC of Poll add-in using adaptive card and interactive messages of RingCentral app.

Check video here: [https://youtu.be/JyTazPdwSSc](https://youtu.be/JyTazPdwSSc)

## DEV Prerequisites

- Download and install RingCentral app and login: https://www.ringcentral.com/apps/rc-app
- Nodejs 8.10+/npm, recommend using [nvm](https://github.com/creationix/nvm) to install nodejs/npm.
- A RingCentral developer account: you need [sign up](https://developers.ringcentral.com/) and apply for the permission to create RingCentral add-in.

## Quick start

Let's start it.

```bash

# install dependecies
npm i

# start proxy server, this will make your local bot server can be accessed by RingCentral service
npm run ngrok

# will show
Forwarding                    https://xxxx.ap.ngrok.io -> localhost:6066
# Remember the https://xxxx.ap.ngrok.io, we will use it later
```

then start the test server

```bash
# create env file
cp .env.sample .env
# then edit .env,
# set https://xxxx.ap.ngrok.io as RINGCENTRAL_APP_SERVER
# set glip webhook url copied as STATIC_WEBHOOK

# run local dev server
npm start

# run client
npm run c

# then visit https://xxxx.ap.ngrok.io
```

Now login to [https://developers.ringcentral.com](https://developers.ringcentral.com), and create an `add-in` type private app, enable `Interactive Messages`, and set `Outbound Webhook URL` to `https://xxxx.ap.ngrok.io/rc/action`, also enable `This app can be installed via the web`, set install url as `https://xxxx.ap.ngrok.io`

Goto Glip app's App list, select your app, and choose a team, input some choices and submit, you will see the card in your select team, then team members can vote.

## Deploy to AWS Lambda

```bash
cp deploy/env.sample.yml deploy/env.yml
cp deploy/serverless.sample.yml deploy/serverless.yml

# then edit deploy/env.yml and deploy/serverless.yml

# deploy
npm run deploy
```

More detail: https://github.com/ringcentral/glip-integration-js/blob/master/docs/deploy-to-lambda.md
