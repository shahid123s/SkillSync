import express from 'express';
import cookieParser from 'cookie-parser';
import connectMongoDb from './src/config/dbConfig.js';
import corsConfig from './src/config/corsConfig.js';
import {appConfig} from './src/config/appConfig.js';

const {port} = appConfig.app

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(corsConfig);




(async () => {
    try {

  
      // Start the Express server only after Redis is ready
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        connectMongoDb()
      });
  
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      process.exit(1);  // Exit process if Redis fails to connect
    }
  })();
  