# FROM ghcr.io/puppeteer/puppeteer:21.5.0

# ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/google-chrome-stable" \
#     PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
 
# WORKDIR /app

# COPY ./package*.json ./

# RUN npm ci

# COPY . .

# RUN npm run build

# CMD ["npm", "start"]




FROM browserless/chrome:latest

ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"


# RUN set -x \
#     && apk update \
#     && apk upgrade \
#     && apk add --no-cache \
#     udev \
#     ttf-freefont \



WORKDIR /app

COPY ./package*.json ./

RUN chown -R node:node /app

RUN npm install

COPY ./ ./

RUN npm run build

CMD ["npm", "start"]