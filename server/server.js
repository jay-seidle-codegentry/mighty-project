const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { checkJwt, parseJwt } = require("./utils/auth.utils");
require("dotenv").config();

const app = express();
const origin = process.env.APP_ORIGIN;
const originPort = process.env.APP_ORIGIN_PORT;
const port = process.env.APP_PORT;

app.use(cors({ origin: `${origin}:${originPort}` }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let user = {
  exists: false,
  nickName: "Moebly Beaner",
  email: "john.doe@doa.uri",
  onBoarded: Date.now,
  responseState: {},
  accounts: [
    {
      title: "Whoa Thingy",
      detail: [
        { name: "Checking111", amount: "1325.22" },
        { name: "Checking222", amount: "-995.22" },
      ],
    },
    {
      title: "Checking Account",
      detail: [{ name: "Main Checking", amount: "13807.53" }],
    },
    {
      title: "Savings Account",
      detail: [{ name: "Main Savings", amount: "1201.79" }],
    },
    {
      title: "Chase Card",
      detail: [{ name: "Chase Credit Card", amount: "-978.09" }],
    },
  ],
  envelopes: [
    {
      title: "Whoa Thingy",
      detail: [
        { name: "Checking111", amount: "1325.22" },
        { name: "Checking222", amount: "-995.22" },
      ],
    },
    {
      title: "Rent / Mortgage",
      detail: [{ name: "Checking", amount: "1907.53" }],
    },
    {
      title: "Utilities",
      detail: [
        { name: "Checking", amount: "100.79" },
        { name: "Savings", amount: "101.00" },
      ],
    },
    {
      title: "Movies",
      detail: [
        { name: "Checking", amount: "22.91" },
        { name: "Savings", amount: "100.00" },
      ],
    },
    {
      title: "Savings",
      detail: [
        { name: "Checking", amount: "99.99" },
        { name: "Savings", amount: "900000.00" },
      ],
    },
  ],
};

app.get("/api/profile", checkJwt, (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const tokenData = parseJwt(token);
  //console.log(tokenData);
  res.json({ sub: tokenData.sub, ...user });
});

app.post("/api/profile", checkJwt, (req, res) => {
  const { nickName, email } = req.body;
  if (nickName) {
    user.nickName = nickName;
  }
  if (email) {
    user.email = email;
  }
  user.exists = true;
  user.responseState = { msg: "updated successfully" };
  res.json(user);
});

app.get("/api/external", checkJwt, (req, res) => {
  const data = parseJwt(req.headers.authorization);

  res.send({
    msg: `Your Access Token was successfully validated! - ${data.sub}`,
  });
});

app.get("/api/timestamp", (req, res) => {
  res.send({
    msg: Date.now(),
  });
});

app.listen(port, () => console.log("API listening on " + port));
