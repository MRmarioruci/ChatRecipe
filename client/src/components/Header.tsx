import logo from '../assets/images/logo.png';
import useCombinedStore from '../State';

function Header({}) {
	const {user} = useCombinedStore();

    return (
        <div className="main__header">
            <div className="main__header-logo">
                <img  src={logo} width={220} alt="Logo"/>
            </div>
            {user &&
                <div className="main__header-account">
                    MR
                </div>
            }
        </div>
    )
}

export default Header