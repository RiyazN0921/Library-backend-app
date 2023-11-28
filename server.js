require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser');
const dbConnection = require('./src/config/db.config');

const app = express();

app.use(bodyparser.json())
const PORT = process.env.PORT || 4000

app.use('/api/auth', require('./src/routes/auth.routes'))
app.use('/api/book', require('./src/routes/book.routes'))
app.use('/api/patron', require('./src/routes/patron.routes'))

app.listen(PORT, async () => {
    console.log("Server listening on port", PORT);
    await dbConnection()
})

module.exports = app;