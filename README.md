### MERN + Passport.js
> example MERN stack application that uses authentication

* Mongo, Express, React, Node (MERN) + Passport.js for managing authentication
* This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Demo
![demo gif](./_screenshots/mern_passport_demo.gif)

View the live version of this app here:
[https://mern-passport.herokuapp.com/](https://mern-passport.herokuapp.com/)

## Project Structure
```
|-- server/
|  |-- server.js                            // The entry point for running the backend server locally, and main server for production
|  |-- passport/                             // Configuration files used to connect to different machines or set settings
|     |-- index.js                     // Overloads the passport object and defines serialize and deserialize
|     |-- localStrategy.js            // Defines a local strategy
|     |-- googleStrategy.js           // Defines google OAuth stratgey
|     ....
|  |-- db/                             
|     |-- index.js                  // Configures the connection to the database
|     |-- models/                   // represents data from our database, and defines schemas for each collection
|        |-- user.js                // Schema for the User collection
| -- src/                           // Entry for the React client side application
```

## Note
* In order to set the google authentication up, you must register your app @ [https://console.developers.google.com](https://console.developers.google.com) & set `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` as environmental variables
* In development mode (i.e. `npm run dev`), OAuth google callback is not being proxied to the google servers. Therefore in order to test the google OAuth on your local machine do the following:
1) `npm run build`
2) `npm run prod`
