import logo from '../assets/images/logo.png';
import { useGlobalState } from '../context/GlobalState';

function Header({}) {
    const {state, dispatch} = useGlobalState();
	const {user} = state;

    return (
        <div className="main__header">
            <div className="main__header-logo">
                <img  src={logo} width={220} alt="Logo"/>
            </div>
            {user.hasOwnProperty('email') &&
                <div className="main__header-account">
                    MR
                </div>
            }
        </div>
    )
}

export default Header