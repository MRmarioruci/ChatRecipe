import {useEffect} from 'react';
import useCombinedStore from '../State';
import {_isLogged} from '../api/authenticationApi';

type PropTypes = {
	setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}
function AuthenticationService({setIsLogged}: PropTypes) {
	const {loadUser} = useCombinedStore();
	useEffect(() => {
		_isLogged()
		.then((data) => {
			if(data.status === 'ok'){
				loadUser(data.data)
				setIsLogged(true);
			}
		})
	}, [loadUser, setIsLogged])
	return <></>;
}

export default AuthenticationService