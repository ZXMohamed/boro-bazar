import express from 'express';
import { router } from './Hello/hello.routes.js';
import { userRouter } from './User/user.routes.js';
import connectDB from './config/db.js';

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Hello routes
app.use('/', router);

// User routes
app.use('/api', userRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
