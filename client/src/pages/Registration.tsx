import {useState} from 'react';
import Lottie from 'react-lottie-player';
import winkAnimation from '../assets/animations/wink.json';
import '../assets/scss/partials/login.scss';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { _googleRegistration, _registration } from '../api/authenticationApi';
import { GoogleTokenResponseType } from '../types/AuthenticationTypes';
import logo from '../assets/images/logo.png';

interface FormEvent extends React.FormEvent<HTMLFormElement> {
    target: HTMLFormElement;
}

function Registration() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordRepeat, setPasswordRepeat] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [surname, setSurname] = useState<string>('');
	const [remember, setRemember] = useState<boolean>(false);
	const [status, setStatus] = useState<string | null>(null);
	
	const registerWithEmailAndPassword = async (e: FormEvent) => {
		e.preventDefault();
		if(password !== passwordRepeat) return setStatus('The passwords do not match.');

		const res = await _registration(email, password, name, surname, remember);
		if(!res) setStatus('An error occured. Please try again later!');
		if(res.status === 'ok'){
			window.location.reload();
			setStatus(null);
		}else{
			setStatus(res.data);
		}
	}
	const googleRegistration = useGoogleLogin({
		onSuccess: async (tokenResponse:GoogleTokenResponseType) => {
			const res = await _googleRegistration(tokenResponse);
			if(!res) setStatus('An error occured. Please try again later!');
			if(res.status === 'ok'){
				window.location.reload();
				setStatus(null);
			}else{
				setStatus(res.data);
			}
		},
	});
	return (
		<div className="page">
			<form className="login" onSubmit={registerWithEmailAndPassword}>
				<Link to="/">
					<img  src={logo} width={220} alt="Logo" className='logo'/>
				</Link>
				<Lottie
					loop
					animationData={winkAnimation}
					play
					style={{ width: 70, height: 70}}
				/>
				<h3>Let him cook!</h3>
				<div className="text__muted">Please enter your details</div>
				<div className="flex flex__row">
					<div className="form__group">
						<label>Name</label>
						<div className="input__wrap">
							<input type="text" placeholder="Type here..." value={name} onChange={e => setName(e.target.value)} />
							<span className="focus"></span>
						</div>
					</div>
					<div className="form__group mleft--5">
						<label>Surname</label>
						<div className="input__wrap">
							<input type="text" placeholder="Type here..." value={surname} onChange={e => setSurname(e.target.value)} />
							<span className="focus"></span>
						</div>
					</div>
				</div>
				<div className="form__group">
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
				<button disabled={!email && !password && !name && !surname} className="btn btn__inverted btn__rounded btn__100 mtop--20">Sign up</button>
				<button className="btn btn__secondary btn__rounded btn__100 mtop--20" onClick={() => googleRegistration()}>
					<img src="https://api.iconify.design/logos:google-icon.svg" width={25} alt="Google Register"/>
					&nbsp;
					Sign up with Google
				</button>
				{ (status && status !== 'loading') && <div className="text__danger mtop--10">{status}</div> }
				<div className="mtop--30 text__muted">
					Already have an account? <Link to={'/login'}>Log in</Link>
				</div>
			</form>
		</div>
	)
}

export default Registration