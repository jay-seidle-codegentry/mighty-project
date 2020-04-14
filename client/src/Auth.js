import auth0 from 'auth0-js';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: "dev-rark5hrw.auth0.com",
        clientID: "3wcWLdPGXoyNEiQkcecIRXxupvQWdzq1",
        redirectUri: "http://localhost:3000/callback",
        responseType: "token id_token",
        scope: "openid"
    });

/*    audience: "http://dev-rark5hrw.auth0.com/userinfo", */

    // constructor() {
    //     this.login = this.login.bind(this);
    // }

    // login() {
    //     this.auth0.authorize();
    // }
}