FROM ghcr.io/puppeteer/puppeteer:21.4.0

ENV PUPPETEER_EXECUTABLE_PATH=usr/bin/google-chrome-stable \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
 
WORKDIR /usr/app

COPY ./package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]