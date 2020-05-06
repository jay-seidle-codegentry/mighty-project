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

## Requires Adding A File to Build and Run
In *root*/client, create a file '**auth_config.json**'

Add the following lines, update with your Auth0 information and save (only add audience once you create your Auth0 API)
```json
{
    "domain": "your-app-domain.auth0.com",
    "clientId": "your-client-id",
    "audience": "your-api-identifier"
}
```
# Helpful Sites for this project

Multi-Lingual Support
https://dev.to/halilcanozcelik/create-a-multi-language-website-with-react-context-api-4i27

Parsing JWT / Auth0 Tokens
https://jwt.io/
https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library 

Upload and Parse CSV
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

Testing with click and wait
https://www.youtube.com/watch?time_continue=42&v=SSyy2sHpmIA&feature=emb_logo

Testing Async API with Hooks OMG
https://testing-library.com/docs/dom-testing-library/api-async
https://github.com/testing-library/react-testing-library/issues/441#issuecomment-520977388 