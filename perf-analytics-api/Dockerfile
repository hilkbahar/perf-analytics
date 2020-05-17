FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV HOST=0.0.0.0
ENV PORT=3002
ENV DB_HOST=mongo
CMD npm run start
