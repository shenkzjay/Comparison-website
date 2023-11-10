# FROM ghcr.io/puppeteer/puppeteer:21.5.0

# ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/google-chrome-stable" \
#     PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
 
# WORKDIR /app

# COPY ./package*.json ./

# RUN npm ci

# COPY . .

# RUN npm run build

# CMD ["npm", "start"]




FROM node:18-alpine

ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true" \
    CHROMIUM_VERSION="117.0.5938.62"


RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium=${CHROMIUM_VERSION}


WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

CMD ["npm", "start"]