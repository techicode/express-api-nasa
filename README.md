# express-api-nasa

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|PORT           | PORT for the API URL            | "8000"      |
|MONGO_URL           | Mongo url for the database starting with mongodb+srv            | ""      |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) 


# Getting started
- Clone the repository
```
git clone  https://github.com/techicode/express-api-nasa.git
```
- Install dependencies
```
cd express-api-nasa
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:8000/launches` or `http://localhost:8000/planets`


## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies.                                                           |
| **src**                  | Contains  source code that will be compiled to the dist dir.                               |
| **data**                 | Initial csv file with planets.
| **src/models**           | Models for launches and plantes, includes model for mongo. 
| **src/routes**              | Contain all express routes, separated by module/area of application.
| **src/services**      | Utilities for different functions.
| **src**/app.js         | Entry point to express app.                                                               |
| **src**/app.js         | Entry point to express app.                                                               |


## Testing
The tests are  written in jest

```
"jest": "^27.5.1",
```


```
### Running tests using NPM Scripts
npm run test
```

## Packages
The following packages were used
```
"axios": "^0.26.0",
"cors": "^2.8.5",
"csv-parse": "^5.0.4",
"dotenv": "^16.0.0",
"express": "^4.17.2",
"mongoose": "^6.2.3",
"validatorjs": "^3.22.1"
```
