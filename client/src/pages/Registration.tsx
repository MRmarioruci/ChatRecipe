import {useState} from 'react';
import Lottie from 'react-lottie-player';
import winkAnimation from '../assets/animations/wink.json';
import '../assets/scss/partials/login.scss';
import { Link } from 'react-router-dom';

interface FormEvent extends React.FormEvent<HTMLFormElement> {
    target: HTMLFormElement;
}

function Registration() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordRepeat, setPasswordRepeat] = useState<string>('');
	const [remember, setRemember] = useState<boolean>(false);
	
	const registerWithEmailAndPassword = (e: FormEvent) => {
		e.preventDefault();
		console.log(email, password, passwordRepeat);
	}
	return (
		<div className="page">
			<form className="login" onSubmit={registerWithEmailAndPassword}>
				<Lottie
					loop
					animationData={winkAnimation}
					play
					style={{ width: 70, height: 70}}
				/>
				<h3>Let him cook!</h3>
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
				<div className="form__group">
					<label>Repeat password</label>
					<div className="input__wrap">
						<input type="password" placeholder="Type here..." value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} />
						<span className="focus"></span>
					</div>
				</div>
				<div className="login__actions">
					<div className="form__group">
						<input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
						<label>Remember me</label>
					</div>
				</div>
				<button disabled={!email && !password} className="btn btn__inverted btn__rounded btn__100 mtop--20">Sign up</button>
				<button className="btn btn__secondary btn__rounded btn__100 mtop--20">
					<img src="https://api.iconify.design/logos:google-icon.svg" width={25} alt="Google Register"/>
					&nbsp;
					Sign up with Google
				</button>
				<div className="mtop--30 text__muted">
					Already have an account? <Link to={'/login'}>Log in</Link>
				</div>
			</form>
		</div>
	)
}

export default Registration