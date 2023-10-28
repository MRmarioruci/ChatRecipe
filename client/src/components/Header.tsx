import { useMemo } from 'react';
import logo from '../assets/images/logo.png';
import useCombinedStore from '../State';
import { _logout } from '../api/authenticationApi';

function Header({}) {
	const {user} = useCombinedStore();
    const initials:string = useMemo(() => {
        return user?.email.slice(0, 2) || 'CR';
    }, [user])
    const logout = async () => {
        const res = await _logout();
        if(!res) alert('An error occured. We could not log you out.');
        if(res.status === 'ok'){
            window.location.reload();
        }
    }
    return (
        <div className="main__header">
            <div className="main__header-logo">
                <img  src={logo} width={220} alt="Logo"/>
            </div>
            {user &&
                <div className="flex flex__row">
                    <div className="main__header-account uppercase">
                        {initials}
                    </div>
                    <button className="btn btn__transparent btn__sm" onClick={logout}>
                        <span className="material-icons text__warning">
                            logout
                        </span>
                    </button>
                </div>
            }
        </div>
    )
}

export default Header