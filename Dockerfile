
FROM node:latest

ENV PORT=3000

COPY      . /var/www
WORKDIR   /var/www

RUN       yarn install

EXPOSE $PORT

ENTRYPOINT ["yarn", "start"]