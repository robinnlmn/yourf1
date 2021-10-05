require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')

const port = process.env.PORT || 8080;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log(`Connected to Database: ${process.env.DATABASE_URL}`))

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

const driversRouter = require('./routes/drivers')
app.use('/drivers', driversRouter)

const legendsRouter = require('./routes/legends')
app.use('/legends', legendsRouter)

app.listen(port, () => {
    console.log(`Server started on ${port}`)
});