FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

# Use ARG instructions to accept build-time variables
ARG MONGO_URL
ARG ACCESS_TOKEN_SECRET

# Set environment variables using the ARG values
ENV MONGO_URL=$MONGO_URL
ENV ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET

CMD [ "node", "server.js" ]
