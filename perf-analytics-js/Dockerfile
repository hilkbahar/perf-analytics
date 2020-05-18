FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV HOST=0.0.0.0
ENV PORT=3001
CMD npm run build
CMD npm run serve
EXPOSE 3001
