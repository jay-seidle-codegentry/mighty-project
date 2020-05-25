const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

const authConfig = {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  audience: process.env.AUTH0_AUDIENCE,
};

const profileConfig = {
  issuer: process.env.PROFILE_ISSUER,
  subject: process.env.PROFILE_SUBJECT,
  audience: process.env.PROFILE_AUDIENCE,
  algorithm: "RS256",
  expires: "60",
};

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"],
});

parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    Buffer.from(base64, "base64")
      .toString()
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

signPayload = (payload) => {
  const options = {
    issuer: profileConfig.issuer,
    subject: profileConfig.subject,
    audience: profileConfig.audience,
    expires: profileConfig.expires,
    algorithm: profileConfig.algorithm,
  };
  var privateKey = fs.readFileSync("../keys/private.key", "utf8");
  jsonwebtoken.sign(payload, privateKey, options);
};

module.exports.signPayload = signPayload;
module.exports.parseJwt = parseJwt;
module.exports.checkJwt = checkJwt;