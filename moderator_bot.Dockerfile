FROM node:16.15.0 as node

WORKDIR /workspace/app

COPY moderator_bot .

RUN npm install

CMD npm start
