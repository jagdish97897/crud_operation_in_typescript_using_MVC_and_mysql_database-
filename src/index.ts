
// Server.ts

import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './Config/database';
import { userRoute } from './Routes/userRoute';

const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MySQL and set up routes
connectDB()
  .then((pool) => {
    // Set the pool in app.locals
    app.locals.pool = pool;

    // Use the userRoute
    app.use('/', userRoute);

    // Start the server
    app.listen(port, (): void => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MySQL connection error:', error);
  });

