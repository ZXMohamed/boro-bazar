import express from 'express';
import { router } from './Hello/hello.routes.js';
import connectDB from './config/db.js';

connectDB();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// name feature
app.use('/', router);

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        message: err.message || "Error",
        error: err.error || [],
        status: err.statusCode || 500
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
