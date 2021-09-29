FROM mhart/alpine-node:14.15.0

WORKDIR /backend

COPY ./backend ./

RUN npm install --no-fund --silent
RUN npm run build

CMD ["npm", "start"]
