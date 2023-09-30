import {useState} from 'react';
import Lottie from 'react-lottie-player';
import loginAnimation from '../assets/animations/login.json';
import '../assets/scss/partials/login.scss';

function Login() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	return (
		<div className="page">
			<div className="login">
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
						<input type="checkbox" />
						<label>Remember me</label>
					</div>
					<div className="text__muted text__right mtop--10">
						Forgot Password?
					</div>
				</div>
				
				<button className="btn btn__inverted btn__rounded btn__100 mtop--20">Log In</button>
				<button className="btn btn__secondary btn__rounded btn__100 mtop--20">
					<img src="https://api.iconify.design/logos:google-icon.svg" width={25} alt="Google Login"/>
					&nbsp;
					Log In with Google
				</button>
				<div className="mtop--30 text__muted">
					Don't have an account? Sign up
				</div>
			</div>
		</div>
	)
}

export default Login