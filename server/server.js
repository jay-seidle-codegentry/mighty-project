const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { checkJwt, parseJwt } = require("./utils/auth.utils");
require("dotenv").config();

const app = express();
app.disable('x-powered-by');
var hpp = require('hpp');
const origin = process.env.APP_ORIGIN;
const originPort = process.env.APP_ORIGIN_PORT;
const port = process.env.APP_PORT;

app.use(cors({ origin: `${origin}:${originPort}` }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(hpp());

let user = {
  id: "5ed3e11f8acdde2754441c39",
  exists: false,
  nickName: "Moebly Beaner",
  email: "john.doe@doa.uri",
  onBoarded: Date.now,
  responseState: {},
  accounts: [
    {
      id: "5ed3b507f717db58968b7a33",
      title: "Whoa Thingy",
      detail: [{ name: "Whoa Thingy", amount: "1325.22" }],
    },
    {
      id: "5ed3b507f717db58968b7a34",
      title: "Checking Account",
      detail: [{ name: "Checking Account", amount: "2131.22" }],
    },
    {
      id: "5ed3b507f717db58968b7a35",
      title: "Savings Account",
      detail: [{ name: "Savings Account", amount: "901526.22" }],
    },
    {
      id: "5ed3b507f717db58968b7a36",
      title: "Chase Credit Card",
      detail: [{ name: "Chase Credit Card", amount: "-995.22" }],
    },
  ],
  envelopes: [
    {
      id: "5ed3b4adeac42f78ecbdbbf7",
      title: "Whoa Thingy",
      detail: [
        {
          id: "5ed3b507f717db58968b7a35",
          name: "Savings Account",
          amount: "1325.22",
        },
        {
          id: "5ed3b507f717db58968b7a36",
          name: "Chase Credit Card",
          amount: "-995.22",
        },
      ],
    },
    {
      id: "5ed3b4adeac42f78ecbdbbf8",
      title: "Rent / Mortgage",
      detail: [
        {
          id: "5ed3b507f717db58968b7a34",
          name: "Checking Account",
          amount: "1907.53",
        },
      ],
    },
    {
      id: "5ed3b4adeac42f78ecbdbbf9",
      title: "Utilities",
      detail: [
        {
          id: "5ed3b507f717db58968b7a34",
          name: "Checking Account",
          amount: "100.79",
        },
        {
          id: "5ed3b507f717db58968b7a35",
          name: "Savings Account",
          amount: "101.00",
        },
      ],
    },
    {
      title: "Movies",
      detail: [
        {
          id: "5ed3b507f717db58968b7a34",
          name: "Checking Account",
          amount: "22.91",
        },
        {
          id: "5ed3b507f717db58968b7a35",
          name: "Savings Account",
          amount: "100.00",
        },
      ],
    },
    {
      title: "Emergency Fund",
      detail: [
        {
          id: "5ed3b507f717db58968b7a34",
          name: "Checking Account",
          amount: "99.99",
        },
        {
          id: "5ed3b507f717db58968b7a35",
          name: "Savings Account",
          amount: "900000.00",
        },
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

app.post("/api/account/save", checkJwt, (req, res) => {
  const {id, title, detail} = req.body;
  let msg = "account not found; nothing updated";

  if(id) {
    const accountList = user.accounts.filter(function (account) {
      if (account.id == id) {
        if (title) account.title = title;
        if (detail) account.detail = detail;
        msg = "account updated successfully";
      }
      return true;
    });
  
    user.accounts = accountList;  
  }
  else {
    msg = "account added successfully";
    req.body.id = ((Math.random() * 1000000) + 1).toString();
    user.accounts.push(req.body);
  }
  user.responseState = { msg: msg };
  res.json(user);
});

app.post("/api/account/remove", checkJwt, (req, res) => {
  const key = req.body.id;
  let msg = "account not found; nothing removed";
  const accountList = user.accounts.filter(function (account) {
    if (account.id == key) {
      msg = "account removed successfully";
      return false;
    }
    return true;
  });

  user.accounts = accountList;
  user.responseState = { msg: msg };
  res.json(user);
});

app.get("/api/transactions", checkJwt, (req, res) => {
  console.log(req.headers.page);

  res.send({ page: parseInt(req.headers.page) + 1 });
});

app.get("/api/transactions/inbox/:pageId", checkJwt, (req, res) => {
  let page = req.params.pageId ? parseInt(req.params.pageId) : 0;

  res.send({
    page: page,
    more: false,
    errorState: {},
    transactions: [
      {
        amount: "-105.97",
        date: "Mon, December 17",
        description: "VERIZON ONLINE PMT",
        account: "Checking",
        type: "purchase",
      },
      {
        amount: "10294.97",
        date: "Mon, December 17",
        description: "U-TRADE Direct Deposit",
        account: "Checking",
        type: "deposit",
      },
      {
        amount: "-225.47",
        date: "Mon, December 25",
        description: "Joe's Meat Farm - Roast Beef",
        account: "Checking",
        type: "purchase",
      },
    ],
  });
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
