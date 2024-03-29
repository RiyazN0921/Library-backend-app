require('dotenv').config();
const mongoose = require('mongoose');
const db_url = process.env.DB_URL

const dbConnection = async (req, res, next) => { 
    try {
        console.log("inside db connection")
        await mongoose.connect(db_url)
        console.log("database connection established!")
    } catch (error) {
       console.log(error)
    }
}

module.exports = dbConnection