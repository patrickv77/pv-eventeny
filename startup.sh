#!/bin/bash

npx sequelize db:migrate
# comment out seed command for production
npx sequelize db:seed:all
npm start