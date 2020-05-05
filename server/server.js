const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const {checkJwt, parseJwt} = require("./utils/auth.utils");
require("dotenv").config();

const app = express();
const origin = process.env.APP_ORIGIN;

app.use(cors({ origin: `${origin}` }));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/external", checkJwt, (req, res) => {
  const token = req.headers.authorization.replace('Bearer').trim();
  const data = parseJwt(token);

  res.send({
    msg: `Your Access Token was successfully validated! - ${data.sub}`
  });
});

app.get("/api/timestamp", (req, res) => {
    res.send({
        msg: Date.now()
    });
});

app.listen(3001, () => console.log('API listening on 3001'));