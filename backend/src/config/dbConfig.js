import mongoose from 'mongoose';
import { appConfig } from './appConfig.js';

const connectMongoDb = async () => {
    try {
        await mongoose.connect(appConfig.db.uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(`${error.message} happens in connecting the Mongodb`);
    }
}

export default connectMongoDb;