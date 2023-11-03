FROM ghcr.io/puppeteer/puppeteer:21.4.0

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser\
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
 
WORKDIR /app

COPY ./package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]