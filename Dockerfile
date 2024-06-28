
# FROM node:20-bookworm

FROM mcr.microsoft.com/playwright:v1.44.1-jammy

# ENV PLAYWRIGHT_EXECUTABLE_PATH="/usr/bin/chromium-browser" \
#     PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /app

COPY  ./package*.json ./

RUN npm install

RUN npx -y playwright@1.44.1 install

COPY . .

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000