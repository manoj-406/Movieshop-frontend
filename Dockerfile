FROM node:18 AS builder
LABEL Author="Manoj"
WORKDIR /tmp/movieshop
COPY . .
RUN apt update && apt install nginx -y
RUN apt install npm -y
RUN npm install

FROM node:18-alpine
COPY --from=builder /tmp/movieshop /movieshop
WORKDIR /movieshop
EXPOSE 3000
CMD ["npm", "run", "dev"]