import express from 'express';
import bodyParser from 'body-parser';

import indexRoute from './routes/index'
import './model/index';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

indexRoute(app);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});