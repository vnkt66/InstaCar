# InstaCar

### [Live Demo](https://instacarclone.herokuapp.com/aq-index "InstaCar Clone")

#### Front-End: React, Semantic Ui React, React Bootstrap, Bootstrap.
#### Back-End: Express, Mongodb, Nodejs
#### Authentication: Jwt, Helmet, bcrypt
#### Payments: Stripe

To run it locally -

### Steps to run in development mode:-

1. Fork the repo and clone it.
2. Switch to `development` branch for running in development mode.
3. Make sure you have `yarn` Node.js & MongoDB installed in your system.
4. [Only once] Run (from the root) `npm install` and `cd client && npm install`.
5. Open two terminal windows (one for running Server and other for the UI).
6. Start MongoDB service with `sudo service mongod start`. 
7. Run `npm server` to start the server. By default it will run on `port 4000`.
8. For UI run `npm client` and it will open on a new tab on `port 3000`.
9. Go to `http://localhost:3000` to see the application running.

### Steps to run in production mode:-
1. Fork the repo and clone it.
2. Make sure you have `npm` Node.js & MongoDB installed in your system.
3. [Only once] Run (from the root) `npm install` and `cd client && npm install`.
4. Open two terminal windows (one for running Server and other for the UI).
5. Start MongoDB service with `mongod`. 
6. Run `npm server` to start the server. By default it will run on `port 4000`.
This time go to `http://localhost:4000` to see the application running.

### Issues:-
1. Distance between two places are fixed as 347km which is distance betweeen bangalore to chennai, code required to get distances
dynamically from goole using google api keys is also implemented which you need google api keys.
2.In Airport Package transaction will be unsuccesful since airport package price is fixed at 1500Rs which stripe will treat it as 
low payment and return an error.




