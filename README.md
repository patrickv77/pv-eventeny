# Foodventeny

## Table of Contents
- [About](#about-foodventeny)
- [Installation](#installation)
- [Testing](#testing)
- [Foodventeny Design](#foodventeny-design)
  
## About Foodventeny
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![ejs](https://img.shields.io/badge/-ejs-b4ca65?style=for-the-badge) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?style=for-the-badge&logo=sequelize&labelColor=52B0E7&logoColor=FFF) ![passport](https://img.shields.io/badge/-passport.js-success?style=for-the-badge&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V%200%2FAAABp1BMVEUAAAACAgADBAABAwIAAgEBAgEDAwAfJAA8TAMUQyEHIhMlLACcuwLU%20gDQ%2FwpC6XUy3nsop1oJJhU0PgDV%2FgLf%2FwPZ%2FwDT%2FwtD7HYz4Hw5638133kNOB4BAQANDwDE6gLa%2FwLW%2FwLN9AGJqgYqmE0y13Y24no25Xwy0XEEEAkAAQFnegTk%2FwbW%2Fwa43AIaHwAHHQ8uwmo14Hw47oQZbT0BBAKfwADa%2FwA%20SgAGBwACBgMQQyM763Y76nUrq1W7zlvv%2F3Td82oaHQ0EGRQeyKYg1rMZq47Rzt3%2F%2F%2F%2F18%2F8dHR8CAgIABgcALj0Auv4Au%2F8Air4AAQLOz8zz8%208dHRwCAQEACAsBlMACu%2FACxPwBYn0AAwTPz8%2Fz8%2FMdHh4CBwkAYX4BptgBu%2FQBufABs%20kAFBohISIFExcBtesBvPUBwPkAPE4AAwMNDg8AAAIAsugBwfsBmccALz4AAgPQ0ND4%20Pifn5%20SkZCJj5AKT2QALDkBAADOzs75%20PgSBgIBAQHe3t739%2FcSFRYBAgJKSkpeXl5ZWVlaWlpcXFxUVFQGBgYDAwMEBARuLVNYAAAA2ElEQVQY033QPQ5BQRSG4W%20Ya66ZqDQaCqUdsAC9Rm0BOsIGRCNUVBahsQyJv4SGCo1CVAohnDkz%2FhpvcZLzZDI3cwV8grrhJyHslIHfeMauUHTyguj9jbGrEa4Tq2BLild7q4TpXUZ8WudWiAAHJGzbjbHBwOID5qj1PF%20YaQpTj%2FEcLZMzQgo3RrilmAWfLHk0tEKPy4zao2asuA9dPNob7B1KqWF19EEFkjAc1PrwmEIq3rQX9mpdvDAEFvMgaEtnDiWWNCRk9%20vXtdyzG%2FgXn%20zwrL%2FxCRqzKl7S9qnvAAAAAElFTkSuQmCC)

Foodventeny is a lightweight web application built to help you succeed in planning your next big event!

### :zap:Quick and Secure

Foodventeny leverages technologies such as EJS and Passport.js to serve up web pages quickly and securely. 

### :lock:Local Database

Foodventeny has a built-in local database created with Postgres. We also use Sequelize, a popular Node.js-based ORM library for security and speed of development.

### :ship:Containers

Foodventeny is built using two Docker containers, one for the database and one for the application itself. Containerizing the app ensures compatibility across all machines, greatly simplifying the installation experience.

## Installation
Ensure that Docker is installed - [Docker](https://docs.docker.com/engine/install/). 

Clone this repository and run the following command in the terminal:
```
docker-compose up
```
Then, simply open up your web browser and move to `localhost:3000/`.

## Testing
Type this command in the console to run tests using the jest library.

```
npm run test
```

# Foodventeny Design

## Introduction
Foodventeny, a local festival organization, is significantly increasing their number of vendors and requires a technological solution to organize and process applications.

In order to meet growing demands, we need to create a fast and secure web application that will be able to handle concurrent application submissions and allow event organizers a simple way to update user applications. In addition, organizers should be able to create application templates for various purposes related to their event and vendors should be able to submit their own applications using those templates and view their application statuses.

## Requirements

### Core Requirements
1. Organizers can create and manage multiple application types, track submissions and update statuses.
2. Allows vendors to submit applications and track their statuses.

### Stretch Goals
- Organizers can dynamically create application template fields to customize templates for different types of vendors.
- Organizers can edit and delete templates.
- Users can edit and delete submitted applications.
- Pagination for GET /apps.

## API
Admins can get a list of all submitted applications. Users can get a list of all applications they have submitted.
```
GET /apps
```

Users can submit an application.

```
POST /apps
request.body {
	first_name: 'john',
	last_name: 'doe',
	phone_number: 1231231231,
	email: johndoe123@example.com,
	vendor_type: 'restaurant',
	description: 'I would like to participate in Foodventeny!'
}
```
Admins can create templates for applications. 
```
POST /template
request.body {
	vendor_type: 'restaurant'
}
```
Lastly, admins can update the status of an application.
```
PUT /apps/status/:id
request.body {
	status: 'approved'
}
```

## Architecture
![MVC](foodventeny-mvc.png?raw=true  "Foodventeny MVC")

This project follows the model-view-controller (or MVC) design pattern. EJS acts as the **View** element; the template displays information returned from the controller. The **Controller** consists of the server (express.js), the authentication library (Passport) and the controller classes. They work in tandem to process user input, update the Model, and select the View to present to the user. And finally, the **Model** consists of the ORM (Sequelize) and the service classes. They handle all of the business logic and manage the application's state (updating the PostgreSQL database).

## Technologies

### Express.js

**Express.js** is a minimal and flexible Node.js framework that provides a number of features for web applications. It acts as the main server, handling incoming HTTP requests, defining routes, and sending responses back to the client.

### EJS

**EJS (Embedded JavaScript)** is a templating engine that is used to generate HTML markup with plain JavaScript. It is used to render dynamic web pages by embedding JavaScript logic directly into HTML. 

### Passport.js and Express-session

**Passport.js and Express-session** are express middlewares used to implement simple and secure authentication. Passport.js supports various authentication strategies, including `passport-local`, which enables users to tailor Passport.js to their specific needs. In this case, `passport-local` provides a simple username and password authentication that stores data on the session created by Express-session.

### PostgreSQL and Sequelize

**PostgreSQL** is an open-source relational database system and **Sequelize** is a promise-based ORM (Object-Relational Mapper). The application uses Sequelize to interact with the PostgreSQL database using JavaScript objects. Using an ORM makes interacting with data simple and more secure.

### Containers (Docker)

**Docker** containers include everything needed to run a piece of software. The application and database run inside separate Docker containers.