# The Mighty Project
## Introduction
So I am Development Manager / Delivery Owner in the Finance Industry.  I like to code, and particularly, I like to encourage my team members to be opinionated about their craft. This project exists as a personal venture to build a project using Uncle Bob's Clean Code, SOLID and other good architecture principles.
## For Starters
This will be:
- a React client project, using Create React App
- use Testing-Library and Jest for testing
- will use Test Driven Development (TDD - tests first)

## What's the App
So, I've done some debating... I am going to start with an app that does 'envelope budgeting'.  I am an avid budgeter, I've used several budgeting apps and fell in love with the old version of mvelopes. However, I am not a fan of the latest version, so I started downloading CSVs from my accounts and importing them into Excel.  So my plan is to
* Integrate with an authentication service like Auth0
* Use MongoDB to replicate my Excel spreadsheets
    * one sheet per account
    * need to create a field mapper for various account providers
    * set up envelopes and initial balance
    * upload a CSV for selected mapper to import
* You will be able to
    * add or delete accounts
    * add or delete envelopes
    * add or delete funding templates
    * fund envelopes
    * manage transactions to envelopes

## What's Working
### Server
**NOTE**: to get back to clean slate, restart the server
1. Backend Profile Service - is stubbed out. The GET returns 'user not found' json object and the POST updates it.  It is not storing the info
1. Backend for getting Inbox items (transactions with no envelope set) is stubbed out
1. Backend for Add, Update and Remove accounts is stubbed out
1. Backend for Add, Update and Remove envelopes is stubbed out
1. Backend for uploading csv and returning confirmation info stubbed out
1. Backend for importing uploaded csv post confirmation stubbed out

### Client
1. Landing Page
1. Login / Register using Auth0
1. Language Support (english and spanish) - not supported in all areas; coming back to this to complete
1. Hamburger main menu - partially wired up
1. Profile Photo menu - partially wired up
1. View Profile
1. Edit Profile
1. Post login, if new user is detected, it takes you to Edit Profile
1. Home View - support getting accounts, envelopes and inbox transactions
1. Home View | Accounts - supports add, edit and remove
1. Home View | Envelopes - supports add, edit and remove
1. Home View | Inbox - supports upload csv file of transactions, confirm dialog for data starting row and column assignments; transactions adjust selected account balance as well

## Setup Client
### Configure Client API
    In root/client, create a file '.env.development'

    Add the following lines
    REACT_APP_API_PORT=3001
    REACT_APP_API_ORIGIN=http://localhost

### Configure Client Auth0 
    In root/client, create a file 'auth_config.json'

    Add the following lines, update with your Auth0 information and save (only add audience once you create your Auth0 API)
```json
{
    "domain": "your-app-domain.auth0.com",
    "clientId": "your-client-id",
    "audience": "http://your-api-identifier"
}
```

## Setup Server
### Configure Server Port
    In root/server, create a file '.env'

    Add the following line
    APP_PORT=3001

### Configure Server Cors to Accept Calls From Client App
    In root/server, add lines to '.env' file

    APP_ORIGIN_PORT=3000
    APP_ORIGIN=http://localhost

### Configure Server to Parse Auth0 Token
    In root/server, add lines to '.env' file

    AUTH0_DOMAIN=your-app-domain.auth0.com
    AUTH0_CLIENT_ID=your-client-id
    AUTO0_AUDIENCE=http://your-api-identifier

### Configure Server uploads folder for new transactions
    In root/server, add lines to '.env' file

    # Folder outside of server path
    UPLOADS_FOLDER=../uploads/
    # Interval to run uploaded files clean up - in ms
    UPLOADS_CLEANUP_INTERVAL=60000 
    # How long an uploaded file lives before cleaned up - in ms
    UPLOADS_TTL=1800000

## To Run
### Start Server
    cd server
    node server.js

### Start Client
    cd client
    npm start

# Helpful Sites for this project

Multi-Lingual Support
https://dev.to/halilcanozcelik/create-a-multi-language-website-with-react-context-api-4i27

Parsing JWT / Auth0 Tokens
https://jwt.io/
https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library 

Upload and Parse CSV
https://c2fo.io/fast-csv/docs/parsing/examples/#max-rows 
https://www.youtube.com/watch?time_continue=148&v=0TTa5Ulmgds&feature=emb_logo
https://www.youtube.com/watch?v=9_x-UIVlxgo
https://bezkoder.com/node-js-csv-mongodb-collection/ 
https://github.com/richardgirges/express-fileupload/blob/master/lib/fileFactory.js

Context Providers
https://www.taniarascia.com/using-context-api-in-react/
https://itnext.io/react-setstate-usage-and-gotchas-ac10b4e03d60
https://www.toptal.com/react/react-context-api

Microservices with MongoDB - using Clean Code
https://www.youtube.com/watch?v=CnailTcJV_U 

UI Framework - Material UI
https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=0061bc&secondary.color=ffffff
https://material-ui.com/components/app-bar/

Javascript and Clean Code
https://github.com/dev-mastery/comments-api 
https://www.youtube.com/watch?v=CnailTcJV_U
https://www.youtube.com/playlist?list=PLWKjhJtqVAbkK24EaPurzMq0-kw5U9pJh 

Unique Record IDs - Not using MongoDB Object ID
https://www.hacksparrow.com/nodejs/how-to-generate-md5-sha1-sha512-sha256-checksum-hashes.html

Mocking and Testing Context
https://www.polvara.me/posts/mocking-context-with-react-testing-library/
https://github.com/testing-library/jest-dom#tohavetextcontent 
https://medium.com/@rishabhsrao/mocking-and-testing-fetch-with-jest-c4d670e2e167

Provide Delayed Resolve for Tests
https://www.geeksforgeeks.org/how-to-wait-for-a-promise-to-finish-before-returning-the-variable-of-a-function/

Testing with click and wait
https://www.youtube.com/watch?time_continue=42&v=SSyy2sHpmIA&feature=emb_logo

Testing Async API with Hooks OMG
https://testing-library.com/docs/dom-testing-library/api-async
https://github.com/testing-library/react-testing-library/issues/441#issuecomment-520977388 

Fixing Issues with Exceptions and JSON Stringify
https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify

Securing my express api
https://www.freecodecamp.org/news/express-js-security-tips/

Optimizing your app
https://www.codementor.io/blog/react-optimization-5wiwjnf9hj
