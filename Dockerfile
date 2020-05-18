#Build:  docker build -f Dockerfile -t order_app_image .

#Container run:   docker run -d -p 3000:3000 -v $(pwd):/var/www order_app_image 


FROM node:latest

ENV NODE_ENV=development 
ENV username=postgres
ENV password=docker
ENV PORT=3000
ENV secret=1234


COPY      . /var/www
WORKDIR   /var/www

RUN       yarn install

EXPOSE $PORT

ENTRYPOINT ["yarn", "start"]