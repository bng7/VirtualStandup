const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const api = require('./api/app');

const port = 8080;

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/api', api);

//MongoDB connection
mongoose.connect('mongodb://52.65.244.131:27017/virtualstandups', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () => {
    console.log('Connection error!');
})

db.once('open', () => {
    console.log('Connected to MongoDB');

    app.listen(port, () => {
        console.log(`Server started on port: ${port}`);
    })

});

app.use('/', express.static('public'));