import {useEffect} from 'react';

type PropTypes = {
	setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

function AuthenticationService({setIsLogged}: PropTypes) {

	useEffect(() => {
		setTimeout(() => {
			setIsLogged(true);
		}, 3000)
	}, [])
	return (
		<div>AuthenticationService</div>
	)
}

export default AuthenticationService