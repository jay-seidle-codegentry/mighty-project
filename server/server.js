const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { checkJwt, parseJwt } = require("./utils/auth.utils");
require("dotenv").config();
const _ = require("lodash");
const csv = require("csvtojson");
require("./utils/column-mapper");
require("./utils/cleanup");
const fs = require("fs");
var md5 = require("md5");

const app = express();
app.disable("x-powered-by");
var hpp = require("hpp");
const { getMapping } = require("./utils/column-mapper");
const { initializeCleanup } = require("./utils/cleanup");
const origin = process.env.APP_ORIGIN;
const originPort = process.env.APP_ORIGIN_PORT;
const port = process.env.APP_PORT;
const uploadsFolder = process.env.UPLOADS_FOLDER;

const days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
const mons = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const handleInboxRequest = (req, res) => {
  let page = req.params.pageId ? parseInt(req.params.pageId) : 0;

  const inboxItems = transactions.filter((transaction) => {
    if (!transaction.envelope) {
      return true;
    }
    return false;
  });

  res.send({
    page: page,
    more: false,
    errorState: {},
    transactions: inboxItems,
  });
};

app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 200 * 1024 * 1024, //200KBs max file(s) size
    },
  })
);
app.use(cors({ origin: `${origin}:${originPort}` }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(hpp());

let userPreferences = new Map();
userPreferences.set("__default", {
  test: "dumb",
});

let transactions = [
  {
    id: "5efa62d081bc407e2e59d82a",
    amount: "-105.97",
    date: "Mon, December 17",
    description: "VERIZON ONLINE PMT",
    account: { id: "5ed3b507f717db58968b7a34", title: "Checking Account" },
    type: "purchase",
  },
  {
    id: "5efa62d081bc407e2e59d82b",
    amount: "10294.97",
    date: "Mon, December 17",
    description: "U-TRADE Direct Deposit",
    account: { id: "5ed3b507f717db58968b7a34", title: "Checking Account" },
    type: "deposit",
  },
  {
    id: "5efa62d081bc407e2e59d82c",
    amount: "-225.47",
    date: "Mon, December 25",
    description: "Joe's Meat Farm - Roast Beef",
    account: { id: "5ed3b507f717db58968b7a34", title: "Checking Account" },
    type: "purchase",
  },
];

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
      id: "5ed3b4adeac42f78ecbdbbfa",
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
      id: "5ed3b4adeac42f78ecbdbbfb",
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

  const etagFlag = app.get("etag");
  if (req.headers.aktualisierung) {
    app.set("etag", false);
  }

  res.json(user);
  if (req.headers.aktualisierung) {
    app.set("etag", etagFlag);
  }
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
  const { id, title, detail } = req.body;
  let msg = "account not found; nothing updated";

  if (id) {
    const accountList = user.accounts.filter(function (account) {
      if (account.id == id) {
        if (title) account.title = title;
        if (detail) account.detail = detail;
        msg = "account updated successfully";
      }
      return true;
    });

    user.accounts = accountList;
  } else {
    msg = "account added successfully";
    req.body.id = (Math.random() * 1000000 + 1).toString();
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

app.post("/api/envelope/save", checkJwt, (req, res) => {
  const { id, title } = req.body;
  let msg = "envelope not found; nothing updated";

  if (id) {
    const envelopeList = user.envelopes.filter(function (envelope) {
      if (envelope.id == id) {
        if (title) {
          envelope.title = title;
          msg = "envelope updated successfully";
        }
      }
      return true;
    });

    user.envelopes = envelopeList;
  } else {
    msg = "envelope added successfully";
    req.body.id = (Math.random() * Number.MAX_SAFE_INTEGER + 1).toString();
    req.body.detail = [];
    user.envelopes.push(req.body);
  }
  user.responseState = { msg: msg };
  res.json(user);
});

app.post("/api/envelope/remove", checkJwt, (req, res) => {
  const key = req.body.id;
  let msg = "envelope not found; nothing removed";
  const envelopeList = user.envelopes.filter(function (envelope) {
    if (envelope.id == key) {
      msg = "envelope removed successfully";
      if (
        envelope.detail.forEach((e) => {
          if (e.amount != 0) {
            const reallocationTransaction = transactionFactory(
              new Date(),
              e.amount,
              "Delete",
              "Balance from " + e.name + " Envelope. Deleted!",
              e.id,
              e.name
            );
            transactions.push(reallocationTransaction);
          }
        })
      );
      return false;
    }
    return true;
  });

  user.envelopes = envelopeList;
  user.responseState = { msg: msg };
  res.json(user);
});

app.get("/api/transactions", checkJwt, (req, res) => {
  console.log(req.headers.page);

  res.send({ page: parseInt(req.headers.page) + 1 });
});

app.get("/api/transactions/inbox/:pageId", checkJwt, (req, res) => {
  handleInboxRequest(req, res);
});

app.post("/api/transactions/upload", checkJwt, async (req, res) => {
  try {
    if (!req.files) {
      console.error("no files");
      res.send({
        status: false,
        responseState: { msg: "No file uploaded" },
      });
    } else {
      //Use the name of the input field (i.e. "csv") to retrieve the uploaded file
      let csvFile = req.files.csv;
      let accountJson = req.body.account;
      let account = JSON.parse(accountJson);
      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      const uuid = parseJwt(req.headers.authorization).sub;
      const fileRandomizer = Math.random() * Number.MAX_VALUE;
      const preAuthFileName = md5(fileRandomizer + csvFile.name);
      const fileName = md5(preAuthFileName + uuid);
      await csvFile.mv(uploadsFolder + fileName);

      const jsonArray = await csv({
        noheader: true,
      }).fromFile(uploadsFolder + fileName);

      const sampleData = jsonArray.slice(0, 10);
      const mapping = await getMapping(sampleData);

      //send response
      res.send({
        status: true,
        responseState: { msg: "File is uploaded" },
        data: {
          key: preAuthFileName,
          account: account,
          mimetype: csvFile.mimetype,
          size: csvFile.size,
          items: sampleData,
          mapping: mapping,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

const createTransaction = (record, accountId, accountTitle, map) => {
  const keys = Object.keys(record);
  const recordDate = new Date(record[keys[map.date]]);

  const result = transactionFactory(
    recordDate,
    record[keys[map.amount]],
    record[keys[map.type]],
    record[keys[map.description]],
    accountId,
    accountTitle
  );

  return result;
};

const transactionFactory = (
  date,
  amount,
  type,
  description,
  accountId,
  accountTitle
) => {
  const recordDate = new Date(date);
  const dow = days[recordDate.getDay()];
  const month = mons[recordDate.getMonth()];
  const year = recordDate.getFullYear();
  const day = recordDate.getDate();
  const curYear = new Date().getFullYear();
  return {
    id: ((Math.random() * Number.MAX_SAFE_INTEGER).toFixed(0) + 1).toString(),
    date:
      dow + ", " + month + " " + day + (year !== curYear ? ", " + year : ""),
    amount: amount,
    type: type,
    description: description,
    account: {
      id: accountId,
      title: accountTitle,
    },
  };
};

app.post("/api/transactions/import", checkJwt, async (req, res) => {
  const { key, account, map, startingRow } = req.body;
  // use key + user.sub to make filename
  // check if file exists
  // get internal account balance by account id
  // generate batch id - may do this later
  // loop to create new transactions from file
  //   set account on each record
  //   update local balance variable

  const uuid = parseJwt(req.headers.authorization).sub;
  const fileName = md5(key + uuid);
  if (!fs.existsSync(uploadsFolder + fileName)) {
    res.status(404).json({ message: "key not found" }).send();
    return;
  }

  let liveMap = {};
  map.map((value, index) => {
    if (value === "DATE") {
      liveMap.date = index;
    } else if (value === "AMOUNT") {
      liveMap.amount = index;
    } else if (value === "TYPE") {
      liveMap.type = index;
    } else if (value === "DESCRIPTION") {
      liveMap.description = index;
    }
  });

  const liveAccount = user.accounts.reduce((result, current) => {
    if (current.id === account.id) {
      result = current;
    }
    return result;
  });

  let workingAccountId = liveAccount.id;
  let workingAccountTitle = liveAccount.title;
  let workingAccountBalance = parseFloat(liveAccount.detail[0].amount);

  try {
    // async process
    const op = await csv({ noheader: true })
      .fromFile(uploadsFolder + fileName)
      .subscribe((json, lineNumber) => {
        if (startingRow <= lineNumber) {
          return new Promise((resolve, reject) => {
            const newTransaction = createTransaction(
              json,
              workingAccountId,
              workingAccountTitle,
              liveMap
            );
            workingAccountBalance =
              workingAccountBalance + parseFloat(newTransaction.amount);
            transactions = [...transactions, newTransaction];
            resolve();
          });
        }
      });
  } catch (err) {
    console.error(err);
  }

  liveAccount.detail[0].amount = workingAccountBalance;

  handleInboxRequest(req, res);
});

app.post("/api/transactions/assign", checkJwt, (req, res) => {
  const { transactionId, envelopeId } = req.body;

  // get live record indexes
  const transactionIndex = transactions.findIndex(
    (t) => t.id === transactionId
  );
  const envelopeIndex = user.envelopes.findIndex((e) => e.id === envelopeId);
  const accountIdFromTransaction = transactions[transactionIndex].account.id;
  const accountIndex = user.accounts.findIndex(
    (a) => a.id === accountIdFromTransaction
  );

  // send not founds
  console.log(transactionIndex);
  console.log(envelopeIndex);
  console.log(accountIndex);
  if (transactionIndex < 0 || envelopeIndex < 0 || accountIndex < 0) {
    let responseCode = transactionIndex < 0 ? "FF" : "";
    responseCode = responseCode + (envelopeIndex < 0 ? "AA" : "");
    responseCode = responseCode + (accountIndex < 0 ? "99" : "");
    res
      .status(400)
      .json({ message: "record(s) not found", code: responseCode });
    return;
  }

  // add envelope to transaction
  const liveEnvelope = user.envelopes[envelopeIndex];
  const liveEnvelopeId = liveEnvelope.id;
  const liveEnvelopeTitle = liveEnvelope.title;
  transactions[transactionIndex].envelope = {
    id: liveEnvelopeId,
    title: liveEnvelopeTitle,
  };

  // adjust envelope balance
  const liveAccountId = user.accounts[accountIndex].id;
  const liveAccountTitle = user.accounts[accountIndex].title;
  const liveTransactionAmount = parseFloat(
    transactions[transactionIndex].amount
  );
  const envelopeDetailIndex = liveEnvelope.detail.findIndex(
    (e) => e.id === liveAccountId
  );

  if (envelopeDetailIndex === -1) {
    liveEnvelope.detail.push({
      id: liveAccountId,
      name: liveAccountTitle,
      amount: (0 + liveTransactionAmount).toString(),
    });
  } else {
    const liveEnvelopeAccountAmount = parseFloat(
      user.envelopes[envelopeIndex].detail[envelopeDetailIndex].amount
    );
    const newAmount = liveEnvelopeAccountAmount + liveTransactionAmount;
    // no need to update envelope account id (it exists)
    // updating name incase it may have changed; transactions display by id not by name
    user.envelopes[envelopeIndex].detail[
      envelopeDetailIndex
    ].name = liveAccountTitle;
    user.envelopes[envelopeIndex].detail[
      envelopeDetailIndex
    ].amount = newAmount;
  }

  res.json(transactions[transactionIndex]);
});

// https://gist.github.com/Yimiprod/7ee176597fef230d1451
function difference(object, base) {
  function changes(object, base) {
    return _.transform(object, function (result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }
  return changes(object, base);
}

app.get("/api/user-preferences", checkJwt, (req, res) => {
  const userInfo = parseJwt(req.headers.authorization);
  if (!userInfo) {
    res.status(404).json({ message: "user not found!" });
    return;
  }

  const defaults = userPreferences.get("__default");
  const preferencesKey = md5(userInfo.sub);

  if (!userPreferences.has(preferencesKey)) {
    res.json(defaults);
    return;
  }

  const prefs = userPreferences.get(preferencesKey);
  res.json({ ...defaults, ...prefs });
});

app.post("/api/user-preferences", checkJwt, (req, res) => {
  const userInfo = parseJwt(req.headers.authorization);
  if (!userInfo) {
    res.status(404).json({ message: "user not found!" });
    return;
  }

  const defaults = userPreferences.get("__default");
  const preferencesKey = md5(userInfo.sub);

  let currentPrefs = {};
  if (userPreferences.has(preferencesKey)) {
    currentPrefs = userPreferences.get(preferencesKey);
  }

  const copy = JSON.parse(JSON.stringify(currentPrefs));

  const { properties } = req.body;
  userPreferences.set(preferencesKey, { ...currentPrefs, ...properties });

  const prefs = userPreferences.get(preferencesKey);

  const changes = difference(prefs, copy);

  res.json(changes);
});

// app.get("/api/external", checkJwt, (req, res) => {
//   const data = parseJwt(req.headers.authorization);

//   res.send({
//     msg: `Your Access Token was successfully validated! - ${data.sub}`,
//   });
// });

app.get("/api/timestamp", (req, res) => {
  res.send({
    msg: Date.now(),
  });
});

initializeCleanup();
app.listen(port, () => console.log("API listening on " + port));
