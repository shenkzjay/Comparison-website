# FROM ghcr.io/puppeteer/puppeteer:21.5.0

# ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/google-chrome-stable" \
#     PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
 
# WORKDIR /app

# COPY ./package*.json ./

# RUN npm ci

# COPY . .

# RUN npm run build

# CMD ["npm", "start"]




FROM node:14-alpine3.14

ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"


RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium


RUN npm init -y && \
npm i puppeteer && \
addgroup -S pptruser && adduser -S -G pptruser -u 1001 pptruser \
&& mkdir -p /home/pptruser/Downloads \
&& chown -R pptruser:pptruser /home/pptruser


WORKDIR /app

# Switch to the non-privileged user
USER pptruser

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

CMD ["npm", "start"]