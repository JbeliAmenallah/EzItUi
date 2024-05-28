FROM node:latest as build 

WORKDIR /user/local/app

COPY ./ /user/local/app/

RUN npm install || true

RUN npm run build || true





FROM nginx:latest 
COPY  --from=build /dist/ui /usr/share/nginx/html

EXPOSE 80