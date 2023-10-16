import {useState} from 'react';
import Lottie from 'react-lottie-player';
import loginAnimation from '../assets/animations/login.json';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import '../assets/scss/partials/login.scss';
import { _googleLogin } from '../api/authenticationApi';
import { GoogleTokenResponseType } from '../types/AuthenticationTypes';

interface FormEvent extends React.FormEvent<HTMLFormElement> {
    target: HTMLFormElement;
}

function Login() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [remember, setRemember] = useState<boolean>(false);
	const [status, setStatus] = useState<string | null>(null);

	const loginWithEmailAndPassword = (e: FormEvent) => {
		e.preventDefault();
		console.log(email, password);
	}
	const googleLogin = useGoogleLogin({
		onSuccess: async (tokenResponse:GoogleTokenResponseType) => {
			const res = await _googleLogin(tokenResponse);
			if(!res) setStatus('An error occured. Please try again later!');
			if(res.status === 'ok'){
				setStatus(null);
			}else{
				setStatus(res.data);
			}
		},
	});
	return (
		<div className="page">
			<form className="login" onSubmit={loginWithEmailAndPassword}>
				<Lottie
					loop
					animationData={loginAnimation}
					play
					style={{ width: 70, height: 70}}
				/>
				<h3>Welcome Back</h3>
				<div className="text__muted">Please enter your details</div>
				<div className="form__group mtop--30">
					<label>Email</label>
					<div className="input__wrap">
						<input type="email" placeholder="Type here..." value={email} onChange={e => setEmail(e.target.value)} />
						<span className="focus"></span>
					</div>
				</div>
				<div className="form__group">
					<label>Password</label>
					<div className="input__wrap">
						<input type="password" placeholder="Type here..." value={password} onChange={e => setPassword(e.target.value)} />
						<span className="focus"></span>
					</div>
				</div>
				<div className="login__actions">
					<div className="form__group">
						<input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
						<label>Remember me</label>
					</div>
					<Link className="text__muted text__right mtop--10" to="/forgotPassword">
						Forgot Password?
					</Link>
				</div>
				<button disabled={!email && !password} className="btn btn__inverted btn__rounded btn__100 mtop--20">Log In</button>
				<button className="btn btn__secondary btn__rounded btn__100 mtop--20" onClick={() => googleLogin()}>
					<img src="https://api.iconify.design/logos:google-icon.svg" width={25} alt="Google Login"/>
					&nbsp;
					Log In with Google
				</button>
				{ (status && status !== 'loading') && <div className="text__danger mtop--10">{status}</div> }
				<div className="mtop--30 text__muted">
					Don't have an account? <Link to={'/register'}>Sign up</Link>
				</div>
			</form>
		</div>
	)
}

export default Login