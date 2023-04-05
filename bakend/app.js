const express = require('express');
const bodyperser = require('body-parser');
const cors = require('cors');

const sequelize = require('./utils/DataBase.js');
let router = require('./routers/router');

const app = express();
app.use(cors());
app.use(bodyperser.json({ urlencoded: true, urlencoded: true }))


app.use(router)

sequelize
  // .sync({ force: true })
  .sync()
  .catch(err => console.log(err))

app.listen(4000)