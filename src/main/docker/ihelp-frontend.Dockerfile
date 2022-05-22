FROM node:16.15.0 as node

#EXPOSE 8080
# EXPOSE 3000
# EXPOSE 4200

WORKDIR /workspace/app

COPY . .

#RUN npm run clean
RUN npm install

CMD npm start