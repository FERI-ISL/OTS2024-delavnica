FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@10.9.0 && npm install

# copy everything except the files in .dockerignore
COPY . .

EXPOSE 5555

CMD ["npm", "start"]
