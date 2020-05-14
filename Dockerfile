FROM node:latest

LABEL Author stevesaju

ENV NODE_ENV=development 
ENV PORT=3001

COPY      . /var/www
WORKDIR   /var/www

RUN yarn install

EXPOSE $PORT

ENTRYPOINT ["yarn", "start"]