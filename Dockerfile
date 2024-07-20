FROM node

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN <<EOF
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
EOF

CMD ["npm", "start"]