# stage 1
FROM node:14.15.1 as node
WORKDIR /app
COPY . .
RUN npm install
RUN node node_modules/@angular/cli/bin/ng build --prod

# stage 2
FROM nginx:1.16.1-alpine
COPY --from=node /app/dist/frontend-app /usr/share/nginx/html
EXPOSE 80