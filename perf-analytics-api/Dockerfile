FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV PORT=3002
CMD npm run start
