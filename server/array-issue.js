const response = {
  profile: {
    name: "jay",
    email: "john.doe@io.com",
  },
  accounts: [
    {
      title: "chase",
      amount: 130.99,
    },
    {
      title: "checking",
      amount: 130.99,
    },
    {
      title: "savings",
      amount: 130.99,
    },
  ],
  envelopes: [
    {
      title: "utilities",
      amount: 95,
    },
    {
      title: "movies",
      amount: 15,
    },
  ],
};

console.log(response);

const triggerHandler = (handler, data) => {
  try {
    handler(data);
  } catch (err) {
    console.error(err.message);
  }
};

const profileHandler = (profile) => {
  console.log("profile data");
  console.log(profile);
};

const accountsHandler = (accounts) => {
  console.log("accounts length: " + accounts.length);
  console.log("accounts data");
  console.log(accounts);
};

const envelopesHandler = (envelopes) => {
  console.log("envelopes length: " + envelopes.length);
  console.log("envelopes data");
  console.log(envelopes);
};

const publishedData = new Map();
publishedData.set("profile", []);
publishedData.set("accounts", []);
publishedData.set("envelopes", []);

const subscribedHandlers = new Map();
subscribedHandlers.set("profile", [profileHandler]);
subscribedHandlers.set("accounts", [accountsHandler]);
subscribedHandlers.set("envelopes", [envelopesHandler]);

const publish = (data) => {
  console.log("* * * P U B L I S H I N G * * *");
  // console.log(subject);
  // console.log(publishedData.current.get(subject));
  //console.log("DATA vvv");
  console.log("full response");
console.log({...response.accounts});
console.log(data);
  // console.log({
  //   ...publishedData.current.get(subject),
  //   ...data,
  // });
  console.log("response envelopes");
  console.log(data.accounts);
  //console.log("end data");
  for (let key of Object.keys(data)) {
    // console.log(".....................");
    // console.log(key);
    // console.log(publishedData.get(key));
    console.log({
      ...publishedData.get(key),
      ...data[key],
    });
    // console.log(".....................");
    publishedData.set(key, {
      ...publishedData.get(key),
      ...data[key],
    });
    subscribedHandlers.get(key).forEach((handler) => {
      triggerHandler(handler, publishedData.get(key));
    });
  }
  // publishedData.current.set(subject, {
  //   ...publishedData.current.get(subject),
  //   ...data,
  // });
  // subscribedHandlers.current.get(subject).forEach((handler) => {
  //   triggerHandler(handler, data);
  // });
};

publish(response);
publish({
    accounts: [
        {
          title: "chase",
          amount: 230.99,
        },
      ],
    });
