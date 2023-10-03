import {GoogleTokenType} from '../types/AuthenticationTypes';

const _googleLogin = (token:GoogleTokenType) => fetch('/api/authentication/googleLogin', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({...token}),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });
const _login = (email:string, password: string) => fetch('/api/authentication/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
        password: password
    }),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const _isLogged = () => fetch('/api/authentication/isLogged')
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const _googleRegistration = (token:GoogleTokenType) => fetch('/api/authentication/googleRegistration', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({...token}),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const _registration = (email:string, password: string) => fetch('/api/authentication/registration', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
        password: password
    }),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });


export {
    _googleLogin,
    _login,
    _isLogged,
    _googleRegistration,
    _registration
}