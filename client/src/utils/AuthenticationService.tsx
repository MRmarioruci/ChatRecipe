import {useEffect} from 'react';
import useCombinedStore from '../State';
import {_isLogged} from '../api/authenticationApi';
import { StateAction } from '../types';

type PropTypes = {
	setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}
function AuthenticationService({setIsLogged}: PropTypes) {
	const {user, loadUser} = useCombinedStore();
	
	useEffect(() => {
		_isLogged()
		.then((data) => {
			console.log(data);
		})
		/* setTimeout(() => {
			loadUser({
				email: 'marioruci15@gmail.com',
				image: null
			})				
			setIsLogged(true);
		}, 3000) */
	}, [loadUser, setIsLogged])
	return <></>;
}

export default AuthenticationService