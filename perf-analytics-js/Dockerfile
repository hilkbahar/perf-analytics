FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm run build
CMD npm run serve
EXPOSE 3001
