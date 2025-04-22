const app = require('./app');
const dotenv = require('dotenv');
const db = require("./config/db")

dotenv.config({ path: './config.env' });

let port = process.env.PORT || 5000;
let host = process.env.HOST || 'localhost';

const server = app.listen(port, () => {
    console.log(`Mode => ${process.env.NODE_ENV}`);
    console.log(`Server is running on http://${host}:${port}`);
});

db.connectToDB(process.env.DB_URL);

module.exports = server;