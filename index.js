const port = process.env.PORT || 8001;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/client');

const isAdmin = require('./middleware/isAdmin');


const app = express();

app.use(bodyParser.json()); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
app.use('/auth', authRoute);
app.use('/admin',isAdmin, adminRoute);
app.use('/api', userRoute);
app.get('/', (req, res) => res.send('Dholpur Public API'))
// Routes


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message : message, data: data})
})

mongoose.connect(
    'mongodb+srv://dholpur:qwerty1234@dholpur.vt23o.mongodb.net/grocery?retryWrites=true&w=majority'
).then(result => {
    app.listen(port, () => {
        console.log("Server running at "+port);
    })
})
.catch(err => console.log(err))