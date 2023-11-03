# FROM ghcr.io/puppeteer/puppeteer:21.4.0

# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser\
#     PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
 
# WORKDIR /app

# COPY ./package*.json ./

# RUN npm ci

# COPY . .

# RUN npm run build

# CMD ["npm", "start"]




FROM node:18-alpine

ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"


RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium


WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

CMD ["npm", "start"]