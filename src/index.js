

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
require('dotenv').config();

const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', 
});

// Testez la connexion à la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));


const square = require("./lib/square")

app.disable("x-powered-by")

app.get('/', (req, res) => {
    res.send("hello world");
});

app.get('/square/:nb', (req, res) => {
	const nb = req.params.nb
	res.send(square(parseInt(nb)).toString());
});

let server;

server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = {
    app,
    closeServer: () => {
        server.close();
    }
};