import express from 'express';
import bodyParser from 'body-parser';

import indexRoute from './routes/index'
import './model/index';

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
// });
indexRoute(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});