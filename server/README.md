# Server Side Implementation
## FLows
### Landing Page
* Full page image
* Are you ready take back control of your money?
* Login / Register Button
* Additional links below view height - about, budgeting, privacy, etc.

### Post Login / Registration
* Get User
    * if the user returns 
        * set profile image and name
    * if new user (not found)
        * Display new/edit profile - prepopulated with Auth0 info
        * if save
            * Write User
        * if cancel
            * Redirect to Landing Page
* Display Navigation
* Display Upload More Transactions
* Get Unassigned Transactions
    * do not show transaction if there are none
* Get Envelopes
    * do not show envelopes if there are none
* Get Accounts


    