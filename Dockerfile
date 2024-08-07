FROM node

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN chmod +x startup.sh

ENTRYPOINT [ "./startup.sh" ]