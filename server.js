const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dbConfig = require('./config/database.js')

mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const dataKaryawanRouter = require('./routes/data_karyawan')
app.use('/data_karyawan', dataKaryawanRouter)


app.listen(3000, () => console.log('server started'))