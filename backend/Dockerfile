FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV FAST_REFRESH = false
ENV SKIP_PREFLIGHT_CHECK=true
ENV WATCHPACK_POLLING=true

EXPOSE 5555

CMD ["npm", "start"]