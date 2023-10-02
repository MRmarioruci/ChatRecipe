import { useMemo } from 'react';
import logo from '../assets/images/logo.png';
import useCombinedStore from '../State';

function Header({}) {
	const {user} = useCombinedStore();
    const initials:string = useMemo(() => {
        return user?.email.slice(0, 2) || 'CR';
    }, [user])
    return (
        <div className="main__header">
            <div className="main__header-logo">
                <img  src={logo} width={220} alt="Logo"/>
            </div>
            {user &&
                <div className="main__header-account uppercase">
                    {initials}
                </div>
            }
        </div>
    )
}

export default Header