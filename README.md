# Introduction
This documentation provides an overview and instructions for using the Blog Application, a web application built with React and Node.js. The application allows users to create, read, update, and delete blog posts.

## Table of Contents
1. Prerequisites
2. Installation
3. Usage
4. Configuration
5. API Endpoints
6. Feedback
## Prerequisites
Before installing and using the Blog Application, ensure you have the following prerequisites:

* Node.js (version 12 or higher)
* npm (Node Package Manager) or Yarn
* MongoDB (installed and running)

## Configuration
The Blog Application requires configuration for connecting to the MongoDB database. To configure the application, follow these steps:
* Create the .env file in the project root directory.
* Open the .env file in a text editor.
* Add the CLOUD value to match your MongoDB connection string.
* Add the SECRET value as a String Literal eg. 'keyboard cat'
* Save the .env 

# Installation
To install the Blog Application, follow these steps:
1. Clone the repo from GitHub:
 ```
 git clone https://github.com/ManishMadan2882/blog-app.git
 ```
2. Install dependencies
 ```
 npm install
 ```
3. ## Usage
To start the Blog Application, follow these steps:
1. Ensure your MongoDB instance is running.
2. Run the application using npm or Yarn:
```
node server/index
```
4. Open a web browser and visit http://localhost:5400 to access the Blog Application.

## API Endpoints

### POST '/api/login'
with body{username,password} to create user session
### POST 'api/register'
with body{username,password} to create new user
### GET '/api/blogs'
to fetch all the blogs 
### GET '/api/blog/:id'
to fetch a respective blog
### POST 'api/create'
to create a new blog(authorized access)
### PUT '/api/update/:id'
to update a blog(authorized access)
### DELETE '/api/delete/:id'
to delete a blog(authorized access)
### GET '/api/ping'
to GET the authenticated user details
### POST '/api/comment/:id'
to comment on a blog('user should be authenticated')

## Feedback
Give your feedback and report any issues.
