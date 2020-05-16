FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm run build
CMD npm run serve -- -p 3000
