FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

ENV MONGO_URL mongodb+srv://subigya:Gaurav15@expensetracker.kmdq5.mongodb.net/?retryWrites=true&w=majority&appName=ExpenseTracker

ENV ACCESS_TOKEN_SECRET secret

CMD [ "node", "server.js" ]