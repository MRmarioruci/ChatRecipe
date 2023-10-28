import {GoogleTokenType} from '../types/AuthenticationTypes';

const _googleLogin = (token:GoogleTokenType) => fetch('/api/authentication/google_login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({...token}),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const _login = (email:string, password: string, remember: boolean) => fetch('/api/authentication/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
        password: password,
        remember: remember
    }),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const _isLogged = () => fetch('/api/authentication/is_logged')
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const _googleRegistration = (token:GoogleTokenType) => fetch('/api/authentication/google_registration', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({...token}),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const _registration = (email:string, password: string, name:string, surname:string, remember:boolean) => fetch('/api/authentication/registration', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        surname: surname,
        remember: remember
    }),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const _logout = () => fetch('/api/authentication/logout', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

export {
    _googleLogin,
    _login,
    _isLogged,
    _googleRegistration,
    _registration,
    _logout
}