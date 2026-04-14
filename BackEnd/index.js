import express from 'express';
import { router } from './Hello/hello.routes.js';
import connectDB from './config/db.js';

connectDB();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// name feature
app.use('/', router);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
