# The Mighty Project
## Introduction
So I am Development Manager / Delivery Owner in the Finance Industry.  I like to code, and particularly, I like to encourage my team members to be opinionated about their craft. This project exists as a personal venture to build a project using Uncle Bob's Clean Code, SOLID and other good architecture principles.
## For Starters
This will be:
- a React client project, using Create React App
- use Enzyme and Jest for testing
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