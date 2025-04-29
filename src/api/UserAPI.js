import {SESSION, USERLOGIN} from "../routes/Routes.js";

export default class UserAPI {

    constructor() {

    }

    async getUser(email, password) {
        const response = await fetch(USERLOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const { email: userEmail, token: userPass } = await response.json();
        return { userEmail, userPass };
    }

    async getSession(){
        const response = await fetch(SESSION, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const { email: userEmail } = await response.json();
        return { userEmail };
    }


}