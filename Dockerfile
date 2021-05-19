FROM node:14.17.0-alpine As builder

WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN npm install
COPY . .
RUN node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build

FROM nginx:1.15.8-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/dist/ExamCorrectionUI/ /usr/share/nginx/html
