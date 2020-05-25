const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const {checkJwt, parseJwt} = require("./utils/auth.utils");
require("dotenv").config();

const app = express();
const origin = process.env.APP_ORIGIN;
const originPort = process.env.APP_ORIGIN_PORT;
const port = process.env.APP_PORT;

app.use(cors({ origin: `${origin}:${originPort}` }));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let user = {
  exists: false,
  nickName: "Moebly Beaner",
  email: "john.doe@doa.uri",
  onBoarded: Date.now,
  responseState: {},
};

app.get("/api/profile", checkJwt, (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const tokenData = parseJwt(token);
  //console.log(tokenData);
  res.json({sub: tokenData.sub,  ...user});
});

app.post("/api/profile", checkJwt, (req, res) => {
  const {nickName, email} = req.body;
  if (nickName) {
    user.nickName = nickName;
  };
  if (email) {
    user.email = email;
  };
  user.exists=true;
  user.responseState = {msg: "updated successfully"};
  res.json(user);
});

app.get("/api/external", checkJwt, (req, res) => {
  const data = parseJwt(req.headers.authorization);

  res.send({
    msg: `Your Access Token was successfully validated! - ${data.sub}`
  });
});

app.get("/api/timestamp", (req, res) => {
    res.send({
        msg: Date.now()
    });
});

app.listen(port, () => console.log('API listening on ' + port));